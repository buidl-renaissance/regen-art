// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract DogeStaking {
    IERC20 public dogeToken; // DOGE token address
    address public owner;
    uint256 public rewardRate; // rate at which rewards are given, in terms of DOGE per block
    uint256 public totalStaked;

    // Struct for storing staking information
    struct Staker {
        uint256 amountStaked;
        uint256 rewardDebt; // Tracks the amount of reward the staker is entitled to
        uint256 lastUpdateBlock; // Last block when rewards were calculated for this staker
    }

    // Mapping from staker address to staking information
    mapping(address => Staker) public stakers;

    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor(address _dogeToken, uint256 _rewardRate) {
        dogeToken = IERC20(_dogeToken);
        rewardRate = _rewardRate;
        owner = msg.sender;
    }

    // Function to stake DOGE tokens
    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0 tokens");
        
        // Transfer DOGE tokens from the user to the contract
        dogeToken.transferFrom(msg.sender, address(this), amount);

        // Update staker's info
        Staker storage staker = stakers[msg.sender];
        _updateReward(msg.sender);

        // Add the new staked amount to their balance
        staker.amountStaked += amount;
        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    // Function to unstake DOGE tokens
    function unstake(uint256 amount) external {
        require(amount > 0, "Cannot unstake 0 tokens");
        
        // Ensure the user has enough staked balance
        Staker storage staker = stakers[msg.sender];
        require(staker.amountStaked >= amount, "Not enough staked balance");

        // Update the staker's reward and staked amount
        _updateReward(msg.sender);

        // Decrease the staked balance
        staker.amountStaked -= amount;
        totalStaked -= amount;

        // Transfer the DOGE tokens back to the user
        dogeToken.transfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    // Function to claim rewards
    function claimReward() external {
        Staker storage staker = stakers[msg.sender];
        _updateReward(msg.sender);
        
        uint256 reward = staker.rewardDebt;
        require(reward > 0, "No rewards to claim");

        // Reset the reward debt
        staker.rewardDebt = 0;

        // Transfer the reward to the user
        dogeToken.transfer(msg.sender, reward);

        emit RewardPaid(msg.sender, reward);
    }

    // Internal function to update the reward debt
    function _updateReward(address stakerAddress) internal {
        Staker storage staker = stakers[stakerAddress];
        if (staker.amountStaked > 0) {
            // Calculate rewards based on blocks passed
            uint256 blocksStaked = block.number - staker.lastUpdateBlock;
            uint256 reward = blocksStaked * rewardRate * staker.amountStaked / totalStaked;
            staker.rewardDebt += reward;
        }
        staker.lastUpdateBlock = block.number;
    }

    // Set a new reward rate (only owner can do this)
    function setRewardRate(uint256 newRewardRate) external onlyOwner {
        rewardRate = newRewardRate;
    }

    // Withdraw any excess DOGE tokens from the contract (only owner can do this)
    function withdrawExcess(uint256 amount) external onlyOwner {
        require(dogeToken.balanceOf(address(this)) >= amount, "Not enough balance");
        dogeToken.transfer(owner, amount);
    }

    // View function to check the current rewards for a staker
    function checkReward(address stakerAddress) external view returns (uint256) {
        Staker memory staker = stakers[stakerAddress];
        uint256 blocksStaked = block.number - staker.lastUpdateBlock;
        uint256 reward = blocksStaked * rewardRate * staker.amountStaked / totalStaked;
        return staker.rewardDebt + reward;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract XNBC is ERC20, Ownable {
    constructor() ERC20("XNBC Token", "XNBC") {}

    // Mint function to allow the contract to mint new XNBC tokens
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

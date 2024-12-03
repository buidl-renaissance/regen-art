// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InvestorRegistry {
    // Struct to store investor verification details
    struct InvestorDetails {
        bool isRegistered;
        bool isVerified;
        address verifier;
        uint256 verificationTimestamp;
        string name;
        address investor;
    }

    // Mapping to store registered investors and their details
    mapping(address => InvestorDetails) private investors;
    
    // Array to store all investor addresses
    address[] private investorList;
    
    // Mapping of authorized third-party verifiers
    mapping(address => bool) private authorizedVerifiers;
    
    // Array to store all verifier addresses
    address[] private verifierList;
    
    // Owner of the contract
    address public owner;
    
    // Events
    event InvestorRegistered(address indexed investor);
    event InvestorRemoved(address indexed investor);
    event VerifierAuthorized(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    event InvestorVerified(address indexed investor, address indexed verifier, uint256 timestamp);
    event OwnershipTransferred(address indexed newOwner);
    constructor() {
        owner = msg.sender;
    }
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAuthorizedVerifier() {
        require(authorizedVerifiers[msg.sender], "Only authorized verifiers can call this function");
        _;
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        owner = newOwner;
        emit OwnershipTransferred(owner);
    }

    // Owner functions to manage verifiers
    function authorizeVerifier(address verifier) external onlyOwner {
        require(verifier != address(0), "Invalid verifier address");
        require(!authorizedVerifiers[verifier], "Verifier already authorized");
        
        authorizedVerifiers[verifier] = true;
        verifierList.push(verifier);
        emit VerifierAuthorized(verifier);
    }
    
    function removeVerifier(address verifier) external onlyOwner {
        require(verifier != address(0), "Invalid verifier address");
        require(authorizedVerifiers[verifier], "Verifier not authorized");
        
        authorizedVerifiers[verifier] = false;
        
        // Remove from verifierList array
        for(uint i = 0; i < verifierList.length; i++) {
            if(verifierList[i] == verifier) {
                verifierList[i] = verifierList[verifierList.length - 1];
                verifierList.pop();
                break;
            }
        }
        
        emit VerifierRemoved(verifier);
    }
    
    // Register a new investor - can be called by anyone to register themselves
    function registerInvestor(string memory name) external {
        require(!investors[msg.sender].isRegistered, "Investor already registered");
        require(bytes(name).length > 0, "Name cannot be empty");
        
        investors[msg.sender] = InvestorDetails({
            isRegistered: true,
            isVerified: false,
            verifier: address(0),
            verificationTimestamp: 0,
            name: name,
            investor: msg.sender
        });
        
        investorList.push(msg.sender);
        emit InvestorRegistered(msg.sender);
    }

    // Register another investor - only owner can register others
    function registerInvestorByOwner(address investor, string memory name) external onlyOwner {
        require(investor != address(0), "Invalid investor address");
        require(!investors[investor].isRegistered, "Investor already registered");
        require(bytes(name).length > 0, "Name cannot be empty");
        
        investors[investor] = InvestorDetails({
            isRegistered: true,
            isVerified: false,
            verifier: address(0),
            verificationTimestamp: 0,
            name: name,
            investor: investor
        });
        
        investorList.push(investor);
        emit InvestorRegistered(investor);
    }
    
    // Remove an investor
    function removeInvestor(address investor) external onlyOwner {
        require(investor != address(0), "Invalid investor address");
        require(investors[investor].isRegistered, "Investor not registered");
        
        // Remove from investorList array
        for(uint i = 0; i < investorList.length; i++) {
            if(investorList[i] == investor) {
                investorList[i] = investorList[investorList.length - 1];
                investorList.pop();
                break;
            }
        }
        
        delete investors[investor];
        emit InvestorRemoved(investor);
    }
    
    // Verify an investor (only callable by authorized verifiers)
    function verifyInvestor(address investor) external onlyAuthorizedVerifier {
        require(investor != address(0), "Invalid investor address");
        require(investors[investor].isRegistered, "Investor not registered");
        require(!investors[investor].isVerified, "Investor already verified");
        
        investors[investor].isVerified = true;
        investors[investor].verifier = msg.sender;
        investors[investor].verificationTimestamp = block.timestamp;
        
        emit InvestorVerified(investor, msg.sender, block.timestamp);
    }
    
    // View functions
    function isRegisteredInvestor(address investor) external view returns (bool) {
        return investors[investor].isRegistered;
    }
    
    function isVerifiedInvestor(address investor) external view returns (bool) {
        return investors[investor].isVerified;
    }
    
    function getInvestorDetails(address investor) external view returns (InvestorDetails memory) {
        require(investor != address(0), "Invalid investor address");
        require(investors[investor].isRegistered, "Investor not registered");
        return investors[investor];
    }
    
    function isAuthorizedVerifier(address verifier) external view returns (bool) {
        return authorizedVerifiers[verifier];
    }

    // Get all investors
    function getAllInvestors() external view returns (address[] memory) {
        return investorList;
    }

    // Get all investors with their details
    function getAllInvestorsDetails() external view returns (InvestorDetails[] memory) {
        InvestorDetails[] memory allInvestors = new InvestorDetails[](investorList.length);
        for(uint i = 0; i < investorList.length; i++) {
            allInvestors[i] = investors[investorList[i]];
        }
        return allInvestors;
    }

    // Get all authorized verifiers
    function getAuthorizedVerifiers() external view returns (address[] memory) {
        return verifierList;
    }
}

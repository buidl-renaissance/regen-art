// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InvestorRegistry {
    // Struct to store investor verification details
    struct InvestorDetails {
        bool isRegistered;
        bool isVerified;
        address verifier;
        uint256 verificationTimestamp;
    }

    // Mapping to store registered investors and their details
    mapping(address => InvestorDetails) private investors;
    
    // Mapping of authorized third-party verifiers
    mapping(address => bool) private authorizedVerifiers;
    
    // Owner of the contract
    address public owner;
    
    // Events
    event InvestorRegistered(address indexed investor);
    event InvestorRemoved(address indexed investor);
    event VerifierAuthorized(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    event InvestorVerified(address indexed investor, address indexed verifier, uint256 timestamp);
    
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
    
    // Owner functions to manage verifiers
    function authorizeVerifier(address verifier) external onlyOwner {
        require(verifier != address(0), "Invalid verifier address");
        require(!authorizedVerifiers[verifier], "Verifier already authorized");
        
        authorizedVerifiers[verifier] = true;
        emit VerifierAuthorized(verifier);
    }
    
    function removeVerifier(address verifier) external onlyOwner {
        require(verifier != address(0), "Invalid verifier address");
        require(authorizedVerifiers[verifier], "Verifier not authorized");
        
        authorizedVerifiers[verifier] = false;
        emit VerifierRemoved(verifier);
    }
    
    // Register a new investor
    function registerInvestor(address investor) external onlyOwner {
        require(investor != address(0), "Invalid investor address");
        require(!investors[investor].isRegistered, "Investor already registered");
        
        investors[investor] = InvestorDetails({
            isRegistered: true,
            isVerified: false,
            verifier: address(0),
            verificationTimestamp: 0
        });
        
        emit InvestorRegistered(investor);
    }
    
    // Remove an investor
    function removeInvestor(address investor) external onlyOwner {
        require(investor != address(0), "Invalid investor address");
        require(investors[investor].isRegistered, "Investor not registered");
        
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
    
    function getInvestorDetails(address investor) external view returns (
        bool isRegistered,
        bool isVerified,
        address verifier,
        uint256 verificationTimestamp
    ) {
        InvestorDetails memory details = investors[investor];
        return (
            details.isRegistered,
            details.isVerified,
            details.verifier,
            details.verificationTimestamp
        );
    }
    
    function isAuthorizedVerifier(address verifier) external view returns (bool) {
        return authorizedVerifiers[verifier];
    }
}


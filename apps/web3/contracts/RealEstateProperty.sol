// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract RealEstateProperty is ERC721 {
    struct Property {
        uint256 id;
        string location;
        string description;
        string ipfsHash;
        uint256 totalShares; // Total shares minted for the property
        mapping(address => uint256) shareBalances;
        address[] stakeholders;
    }

    // Mapping to store properties by token ID
    mapping(uint256 => Property) public properties;
    uint256 public propertyCounter;

    // Event to be emitted when a new property is listed
    event PropertyListed(
        uint256 propertyId,
        string location,
        string description,
        string ipfsHash
    );
    event SharesMinted(uint256 propertyId, uint256 totalShares);
    event SharesTransferred(
        uint256 propertyId,
        address from,
        address to,
        uint256 shares
    );

    constructor() ERC721('RealEstateProperty', 'REPROP') {}

    // Function to mint a new property
    // Mint a new property
    function mintProperty(
        address owner,
        string memory location,
        string memory description,
        string memory ipfsHash
    ) public {
        propertyCounter++;
        uint256 propertyId = propertyCounter;


        Property storage newProperty = properties[propertyId];
        newProperty.id = propertyId;
        newProperty.location = location;
        newProperty.ipfsHash = ipfsHash;
        newProperty.description = description;
        newProperty.totalShares = 1000; // Default total shares

        newProperty.shareBalances[owner] = 1000; // Initial shares to the owner
        newProperty.stakeholders.push(owner); // Add owner as the first stakeholder

        _mint(owner, propertyId);

        emit PropertyListed(propertyId, location, description, ipfsHash);
    }

    // Function to mint shares for a property (only callable by the property owner)
    function mintShares(uint256 propertyId, uint256 totalShares) public {
        require(
            ownerOf(propertyId) == msg.sender,
            'Only the property owner can mint shares.'
        );
        require(
            properties[propertyId].totalShares == 0,
            'Shares already minted for this property.'
        );

        properties[propertyId].totalShares = totalShares;

        // The property owner starts owning all the shares initially
        properties[propertyId].shareBalances[msg.sender] = totalShares;

        emit SharesMinted(propertyId, totalShares);
    }

    // Function to transfer shares to another address
    function transferShares(
        uint256 propertyId,
        address to,
        uint256 shares
    ) public {
        require(
            properties[propertyId].shareBalances[msg.sender] >= shares,
            'Not enough shares owned.'
        );
        require(to != address(0), 'Invalid address.');

        Property storage property = properties[propertyId];

        if (property.shareBalances[to] == 0) {
            property.stakeholders.push(to); // Add to stakeholders if not already
        }

        // Deduct shares from the sender and add to the recipient
        property.shareBalances[msg.sender] -= shares;
        property.shareBalances[to] += shares;

        emit SharesTransferred(propertyId, msg.sender, to, shares);
    }

    // Get shares owned by an address for a specific property
    function getSharesOwned(
        uint256 propertyId,
        address owner
    ) public view returns (uint256) {
        return properties[propertyId].shareBalances[owner];
    }

    // **New Method**: Get properties in which the user owns shares
    function getUserPropertiesWithShares(
        address user
    ) public view returns (uint256[] memory, uint256[] memory) {
        uint256 count = 0;

        // Count the number of properties the user has shares in
        for (uint256 i = 1; i <= propertyCounter; i++) {
            if (properties[i].shareBalances[user] > 0) {
                count++;
            }
        }

        // Initialize arrays to store property IDs and share counts
        uint256[] memory userProperties = new uint256[](count);
        uint256[] memory userShares = new uint256[](count);
        uint256 index = 0;

        // Populate arrays with properties and shares
        for (uint256 i = 1; i <= propertyCounter; i++) {
            uint256 shares = properties[i].shareBalances[user];
            if (shares > 0) {
                userProperties[index] = i;
                userShares[index] = shares;
                index++;
            }
        }

        return (userProperties, userShares);
    }

    // **New Method**: Get property details including share distribution
    function getProperty(uint256 propertyId)
        public
        view
        returns (
            address owner,
            string memory location,
            string memory description,
            string memory ipfsHash,
            uint256 totalShares,
            address[] memory stakeholders,
            uint256[] memory shares
        )
    {
        Property storage property = properties[propertyId];
        uint256 stakeholderCount = property.stakeholders.length;

        uint256[] memory stakeholderShares = new uint256[](stakeholderCount);
        for (uint256 i = 0; i < stakeholderCount; i++) {
            address stakeholder = property.stakeholders[i];
            stakeholderShares[i] = property.shareBalances[stakeholder];
        }

        return (
            ownerOf(propertyId),
            property.location,
            property.description,
            property.ipfsHash,
            property.totalShares,
            property.stakeholders,
            stakeholderShares
        );
    }

    // Add this struct above the getProperties function
    struct PropertyView {
        uint256 id;
        string location;
        string description;
        string ipfsHash;
        uint256 totalShares;
        uint256 numberOfStakeholders;
    }

    // Modify the function to use PropertyView
    function getProperties() public view returns (PropertyView[] memory) {
        PropertyView[] memory allProperties = new PropertyView[](propertyCounter);
        
        for (uint256 i = 0; i < propertyCounter; i++) {
            uint256 propertyId = i + 1;
            Property storage property = properties[propertyId];
            
            allProperties[i] = PropertyView(
                propertyId,
                property.location,
                property.description,
                property.ipfsHash,
                property.totalShares,
                property.stakeholders.length
            );
        }
        
        return allProperties;
    }

    // Function to transfer ownership of the property
    function transferProperty(address to, uint256 propertyId) public {
        require(
            ownerOf(propertyId) == msg.sender,
            'Only the property owner can transfer.'
        );
        _transfer(msg.sender, to, propertyId);
    }
}

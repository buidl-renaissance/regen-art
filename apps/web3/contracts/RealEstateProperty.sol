// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RealEstateProperty is ERC721 {
    struct Property {
        uint256 id;
        string location;
        uint256 price;
        string description;
        uint256 totalShares;  // Total shares minted for the property
        uint256 availableShares;  // Shares available for purchase
    }

    // Mapping to store properties by token ID
    mapping(uint256 => Property) public properties;
    uint256 public nextPropertyId;

    // Mapping to store share ownership by property ID and shareholder address
    mapping(uint256 => mapping(address => uint256)) public sharesOwned;

    // Event to be emitted when a new property is listed
    event PropertyListed(uint256 propertyId, string location, uint256 price, string description);
    event SharesMinted(uint256 propertyId, uint256 totalShares);
    event SharesTransferred(uint256 propertyId, address from, address to, uint256 shares);

    constructor() ERC721("RealEstateProperty", "REPROP") {}

    // Function to mint a new property
    function mintProperty(
        address owner,
        string memory location,
        uint256 price,
        string memory description
    ) public {
        uint256 propertyId = nextPropertyId;
        properties[propertyId] = Property(propertyId, location, price, description, 0, 0);
        _safeMint(owner, propertyId);
        nextPropertyId++;

        emit PropertyListed(propertyId, location, price, description);
    }

    // Function to mint shares for a property (only callable by the property owner)
    function mintShares(uint256 propertyId, uint256 totalShares) public {
        require(ownerOf(propertyId) == msg.sender, "Only the property owner can mint shares.");
        require(properties[propertyId].totalShares == 0, "Shares already minted for this property.");
        
        properties[propertyId].totalShares = totalShares;
        properties[propertyId].availableShares = totalShares;

        // The property owner starts owning all the shares initially
        sharesOwned[propertyId][msg.sender] = totalShares;

        emit SharesMinted(propertyId, totalShares);
    }

    // Function to transfer shares to another address
    function transferShares(
        uint256 propertyId,
        address to,
        uint256 shares
    ) public {
        require(sharesOwned[propertyId][msg.sender] >= shares, "Not enough shares owned.");
        require(to != address(0), "Invalid address.");

        // Deduct shares from the sender and add to the recipient
        sharesOwned[propertyId][msg.sender] -= shares;
        sharesOwned[propertyId][to] += shares;

        emit SharesTransferred(propertyId, msg.sender, to, shares);
    }

    // Function to get share ownership for a property by a specific address
    function getSharesOwned(uint256 propertyId, address owner) public view returns (uint256) {
        return sharesOwned[propertyId][owner];
    }

    // Function to retrieve property details
    function getPropertyDetails(
        uint256 propertyId
    )
        public
        view
        returns (
            string memory location,
            uint256 price,
            string memory description,
            address owner,
            uint256 totalShares,
            uint256 availableShares
        )
    {
        // require(_exists(propertyId), "Property does not exist.");
        Property memory property = properties[propertyId];
        return (property.location, property.price, property.description, owner, property.totalShares, property.availableShares);
    }

    // Function to transfer ownership of the property
    function transferProperty(address to, uint256 propertyId) public {
        require(
            ownerOf(propertyId) == msg.sender,
            "Only the property owner can transfer."
        );
        _transfer(msg.sender, to, propertyId);
    }

    // Optional: Function to set the price of the property (only owner of property can set it)
    function setPrice(uint256 propertyId, uint256 newPrice) public {
        require(
            ownerOf(propertyId) == msg.sender,
            "Only the property owner can set the price."
        );
        properties[propertyId].price = newPrice;
    }
}

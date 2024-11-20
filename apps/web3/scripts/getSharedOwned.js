// scripts/getSharesOwned.js
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const contractAddress = process.env.PROPERTY_ADDRESS;  // Replace with deployed contract address
    const propertyId = 0;  // Replace with the property ID you want to query
    const ownerAddress = process.env.INVESTOR_ADDRESS;  // Replace with the address of the shareholder to query

    // Get the contract instance
    const RealEstateProperty = await ethers.getContractFactory("RealEstateProperty");
    const realEstateProperty = RealEstateProperty.attach(contractAddress);

    try {
        // Call the getSharesOwned function
        const sharesOwned = await realEstateProperty.getSharesOwned(propertyId, ownerAddress);

        // Display the number of shares owned
        console.log(`Address ${ownerAddress} owns ${sharesOwned.toString()} shares in property ID ${propertyId}`);
    } catch (error) {
        console.error(`Error retrieving shares owned for address ${ownerAddress} in property ID ${propertyId}:`, error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

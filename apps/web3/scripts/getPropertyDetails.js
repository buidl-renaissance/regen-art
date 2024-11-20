// scripts/getPropertyDetails.js
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    // Replace with the deployed contract address
    const contractAddress = process.env.PROPERTY_ADDRESS;

    // Set the property ID you want to retrieve details for
    const propertyId = 0; // Replace this with the desired property ID

    // Get the contract instance
    const RealEstateProperty = await ethers.getContractFactory("RealEstateProperty");
    const realEstateProperty = RealEstateProperty.attach(contractAddress);

    try {
        // Call the getPropertyDetails function
        const [location, price, description, owner, totalShares, availableShares] = await realEstateProperty.getPropertyDetails(propertyId);

        // Display the property details
        console.log(`Property ID: ${propertyId}`);
        console.log(`Location: ${location}`);
        console.log(`Price: ${ethers.utils.formatEther(price)} ETH`);
        console.log(`Description: ${description}`);
        console.log(`Owner: ${owner}`);
        console.log(`Total Shares: ${totalShares}`);
        console.log(`Available Shares: ${availableShares}`);
    } catch (error) {
        console.error(`Error retrieving property details for ID ${propertyId}:`, error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
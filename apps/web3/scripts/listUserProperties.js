// scripts/getPropertyDetails.js
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    // Replace with the deployed contract address
    const contractAddress = process.env.PROPERTY_ADDRESS;

    // Set the property ID you want to retrieve details for
    const userAddress = process.env.USER_ADDRESS;

    // Get the contract instance
    const RealEstateProperty = await ethers.getContractFactory("RealEstateProperty");
    const realEstateProperty = RealEstateProperty.attach(contractAddress);

    try {
        // Call the getPropertyDetails function
        const propertyIds = await realEstateProperty.listUserProperties(userAddress);
        console.log("Properties owned by user:", propertyIds);

        for (const id of propertyIds) {
            const details = await contract.getPropertyDetails(id);
            console.log(`Property ID ${id}:`, details);
        }
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
    

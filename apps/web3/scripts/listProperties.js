// scripts/listProperties.js
const { ethers } = require("hardhat");

async function main() {
    // Replace with your deployed contract address
    const contractAddress = "0xAc6Da54D297fDea0e98c8fffd88D85F5e0e1582f";

    // Get the contract instance
    const RealEstateProperty = await ethers.getContractFactory("RealEstateProperty");
    const realEstateProperty = RealEstateProperty.attach(contractAddress);

    // Fetch all properties
    const properties = await realEstateProperty.getAllProperties();

    // Log the details of each property
    properties.forEach((property, index) => {
        console.log(`Property ID: ${property.id.toString()}`);
        console.log(`Location: ${property.location}`);
        console.log(`Price: ${ethers.utils.formatEther(property.price)} ETH`);
        console.log(`Description: ${property.description}`);
        console.log("--------------");
    });
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

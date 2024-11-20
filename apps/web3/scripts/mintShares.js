// scripts/mintShares.js
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const contractAddress = process.env.PROPERTY_ADDRESS;
    const propertyId = 0;  // The property ID for which to mint shares
    const totalShares = 1000;  // Total number of shares to mint

    const RealEstateProperty = await ethers.getContractFactory("RealEstateProperty");
    const realEstateProperty = RealEstateProperty.attach(contractAddress);

    // Mint shares for the specified property
    const tx = await realEstateProperty.mintShares(propertyId, totalShares);
    console.log("Minting shares transaction submitted. Waiting for confirmation...");

    const receipt = await tx.wait();
    console.log(`Shares minted for property ID ${propertyId} with total shares: ${totalShares}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
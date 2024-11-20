// scripts/transferShares.js
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    const contractAddress = process.env.PROPERTY_ADDRESS;
    const propertyId = 0;  // Property ID to transfer shares from
    const toAddress = process.env.INVESTOR_ADDRESS;  // Recipient of shares
    const sharesToTransfer = 100;  // Number of shares to transfer

    const RealEstateProperty = await ethers.getContractFactory("RealEstateProperty");
    const realEstateProperty = RealEstateProperty.attach(contractAddress);

    // Transfer shares
    const tx = await realEstateProperty.transferShares(propertyId, toAddress, sharesToTransfer);
    console.log("Transferring shares transaction submitted. Waiting for confirmation...");

    const receipt = await tx.wait();
    console.log(`Transferred ${sharesToTransfer} shares of property ID ${propertyId} to ${toAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

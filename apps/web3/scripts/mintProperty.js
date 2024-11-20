// scripts/mintProperty.js
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    // Replace with the deployed contract address
    const contractAddress = process.env.PROPERTY_ADDRESS;

    // Define the property details
    const ownerAddress = process.env.PROPERTY_OWNER_ADDRESS;  // The address to receive the property token
    const location = "1234 Blockchain Avenue";
    const price = ethers.utils.parseEther("1000");  // Example price in Wei (adjust as needed)
    const description = "A cozy property in the heart of the blockchain world.";

    // Get the contract instance
    const RealEstateProperty = await ethers.getContractFactory("RealEstateProperty");
    const realEstateProperty = RealEstateProperty.attach(contractAddress);

    // Call mintProperty to mint a new property
    const tx = await realEstateProperty.mintProperty(ownerAddress, location, price, description);
    console.log("Minting transaction submitted. Waiting for confirmation...");

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);

    // Log the property ID
    const propertyId = await realEstateProperty.nextPropertyId();
    console.log(`New property minted with ID: ${propertyId.toNumber() - 1}`);  // Adjusted for zero-based index
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

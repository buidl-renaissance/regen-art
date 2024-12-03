const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // Get the contract address from environment variables
  const contractAddress = process.env.INVESTOR_REGISTRY_ADDRESS;
  if (!contractAddress) {
    throw new Error("INVESTOR_REGISTRY_ADDRESS not set in environment variables");
  }

  // Get the new owner address from environment variables
  const newOwnerAddress = process.env.NEW_OWNER_ADDRESS;
  if (!newOwnerAddress) {
    throw new Error("NEW_OWNER_ADDRESS not set in environment variables");
  }

  // Get the contract instance
  const InvestorRegistry = await hre.ethers.getContractFactory("InvestorRegistry");
  const investorRegistry = InvestorRegistry.attach(contractAddress);

  console.log("Transferring ownership to:", newOwnerAddress);

  // Transfer ownership
  const tx = await investorRegistry.transferOwnership(newOwnerAddress);
  await tx.wait();

  console.log("Ownership transferred successfully");

  // Verify the new owner
  const newOwner = await investorRegistry.owner();
  console.log("New owner verified:", newOwner);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

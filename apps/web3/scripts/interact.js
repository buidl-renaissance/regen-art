const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Replace with your deployed contract address
  const contractAddress = "0xd151664bFEA5C60F95ea223A142301A42480d492";
  // Load the contract ABI
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const contract = HelloWorld.attach(contractAddress);

  // Example interaction - reading a public variable
  const greeting = await contract.greet();
  console.log("Greeting:", greeting);

  // Example interaction - sending a transaction
  // If your contract has a function to update a variable, use it like this:
  // const tx = await contract.setGreeting("New Greeting!");
  // await tx.wait();
  // console.log("Updated Greeting!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
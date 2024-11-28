const hre = require("hardhat");

async function main() {
  const InvestorRegistry = await hre.ethers.getContractFactory("InvestorRegistry");
  const investorRegistry = await InvestorRegistry.deploy();

  await investorRegistry.deployed();
  console.log("InvestorRegistry deployed to:", investorRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
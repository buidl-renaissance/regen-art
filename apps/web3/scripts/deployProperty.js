const hre = require("hardhat");

async function main() {
  const RealEstateProperty = await hre.ethers.getContractFactory("RealEstateProperty");
  const realEstate = await RealEstateProperty.deploy();

  await realEstate.deployed();
  console.log("RealEstateProperty deployed to:", realEstate.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
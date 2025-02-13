const hre = require("hardhat");

async function main() {
  const ArtNightNFT = await hre.ethers.getContractFactory("ArtNightNFT");
  const artNightNFT = await ArtNightNFT.deploy("ArtNightNFT", "ART");

  await artNightNFT.deployed();
  console.log("ArtNightNFT deployed to:", artNightNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
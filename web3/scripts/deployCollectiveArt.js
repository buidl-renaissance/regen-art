// eslint-disable-next-line @typescript-eslint/no-require-imports
const hre = require("hardhat");

async function main() {
  // Get the network
  const network = await hre.ethers.provider.getNetwork();
  console.log("Deploying to network:", network.name);

  // Get the deployer's address
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const CollectiveArt = await hre.ethers.getContractFactory("CollectiveArt");
  console.log("Deploying CollectiveArt...");
  
  const collectiveArt = await CollectiveArt.deploy("CollectiveArt", "ART");

  await collectiveArt.deployed();
  console.log("CollectiveArt deployed to:", collectiveArt.address);

  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await collectiveArt.deployTransaction.wait(6); // Wait for 6 block confirmations

  console.log("Deployment completed successfully!");
  
  // Verify contract on Etherscan (if not on localhost)
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: collectiveArt.address,
        constructorArguments: ["CollectiveArt", "COLLECTIVE"],
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.log("Error verifying contract:", error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
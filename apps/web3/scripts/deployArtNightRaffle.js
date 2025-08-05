const hre = require("hardhat");

async function main() {
  // VRF v2.5 Configuration for Ethereum Sepolia
  const VRF_COORDINATOR_V2 = "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B";
  const SUBSCRIPTION_ID = "77899604690368234140542231011632468025290834504310678429410906800047067486655";
  
  // Gas lane (key hash) for VRF v2.5 on Sepolia
  // This is the correct key hash for VRF v2.5 on Ethereum Sepolia
  const GAS_LANE = "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae";
  
  // VRF Request parameters
  const CALLBACK_GAS_LIMIT = 75000; // Increased for reliability
  const REQUEST_CONFIRMATIONS = 3;
  const NUM_WORDS = 1; // We only need one random number
  
  console.log("Deploying ArtNightRaffle...");
  console.log("VRF Coordinator:", VRF_COORDINATOR_V2);
  console.log("Subscription ID:", SUBSCRIPTION_ID);
  console.log("Gas Lane:", GAS_LANE);
  
  const ArtNightRaffle = await hre.ethers.getContractFactory("ArtNightRaffle");
  const artNightRaffle = await ArtNightRaffle.deploy(
    VRF_COORDINATOR_V2,
    SUBSCRIPTION_ID,
    GAS_LANE,
    CALLBACK_GAS_LIMIT,
    REQUEST_CONFIRMATIONS,
    NUM_WORDS
  );

  await artNightRaffle.deployed();
  
  console.log("ArtNightRaffle deployed to:", artNightRaffle.address);
  console.log("\nDeployment Configuration:");
  console.log("- VRF Coordinator:", VRF_COORDINATOR_V2);
  console.log("- Subscription ID:", SUBSCRIPTION_ID);
  console.log("- Gas Lane:", GAS_LANE);
  console.log("- Callback Gas Limit:", CALLBACK_GAS_LIMIT);
  console.log("- Request Confirmations:", REQUEST_CONFIRMATIONS);
  console.log("- Number of Words:", NUM_WORDS);
  
  console.log("\nNext steps:");
  console.log("1. Add this contract as a consumer to your VRF subscription");
  console.log("2. Fund your subscription with LINK tokens");
  console.log("3. Test the raffle functionality");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
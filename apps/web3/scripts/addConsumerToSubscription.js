const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // VRF v2.5 Configuration for Ethereum Sepolia
  const VRF_COORDINATOR_V2 = "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B";
  const SUBSCRIPTION_ID = "77899604690368234140542231011632468025290834504310678429410906800047067486655";
  
  // Replace this with your deployed contract address
  const CONTRACT_ADDRESS = "0x6A63BDB63c6Aa63e43B0744D2709a7101f83E855";
  
  console.log("Adding contract as consumer to VRF subscription...");
  console.log("Contract Address:", CONTRACT_ADDRESS);
  console.log("Subscription ID:", SUBSCRIPTION_ID);
  
  try {
    // Load the VRF v2.5 ABI
    const abiPath = path.join(__dirname, "../node_modules/@chainlink/contracts/abi/v0.8/VRFCoordinatorV2_5.json");
    const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
    
    // Get the VRF Coordinator contract
    const vrfCoordinator = new hre.ethers.Contract(
      VRF_COORDINATOR_V2,
      abi,
      hre.ethers.provider.getSigner()
    );
    
    // Add consumer to subscription
    const tx = await vrfCoordinator.addConsumer(
      SUBSCRIPTION_ID,
      CONTRACT_ADDRESS
    );
    
    console.log("Transaction hash:", tx.hash);
    await tx.wait();
    
    console.log("✅ Successfully added contract as consumer to subscription!");
    console.log("\nNext steps:");
    console.log("1. Fund your subscription with LINK tokens");
    console.log("2. Test the raffle functionality");
    
  } catch (error) {
    console.error("❌ Error adding consumer to subscription:");
    console.error(error.message);
    
    if (error.message.includes("MustBeSubscriptionOwner")) {
      console.log("\n💡 Make sure you are the owner of the subscription!");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
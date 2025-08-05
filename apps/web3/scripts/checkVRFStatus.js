const hre = require("hardhat");

async function main() {
  // VRF v2.5 Configuration for Ethereum Sepolia
  const VRF_COORDINATOR_V2 = "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B";
  const CONTRACT_ADDRESS = "0x34cD89c7e94519004Fcf34807D70F94F886927EA";
  
  console.log("Checking VRF request status...");
  console.log("Contract Address:", CONTRACT_ADDRESS);
  
  try {
    // Load the VRF v2.5 ABI
    const fs = require("fs");
    const path = require("path");
    const abiPath = path.join(__dirname, "../node_modules/@chainlink/contracts/abi/v0.8/VRFCoordinatorV2_5.json");
    const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
    
    // Get the VRF Coordinator contract
    const vrfCoordinator = new hre.ethers.Contract(
      VRF_COORDINATOR_V2,
      abi,
      hre.ethers.provider
    );
    
    // Get the raffle contract
    const ArtNightRaffle = await hre.ethers.getContractFactory("ArtNightRaffle");
    const raffleContract = ArtNightRaffle.attach(CONTRACT_ADDRESS);
    
    // Get raffle ID from environment variable or default to 0
    const raffleId = process.env.RAFFLE_ID || "0";
    
    // Check raffle state
    console.log("\n📊 Raffle State (Raffle ID:", raffleId, "):");
    const isActive = await raffleContract.isRaffleActive(raffleId);
    const isWinnerSelected = await raffleContract.isWinnerSelected(raffleId);
    const winner = await raffleContract.getWinner(raffleId);
    
    console.log("- Raffle Active:", isActive);
    console.log("- Winner Selected:", isWinnerSelected);
    console.log("- Winner:", winner.toString());
    
    if (!isWinnerSelected) {
      console.log("\n⏳ VRF callback is still pending...");
      console.log("This can take 5-10 minutes on Sepolia.");
      console.log("The callback might be delayed due to:");
      console.log("- Network congestion");
      console.log("- Gas limit being too low");
      console.log("- Normal VRF processing time");
      
      console.log("\n💡 If it's been more than 10 minutes, try:");
      console.log("1. Check if your subscription has enough LINK");
      console.log("2. Redeploy with higher gas limit");
      console.log("3. Check the transaction on Etherscan");
    } else {
      console.log("\n🎉 Winner has been selected!");
    }
    
  } catch (error) {
    console.error("❌ Error checking VRF status:");
    console.error(error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
const hre = require("hardhat");

async function main() {
  // Replace with your deployed contract address
  const CONTRACT_ADDRESS = "0xf28295f3291DAA77Eb60B64b30a70ee25ea8C5dB";
  
  // Get raffle ID from environment variable or default to 0
  const raffleId = process.env.RAFFLE_ID || "0";
  
  console.log("Selecting winner using VRF...");
  console.log("Contract Address:", CONTRACT_ADDRESS);
  console.log("Raffle ID:", raffleId);
  
  // Get the contract instance
  const ArtNightRaffle = await hre.ethers.getContractFactory("ArtNightRaffle");
  const raffleContract = ArtNightRaffle.attach(CONTRACT_ADDRESS);
  
  try {
    // Check if raffle is active
    const isActive = await raffleContract.isRaffleActive(raffleId);
    const isWinnerSelected = await raffleContract.isWinnerSelected(raffleId);
    
    console.log("\n📊 Current State:");
    console.log("- Raffle Active:", isActive);
    console.log("- Winner Selected:", isWinnerSelected);
    
    if (!isActive) {
      console.log("❌ Raffle is not active. Create a raffle first.");
      return;
    }
    
    if (isWinnerSelected) {
      console.log("❌ Winner has already been selected for this raffle.");
      return;
    }
    
    // Get current tickets
    const tickets = await raffleContract.getRaffleTickets(raffleId);
    console.log("\n🎫 Current Tickets:", tickets.map(t => t.toString()));
    
    // Request random number from VRF
    console.log("\n🎲 Requesting random number from VRF...");
    const selectWinnerTx = await raffleContract.selectWinner(raffleId);
    
    console.log("Transaction hash:", selectWinnerTx.hash);
    console.log("Waiting for transaction confirmation...");
    
    await selectWinnerTx.wait();
    console.log("✅ Random number request submitted!");
    
    console.log("\n⏳ Waiting for VRF callback...");
    console.log("This may take a few minutes. You can check the winner later.");
    console.log("\nTo check the winner, call:");
    console.log(`RAFFLE_ID=${raffleId} npx hardhat run scripts/checkWinner.js --network sepolia`);
    
  } catch (error) {
    console.error("❌ Error selecting winner:");
    console.error(error.message);
    
    if (error.message.includes("InsufficientFunds")) {
      console.log("\n💡 Make sure your VRF subscription has enough LINK tokens!");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
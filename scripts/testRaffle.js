const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0x15eACC51afD8b24aeCC85835A3F3921B345e8634"; // Contract 3 - proven working
  
  console.log("Testing ArtNightRaffle contract...");
  console.log("Contract Address:", CONTRACT_ADDRESS);
  
  try {
    const ArtNightRaffle = await hre.ethers.getContractFactory("ArtNightRaffle");
    const raffleContract = ArtNightRaffle.attach(CONTRACT_ADDRESS);
    
    // Check current raffle state
    console.log("\n📊 Current Raffle State (Raffle ID 0):");
    const isActive = await raffleContract.isRaffleActive(0);
    const isWinnerSelected = await raffleContract.isWinnerSelected(0);
    const winner = await raffleContract.getWinner(0);
    const ticketCount = await raffleContract.getTicketCount(0);
    
    console.log("- Raffle Active:", isActive);
    console.log("- Winner Selected:", isWinnerSelected);
    console.log("- Ticket Count:", ticketCount.toString());
    console.log("- Winner:", winner.toString());
    
    // Display VRF configuration
    console.log("\n🔧 VRF Configuration:");
    console.log("- VRF Coordinator: 0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B");
    console.log("- Subscription ID: 77899604690368234140542231011632468025290834504310678429410906800047067486655");
    console.log("- Gas Lane: 0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae");
    console.log("- Callback Gas Limit: 50000");
    console.log("- Request Confirmations: 3");
    console.log("- Number of Words: 1");
    
    // Create tickets for the raffle (1-200 for testing)
    const tickets = Array.from({length: 200}, (_, i) => i + 1);
    console.log("\n🎫 Creating new raffle with tickets 1-200...");
    
    // Create the raffle
    const tx = await raffleContract.createRaffle(tickets);
    await tx.wait();
    
    console.log("✅ Raffle created successfully!");
    
    // Get the raffle ID (should be the next one after existing raffles)
    const raffleId = 8; // Based on previous raffles
    console.log("🎫 Raffle ID:", raffleId);
    
    // Check the updated state
    console.log("\n📊 Updated Raffle State:");
    const newIsActive = await raffleContract.isRaffleActive(raffleId);
    const newTicketCount = await raffleContract.getTicketCount(raffleId);
    const newTickets = await raffleContract.getRaffleTickets(raffleId);
    
    console.log("- Raffle Active:", newIsActive);
    console.log("- Ticket Count:", newTicketCount.toString());
    console.log("- Tickets:", newTickets.map(t => t.toString()));
    
    console.log("\n🎲 To select a winner, call:");
    console.log(`RAFFLE_ID=${raffleId} npx hardhat run scripts/selectWinner.js --network sepolia`);
    
  } catch (error) {
    console.error("❌ Error testing raffle:");
    console.error(error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
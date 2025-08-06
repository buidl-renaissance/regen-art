const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0x15eACC51afD8b24aeCC85835A3F3921B345e8634"; // Contract 3 - proven working
  
  console.log("🎲 Simple Raffle Test (5 tickets)...");
  console.log("Contract Address:", CONTRACT_ADDRESS);
  
  try {
    const ArtNightRaffle = await hre.ethers.getContractFactory("ArtNightRaffle");
    const raffleContract = ArtNightRaffle.attach(CONTRACT_ADDRESS);
    
    // Create tickets for the raffle (1-5 for simple test)
    const tickets = [1, 2, 3, 4, 5];
    console.log("\n🎫 Creating raffle with tickets:", tickets);
    
    // Create the raffle
    const tx = await raffleContract.createRaffle(tickets);
    await tx.wait();
    
    console.log("✅ Raffle created successfully!");
    
    // Get the raffle ID (should be the next one)
    const raffleId = 9; // Based on previous raffles
    console.log("🎫 Raffle ID:", raffleId);
    
    // Check the updated state
    console.log("\n📊 Raffle State:");
    const isActive = await raffleContract.isRaffleActive(raffleId);
    const ticketCount = await raffleContract.getTicketCount(raffleId);
    const raffleTickets = await raffleContract.getRaffleTickets(raffleId);
    
    console.log("- Raffle Active:", isActive);
    console.log("- Ticket Count:", ticketCount.toString());
    console.log("- Tickets:", raffleTickets.map(t => t.toString()));
    
    console.log("\n🎲 To select a winner, call:");
    console.log(`RAFFLE_ID=${raffleId} npx hardhat run scripts/selectWinner.js --network sepolia`);
    
  } catch (error) {
    console.error("❌ Error creating raffle:");
    console.error(error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
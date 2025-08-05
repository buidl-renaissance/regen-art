const hre = require("hardhat");

async function main() {
  // Replace with your deployed contract address
  const CONTRACT_ADDRESS = "0xf28295f3291DAA77Eb60B64b30a70ee25ea8C5dB";
  
  // Get raffle ID from environment variable or default to 0
  const raffleId = process.env.RAFFLE_ID || "0";
  
  console.log("Checking raffle winner...");
  console.log("Contract Address:", CONTRACT_ADDRESS);
  console.log("Raffle ID:", raffleId);
  
  // Get the contract instance
  const ArtNightRaffle = await hre.ethers.getContractFactory("ArtNightRaffle");
  const raffleContract = ArtNightRaffle.attach(CONTRACT_ADDRESS);
  
  try {
    // Get raffle state
    console.log("\n📊 Raffle State:");
    const isActive = await raffleContract.isRaffleActive(raffleId);
    const isWinnerSelected = await raffleContract.isWinnerSelected(raffleId);
    const ticketCount = await raffleContract.getTicketCount(raffleId);
    const winner = await raffleContract.getWinner(raffleId);
    
    console.log("- Raffle Active:", isActive);
    console.log("- Winner Selected:", isWinnerSelected);
    console.log("- Ticket Count:", ticketCount.toString());
    console.log("- Winner:", winner.toString());
    
    if (isWinnerSelected && winner > 0) {
      console.log("\n🎉 WINNER SELECTED!");
      console.log("🏆 Winning Ticket Number:", winner.toString());
      
      // Get all tickets for context
      const tickets = await raffleContract.getRaffleTickets(raffleId);
      console.log("\n🎫 All Raffle Tickets:", tickets.map(t => t.toString()));
      
      // Check if winner was in the original tickets
      const winnerInTickets = tickets.includes(winner);
      console.log("- Winner was in original tickets:", winnerInTickets);
      
    } else if (!isWinnerSelected) {
      console.log("\n⏳ No winner selected yet.");
      console.log("The VRF callback may still be pending.");
      console.log("Try running this script again in a few minutes.");
      
    } else {
      console.log("\n❌ No valid winner found.");
    }
    
  } catch (error) {
    console.error("❌ Error checking winner:");
    console.error(error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
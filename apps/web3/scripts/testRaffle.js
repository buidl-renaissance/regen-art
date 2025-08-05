const hre = require("hardhat");

async function main() {
  // Replace with your deployed contract address
  const CONTRACT_ADDRESS = "0x15eACC51afD8b24aeCC85835A3F3921B345e8634";
  
  console.log("Testing ArtNightRaffle contract...");
  console.log("Contract Address:", CONTRACT_ADDRESS);
  
  // Get the contract instance
  const ArtNightRaffle = await hre.ethers.getContractFactory("ArtNightRaffle");
  const raffleContract = ArtNightRaffle.attach(CONTRACT_ADDRESS);
  
  try {
    // Get current raffle state (for raffle ID 0)
    console.log("\n📊 Current Raffle State (Raffle ID 0):");
    const isActive = await raffleContract.isRaffleActive(0);
    const isWinnerSelected = await raffleContract.isWinnerSelected(0);
    const ticketCount = await raffleContract.getTicketCount(0);
    const winner = await raffleContract.getWinner(0);
    
    console.log("- Raffle Active:", isActive);
    console.log("- Winner Selected:", isWinnerSelected);
    console.log("- Ticket Count:", ticketCount.toString());
    console.log("- Winner:", winner.toString());
    
    // Get VRF configuration
    console.log("\n🔧 VRF Configuration:");
    const vrfConfig = await raffleContract.getVRFConfig();
    console.log("- VRF Coordinator:", vrfConfig.vrfCoordinator);
    console.log("- Subscription ID:", vrfConfig.subscriptionId.toString());
    console.log("- Gas Lane:", vrfConfig.gasLane);
    console.log("- Callback Gas Limit:", vrfConfig.callbackGasLimit.toString());
    console.log("- Request Confirmations:", vrfConfig.requestConfirmations.toString());
    console.log("- Number of Words:", vrfConfig.numWords.toString());
    
    // Example: Create a new raffle with ticket numbers 0-100
    console.log("\n🎫 Creating new raffle with tickets 0-100...");
    const tickets = Array.from({length: 100}, (_, i) => i + 1); // Creates array [1, 2, ..., 100]
    const createTx = await raffleContract.createRaffle(tickets);
    const receipt = await createTx.wait();
    console.log("✅ Raffle created successfully!");
    
    // Get the raffle ID from the event
    const raffleCreatedEvent = receipt.events?.find(e => e.event === 'RaffleCreated');
    const raffleId = raffleCreatedEvent ? raffleCreatedEvent.args.raffleId : 0;
    console.log("🎫 Raffle ID:", raffleId.toString());
    
    // Get updated raffle state
    console.log("\n📊 Updated Raffle State:");
    const updatedIsActive = await raffleContract.isRaffleActive(raffleId);
    const updatedTicketCount = await raffleContract.getTicketCount(raffleId);
    const raffleTickets = await raffleContract.getRaffleTickets(raffleId);
    
    console.log("- Raffle Active:", updatedIsActive);
    console.log("- Ticket Count:", updatedTicketCount.toString());
    console.log("- Tickets:", raffleTickets.map(t => t.toString()));
    
    console.log("\n🎲 To select a winner, call:");
    console.log(`RAFFLE_ID=${raffleId} npx hardhat run scripts/selectWinner.js --network sepolia`);
    
  } catch (error) {
    console.error("❌ Error testing raffle contract:");
    console.error(error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
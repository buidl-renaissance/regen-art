const hre = require("hardhat");

async function main() {
  // Replace with your deployed contract address
  const CONTRACT_ADDRESS = "0x34cD89c7e94519004Fcf34807D70F94F886927EA";
  
  // Get raffle ID from environment variable or default to 0
  const raffleId = process.env.RAFFLE_ID || "0";
  
  console.log("Checking for RandomValueReceived events...");
  console.log("Contract Address:", CONTRACT_ADDRESS);
  console.log("Raffle ID:", raffleId);
  
  try {
    // Get the contract instance
    const ArtNightRaffle = await hre.ethers.getContractFactory("ArtNightRaffle");
    const raffleContract = ArtNightRaffle.attach(CONTRACT_ADDRESS);
    
    // Get current raffle state
    console.log("\n📊 Current Raffle State:");
    const isActive = await raffleContract.isRaffleActive(raffleId);
    const isWinnerSelected = await raffleContract.isWinnerSelected(raffleId);
    const winner = await raffleContract.getWinner(raffleId);
    const ticketCount = await raffleContract.getTicketCount(raffleId);
    
    console.log("- Raffle Active:", isActive);
    console.log("- Winner Selected:", isWinnerSelected);
    console.log("- Winner:", winner.toString());
    console.log("- Ticket Count:", ticketCount.toString());
    
    // Check for recent events
    console.log("\n🔍 Checking for recent events...");
    
    // Get the latest block number
    const latestBlock = await hre.ethers.provider.getBlockNumber();
    const fromBlock = latestBlock - 100; // Check last 100 blocks
    
    // Filter for RandomValueReceived events
    const filter = raffleContract.filters.RandomValueReceived();
    const events = await raffleContract.queryFilter(filter, fromBlock, latestBlock);
    
    if (events.length > 0) {
      console.log("\n🎲 Found RandomValueReceived events:");
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        console.log(`Event ${i + 1}:`);
        console.log(`- Request ID: ${event.args.requestId.toString()}`);
        console.log(`- Random Value: ${event.args.randomValue.toString()}`);
        console.log(`- Random Index: ${event.args.randomIndex.toString()}`);
        console.log(`- Winning Ticket: ${event.args.winningTicket.toString()}`);
        console.log(`- Block: ${event.blockNumber}`);
        console.log(`- Transaction: ${event.transactionHash}`);
      }
    } else {
      console.log("\n❌ No RandomValueReceived events found in recent blocks.");
      console.log("This suggests the VRF callback hasn't completed yet.");
    }
    
    // Also check for WinnerSelected events
    const winnerFilter = raffleContract.filters.WinnerSelected();
    const winnerEvents = await raffleContract.queryFilter(winnerFilter, fromBlock, latestBlock);
    
    if (winnerEvents.length > 0) {
      console.log("\n🏆 Found WinnerSelected events:");
      for (let i = 0; i < winnerEvents.length; i++) {
        const event = winnerEvents[i];
        console.log(`Event ${i + 1}:`);
        console.log(`- Raffle ID: ${event.args.raffleId.toString()}`);
        console.log(`- Winner: ${event.args.winner.toString()}`);
        console.log(`- Block: ${event.blockNumber}`);
        console.log(`- Transaction: ${event.transactionHash}`);
      }
    } else {
      console.log("\n❌ No WinnerSelected events found in recent blocks.");
    }
    
  } catch (error) {
    console.error("❌ Error checking random value events:");
    console.error(error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
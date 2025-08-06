const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0x15eACC51afD8b24aeCC85835A3F3921B345e8634"; // Contract 3 - proven working
  
  console.log("🧪 Reliability Test - Running 5 consecutive raffles...");
  console.log("Contract Address:", CONTRACT_ADDRESS);
  
  const results = [];
  
  for (let i = 0; i < 5; i++) {
    console.log(`\n🎲 ===== RAFFLE ${i + 1}/5 =====`);
    
    try {
      const ArtNightRaffle = await hre.ethers.getContractFactory("ArtNightRaffle");
      const raffleContract = ArtNightRaffle.attach(CONTRACT_ADDRESS);
      
      // Create tickets for the raffle (1-50 for reliability test)
      const tickets = Array.from({length: 50}, (_, j) => j + 1);
      console.log(`🎫 Creating raffle ${i + 1} with tickets 1-50...`);
      
      // Create the raffle
      const createTx = await raffleContract.createRaffle(tickets);
      await createTx.wait();
      
      console.log("✅ Raffle created successfully!");
      
      // Get the raffle ID (should be the next one)
      const raffleId = 11 + i; // Starting from raffle 11
      console.log(`🎫 Raffle ID: ${raffleId}`);
      
      // Check the initial state
      console.log("\n📊 Initial State:");
      const isActive = await raffleContract.isRaffleActive(raffleId);
      const ticketCount = await raffleContract.getTicketCount(raffleId);
      console.log("- Raffle Active:", isActive);
      console.log("- Ticket Count:", ticketCount.toString());
      
      // Select winner
      console.log("\n🎲 Requesting random number from VRF...");
      const selectTx = await raffleContract.selectWinner(raffleId);
      await selectTx.wait();
      
      console.log("✅ Random number request submitted!");
      console.log("⏳ Waiting for VRF callback...");
      
      // Wait for callback (2 minutes)
      console.log("⏰ Waiting 2 minutes for VRF callback...");
      await new Promise(resolve => setTimeout(resolve, 120000));
      
      // Check the final state
      console.log("\n📊 Final State:");
      const finalIsActive = await raffleContract.isRaffleActive(raffleId);
      const finalIsWinnerSelected = await raffleContract.isWinnerSelected(raffleId);
      const winner = await raffleContract.getWinner(raffleId);
      
      console.log("- Raffle Active:", finalIsActive);
      console.log("- Winner Selected:", finalIsWinnerSelected);
      console.log("- Winner:", winner.toString());
      
      const result = {
        raffleId: raffleId,
        success: finalIsWinnerSelected,
        winner: winner.toString(),
        active: finalIsActive
      };
      
      results.push(result);
      
      if (finalIsWinnerSelected) {
        console.log("🎉 SUCCESS - Winner selected!");
      } else {
        console.log("❌ FAILED - No winner selected");
      }
      
      // Wait 30 seconds between raffles
      if (i < 4) {
        console.log("\n⏰ Waiting 30 seconds before next raffle...");
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
      
    } catch (error) {
      console.error(`❌ Error in raffle ${i + 1}:`);
      console.error(error.message);
      
      results.push({
        raffleId: 11 + i,
        success: false,
        winner: "ERROR",
        active: false,
        error: error.message
      });
    }
  }
  
  // Summary
  console.log("\n📊 ===== RELIABILITY TEST SUMMARY =====");
  console.log(`Total Raffles: ${results.length}`);
  console.log(`Successful: ${results.filter(r => r.success).length}`);
  console.log(`Failed: ${results.filter(r => !r.success).length}`);
  console.log(`Success Rate: ${((results.filter(r => r.success).length / results.length) * 100).toFixed(1)}%`);
  
  console.log("\n🎯 Individual Results:");
  results.forEach((result, index) => {
    const status = result.success ? "✅ SUCCESS" : "❌ FAILED";
    console.log(`Raffle ${index + 1} (ID: ${result.raffleId}): ${status} - Winner: ${result.winner}`);
  });
  
  if (results.filter(r => r.success).length >= 4) {
    console.log("\n🎉 EXCELLENT RELIABILITY - System is very reliable!");
  } else if (results.filter(r => r.success).length >= 3) {
    console.log("\n✅ GOOD RELIABILITY - System is working well");
  } else {
    console.log("\n⚠️ POOR RELIABILITY - System needs investigation");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
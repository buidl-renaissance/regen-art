const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0x15eACC51afD8b24aeCC85835A3F3921B345e8634";
  
  console.log("🎲 Randomness Distribution Test");
  console.log("Contract Address:", CONTRACT_ADDRESS);
  console.log("\n📊 Testing randomness distribution across multiple raffles...");
  
  const results = [];
  const ticketRange = 100; // Test with 100 tickets for easier analysis
  
  for (let i = 0; i < 10; i++) {
    console.log(`\n🎯 Test ${i + 1}/10`);
    
    try {
      const ArtNightRaffle = await hre.ethers.getContractFactory("ArtNightRaffle");
      const raffleContract = ArtNightRaffle.attach(CONTRACT_ADDRESS);
      
      // Create tickets for the raffle (1-100)
      const tickets = Array.from({length: ticketRange}, (_, j) => j + 1);
      console.log(`🎫 Creating raffle with tickets 1-${ticketRange}...`);
      
      // Create the raffle
      const createTx = await raffleContract.createRaffle(tickets);
      await createTx.wait();
      
      console.log("✅ Raffle created successfully!");
      
      // Get the raffle ID
      const raffleId = 21 + i; // Starting from raffle 21
      console.log(`🎫 Raffle ID: ${raffleId}`);
      
      // Select winner
      console.log("🎲 Requesting random number from VRF...");
      const selectTx = await raffleContract.selectWinner(raffleId);
      await selectTx.wait();
      
      console.log("✅ Random number request submitted!");
      console.log("⏳ Waiting for VRF callback...");
      
      // Wait for callback (2 minutes)
      console.log("⏰ Waiting 2 minutes for VRF callback...");
      await new Promise(resolve => setTimeout(resolve, 120000));
      
      // Check the final state
      const finalIsActive = await raffleContract.isRaffleActive(raffleId);
      const finalIsWinnerSelected = await raffleContract.isWinnerSelected(raffleId);
      const winner = await raffleContract.getWinner(raffleId);
      
      console.log("📊 Final State:");
      console.log("- Raffle Active:", finalIsActive);
      console.log("- Winner Selected:", finalIsWinnerSelected);
      console.log("- Winner:", winner.toString());
      
      if (finalIsWinnerSelected) {
        console.log("🎉 SUCCESS - Winner selected!");
        
        // Calculate the index that was selected
        const winnerIndex = winner.toNumber() - 1; // Convert ticket number to 0-based index
        const winnerPosition = winnerIndex + 1; // Convert back to 1-based for display
        
        results.push({
          testNumber: i + 1,
          raffleId: raffleId,
          winner: winner.toNumber(),
          winnerIndex: winnerIndex,
          winnerPosition: winnerPosition,
          ticketRange: ticketRange
        });
        
        console.log(`📈 Winner Analysis:`);
        console.log(`- Ticket Number: ${winner.toString()}`);
        console.log(`- Array Index: ${winnerIndex}`);
        console.log(`- Position in Range: ${winnerPosition}/${ticketRange}`);
        console.log(`- Percentage: ${((winnerPosition / ticketRange) * 100).toFixed(1)}%`);
        
      } else {
        console.log("❌ FAILED - No winner selected");
      }
      
      // Wait 30 seconds between tests
      if (i < 9) {
        console.log("\n⏰ Waiting 30 seconds before next test...");
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
      
    } catch (error) {
      console.error(`❌ Error in test ${i + 1}:`);
      console.error(error.message);
    }
  }
  
  // Analyze the distribution
  console.log("\n📊 ===== RANDOMNESS DISTRIBUTION ANALYSIS =====");
  console.log(`Total Tests: ${results.length}`);
  
  if (results.length > 0) {
    const winners = results.map(r => r.winner);
    const positions = results.map(r => r.winnerPosition);
    const percentages = results.map(r => (r.winnerPosition / r.ticketRange) * 100);
    
    console.log("\n🎯 Winner Distribution:");
    console.log("Winners:", winners.join(", "));
    console.log("Positions:", positions.join(", "));
    console.log("Percentages:", percentages.map(p => p.toFixed(1) + "%").join(", "));
    
    // Calculate statistics
    const avgPosition = positions.reduce((a, b) => a + b, 0) / positions.length;
    const avgPercentage = percentages.reduce((a, b) => a + b, 0) / percentages.length;
    
    console.log("\n📈 Statistical Analysis:");
    console.log(`- Average Position: ${avgPosition.toFixed(1)}/${ticketRange}`);
    console.log(`- Average Percentage: ${avgPercentage.toFixed(1)}%`);
    console.log(`- Expected Average: ${(ticketRange / 2).toFixed(1)}/${ticketRange} (50.0%)`);
    
    // Check for bias
    const bias = Math.abs(avgPercentage - 50);
    console.log(`- Bias from 50%: ${bias.toFixed(1)}%`);
    
    if (bias < 10) {
      console.log("✅ GOOD DISTRIBUTION - Randomness appears fair");
    } else if (bias < 20) {
      console.log("⚠️ MODERATE BIAS - Some deviation from expected");
    } else {
      console.log("❌ HIGH BIAS - Significant deviation from expected");
    }
    
    // Check range coverage
    const minWinner = Math.min(...winners);
    const maxWinner = Math.max(...winners);
    const rangeCoverage = ((maxWinner - minWinner + 1) / ticketRange) * 100;
    
    console.log(`\n🎲 Range Coverage:`);
    console.log(`- Min Winner: ${minWinner}`);
    console.log(`- Max Winner: ${maxWinner}`);
    console.log(`- Range Covered: ${maxWinner - minWinner + 1}/${ticketRange} (${rangeCoverage.toFixed(1)}%)`);
    
    if (rangeCoverage > 80) {
      console.log("✅ EXCELLENT COVERAGE - Winners spread across most of the range");
    } else if (rangeCoverage > 60) {
      console.log("⚠️ MODERATE COVERAGE - Some clustering observed");
    } else {
      console.log("❌ POOR COVERAGE - Winners clustered in small range");
    }
  }
  
  console.log("\n🔍 Modulo Approach Analysis:");
  console.log("The current implementation uses: randomIndex = randomValue % raffle.tickets.length");
  console.log("This approach is mathematically sound because:");
  console.log("1. It ensures the index is always within the valid range [0, tickets.length-1]");
  console.log("2. It maintains uniform distribution when the random value is much larger than the range");
  console.log("3. Chainlink VRF provides cryptographically secure random values");
  console.log("4. The modulo operation is deterministic and fair");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(
        process.env.MEMONIC, // Your wallet private key
        `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}` // Infura endpoint
      ),
      network_id: 11155111,       // Goerli's network id
      gas: 5500000,        // Gas limit
      confirmations: 2,    // # of confirmations to wait between deployments
      timeoutBlocks: 200,  // # of blocks before a deployment times out
      skipDryRun: true     // Skip dry run before migrations
    }
  },
  compilers: {
    solc: {
      version: "0.8.20",  // Specify Solidity compiler version
    }
  }
};


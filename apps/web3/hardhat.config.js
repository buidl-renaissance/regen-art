require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`, // Use Infura with Sepolia
      accounts: [`${process.env.PRIVATE_KEY}`], // Private key of your wallet for deploying contracts
    },
    baseSepolia: {
      url: 'https://sepolia.base.org',
      accounts: [`${process.env.PRIVATE_KEY}`],
      gasPrice: 1000000000,
    },
    base: {
      url: 'https://mainnet.base.org',
      accounts: [`${process.env.PRIVATE_KEY}`],
      gasPrice: 1000000000,
    },
  },
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

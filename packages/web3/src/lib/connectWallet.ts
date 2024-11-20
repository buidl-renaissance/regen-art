
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

export const getWalletProvider = () => {
    return new ethers.providers.Web3Provider(window.ethereum);
}

export const getWalletSigner = async () => {
    const provider = getWalletProvider();
    return provider.getSigner();
}

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      // Request wallet connection
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Set up ethers provider and signer
      const signer = await getWalletSigner();

      // Log wallet address
      const userAddress = await signer.getAddress();
      console.log('Connected wallet:', userAddress);

      alert(`Wallet connected: ${userAddress}`);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  } else {
    alert('MetaMask is not installed. Please install it to use this feature.');
  }
};

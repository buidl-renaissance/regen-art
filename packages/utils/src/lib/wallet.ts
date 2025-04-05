import { ethers } from 'ethers';

/**
 * Generates a new Ethereum wallet or retrieves an existing one from localStorage
 * @returns An object containing the wallet, address, and private key
 */
export const getOrCreateHotWallet = () => {
  const storageKey = 'eth_wallet_phrase';
  let phrase = localStorage.getItem(storageKey) || null;
  let wallet: ethers.HDNodeWallet;

  // If no private key exists in localStorage, create a new wallet
  if (!phrase) {
    wallet = ethers.Wallet.createRandom();
    phrase = wallet.mnemonic?.phrase || null;
    if (phrase) {
      localStorage.setItem(storageKey, phrase);
    }
  } else {
    // If a private key exists, create a wallet instance from it
    wallet = ethers.Wallet.fromPhrase(phrase) as ethers.HDNodeWallet;
  }

  return {
    wallet,
    address: wallet.address,
    phrase
  };
};

/**
 * Clears the stored wallet from localStorage
 */
export const clearStoredWallet = () => {
  localStorage.removeItem('eth_wallet_phrase');
};

/**
 * Signs a message with the wallet's private key
 * @param message - The message to sign
 * @returns The signature
 */
export const signMessage = async (message: string) => {
  const { wallet } = getOrCreateHotWallet();
  return await wallet.signMessage(message);
};

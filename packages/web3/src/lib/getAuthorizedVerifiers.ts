import { ethers } from 'ethers';
import { INVESTOR_REGISTRY_ABI } from './investorRegistry';

// Function for client-side interaction to create a new property
export const getAuthorizedVerifiers = async (): Promise<any> => {
  const provider = new ethers.providers.InfuraProvider(
    'sepolia',
    'c135bebf5b714a58940f17f031d4b278'
  );

  try {
    // Create contract instance with signer
    const contract = new ethers.Contract(
      '0x456F234c7e40cADda988D115FB7E45d714c51506',
      INVESTOR_REGISTRY_ABI,
      provider
    );

    // Create property
    return await contract['getAuthorizedVerifiers']();
  } catch (error: any) {
    throw new Error(`Error getting authorized verifiers: ${error.message}`);
  }
};

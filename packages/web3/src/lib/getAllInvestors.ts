import { ethers } from 'ethers';
import { INVESTOR_REGISTRY_ABI } from './investorRegistry';

// Function for client-side interaction to create a new property
export const getAllInvestors = async (): Promise<{
  receipt: any;
  txHash: string;
}> => {
  const provider = new ethers.providers.InfuraProvider(
    'sepolia',
    'c135bebf5b714a58940f17f031d4b278'
  );

  try {
    // Create contract instance with signer
    const contract = new ethers.Contract(
      '0x38CbB9098b95c04976FEa2186fC74103325e81b8',
      INVESTOR_REGISTRY_ABI,
      provider
    );

    // Create property
    const tx = await contract['getAllInvestors']();

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    return { receipt, txHash: tx.hash };
  } catch (error: any) {
    throw new Error(`Error creating property: ${error.message}`);
  }
};

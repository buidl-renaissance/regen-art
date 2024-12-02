import { ethers } from 'ethers';
import { getWalletSigner } from './connectWallet';
import { INVESTOR_REGISTRY_ABI } from './investorRegistry';

interface AuthorizeVerifierData {
    verifierAddress: string;
}

// Function for client-side interaction to create a new property
export const authorizeVerifier = async (
  authorizeVerifierData: AuthorizeVerifierData
): Promise<{ receipt: any; txHash: string }> => {
  const { verifierAddress } = authorizeVerifierData;

  try {
    // Need to use a signer since this is a state-changing operation
    const signer = await getWalletSigner();

    // Create contract instance with signer
    const contract = new ethers.Contract(
      '0x456F234c7e40cADda988D115FB7E45d714c51506',
      INVESTOR_REGISTRY_ABI,
      signer
    );

    // Create property
    const tx = await contract['authorizeVerifier'](verifierAddress, { gasLimit: 16721975 });

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    return { receipt, txHash: tx.hash };
  } catch (error: any) {
    throw new Error(`Error creating property: ${error.message}`);
  }
};

import { ethers } from 'ethers';
import { getWalletSigner } from './connectWallet';
import { INVESTOR_REGISTRY_ABI } from './investorRegistry';

interface RegisterInvestorData {
  name: string;
}

// Function for client-side interaction to create a new property
export const registerInvestor = async (
  registerInvestorData: RegisterInvestorData
): Promise<{ receipt: any; txHash: string }> => {
  const { name } = registerInvestorData;

  try {
    // Need to use a signer since this is a state-changing operation
    const signer = await getWalletSigner();

    // Create contract instance with signer
    const contract = new ethers.Contract(
      '0x38CbB9098b95c04976FEa2186fC74103325e81b8',
      INVESTOR_REGISTRY_ABI,
      signer
    );

    // Create property
    const tx = await contract['registerInvestor'](name, { gasLimit: 16721975 });

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    return { receipt, txHash: tx.hash };
  } catch (error: any) {
    throw new Error(`Error creating property: ${error.message}`);
  }
};

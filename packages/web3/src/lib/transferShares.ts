import { ethers } from 'ethers';
import { getWalletSigner } from './connectWallet';
import { REAL_ESTATE_PROPERTY_ABI } from './realEstateProperty';


interface TransferSharesData {
  contractAddress: string;
  propertyId: number;
  to: string;
  amount: number;
}

// Function for client-side interaction to create a new property
export const transferShares = async (
  transferSharesData: TransferSharesData
): Promise<{ receipt: any; txHash: string; }> => {
  const { contractAddress, propertyId, to, amount } = transferSharesData;

  try {
    // Create contract ABI - this should match your deployed contract
    // const abi = [
    //   'function transferShares(uint256 propertyId, address to, uint256 amount) public',
    // ];

    // Need to use a signer since this is a state-changing operation
    const signer = await getWalletSigner();

    // Create contract instance with signer
    const contract = new ethers.Contract(contractAddress, REAL_ESTATE_PROPERTY_ABI, signer);

    // Create property
    const tx = await contract['transferShares'](
      propertyId,
      to,
      amount,
    );

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    return { receipt, txHash: tx.hash };
  } catch (error: any) {
    throw new Error(`Error creating property: ${error.message}`);
  }
};

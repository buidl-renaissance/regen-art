import { ethers } from 'ethers';
import { getWalletSigner } from './connectWallet';
import { REAL_ESTATE_PROPERTY_ABI } from './realEstateProperty';
import { getProvider } from './provider';
// import { getProvider } from './provider';


interface PropertyFormData {
  contractAddress: string;
  location: string;
  description: string;
  ipfsHash: string;
}

// Function for client-side interaction to create a new property
export const mintProperty = async (
  propertyFormData: PropertyFormData
): Promise<{ receipt: any; txHash: string; tokenId: string | null }> => {
  const { contractAddress, location, description, ipfsHash } = propertyFormData;

  try {
    // Create contract ABI - this should match your deployed contract
    const abi = [
      'function mintProperty(address owner, string memory location, string memory description, string memory ipfsHash) public',
    ];

    // Need to use a signer since this is a state-changing operation
    const signer = await getWalletSigner();

    // Create contract instance with signer
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Create property
    const tx = await contract['mintProperty'](
      await signer.getAddress(),
      location,
      description,
      ipfsHash,
    );

    // Wait for transaction to be mined
    const receipt = await tx.wait();

    const tokenId = getTokenIdFromReceipt(receipt);

    return { receipt, txHash: tx.hash, tokenId };
  } catch (error: any) {
    throw new Error(`Error creating property: ${error.message}`);
  }
};

export const getTokenIdFromReceipt = (receipt: any) => {
  // Check for logs in the receipt
  if (receipt && receipt.logs) {
    for (const log of receipt.logs) {
        try {
            // Decode the log if it's from your contract
            // Replace with your contract's ABI and interface
            const abi = REAL_ESTATE_PROPERTY_ABI;
            const contractInterface = new ethers.utils.Interface(abi);

            const parsedLog = contractInterface.parseLog(log);

            // Look for the event that contains the token ID
            if (parsedLog && parsedLog.name === "Transfer") {
                // Assumes an ERC721 Transfer event
                const tokenId = parsedLog.args['tokenId'];
                console.log("Token ID:", tokenId.toString());
                return tokenId.toString();
            }
        } catch (error) {
            // Skip logs that can't be parsed by your contract ABI
            continue;
        }
    }
  }
  return null;
}

export const getTokenIdFromTransactionHash = async (txHash: string) => {
  try {
      // Get the transaction receipt
      const receipt = await getProvider().getTransactionReceipt(txHash);
      const tokenId = getTokenIdFromReceipt(receipt);
      console.log('tokenId: ', tokenId);
      return tokenId;
  } catch (error) {
      console.error("Error fetching transaction:", error);
      return null;
  }
};
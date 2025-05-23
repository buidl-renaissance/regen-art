import { RealEstatePropertyContract } from './contract';
import { getProvider } from '../provider';
import { getWalletSigner } from '../connectWallet';

export const getProperty = async (propertyId: number): Promise<any> => {
  const contract = RealEstatePropertyContract(getProvider());
  return await contract['getProperty'](propertyId);
};

export const getProperties = async (): Promise<any> => {
  const contract = RealEstatePropertyContract(getProvider());
  const result = await contract['getProperties']();
  // console.log('result: ', result);
  return result.map((property: any) => ({
    id: BigInt(property.id._hex).toString(),
    location: property.location,
    description: property.description,
    ipfsHash: property.ipfsHash,
    totalShares: BigInt(property.totalShares._hex).toString(),
    numberOfStakeholders: BigInt(property.numberOfStakeholders._hex).toString(),
  }));
};

interface PropertyFormData {
  location: string;
  description: string;
  ipfsHash: string;
}

// Function for client-side interaction to create a new property
export const mintProperty = async (
  propertyFormData: PropertyFormData
): Promise<{ receipt: any; txHash: string; tokenId: string | null }> => {
  const { location, description, ipfsHash } = propertyFormData;

  // Need to use a signer since this is a state-changing operation
  const signer = await getWalletSigner();

  const contract = RealEstatePropertyContract(signer);

  // Create property
  const tx = await contract['mintProperty'](
    await signer.getAddress(),
    location,
    description,
    ipfsHash
  );

  // Wait for transaction to be mined
  const receipt = await tx.wait();

  const tokenId = getTokenIdFromReceipt(receipt);

  return { receipt, txHash: tx.hash, tokenId };
};

export const getTokenIdFromReceipt = (receipt: any) => {
  // Check for logs in the receipt
  if (receipt && receipt.logs) {
    for (const log of receipt.logs) {
      try {
        // Decode the log if it's from your contract
        // Replace with your contract's ABI and interface
        const contract = RealEstatePropertyContract(getProvider());

        const parsedLog = contract.interface.parseLog(log);

        // Look for the event that contains the token ID
        if (parsedLog && parsedLog.name === 'Transfer') {
          // Assumes an ERC721 Transfer event
          const tokenId = parsedLog.args['tokenId'];
          console.log('Token ID:', tokenId.toString());
          return tokenId.toString();
        }
      } catch (error) {
        // Skip logs that can't be parsed by your contract ABI
        continue;
      }
    }
  }
  return null;
};

export const getTokenIdFromTransactionHash = async (txHash: string) => {
  try {
    // Get the transaction receipt
    const receipt = await getProvider().getTransactionReceipt(txHash);
    const tokenId = getTokenIdFromReceipt(receipt);
    console.log('tokenId: ', tokenId);
    return tokenId;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return null;
  }
};

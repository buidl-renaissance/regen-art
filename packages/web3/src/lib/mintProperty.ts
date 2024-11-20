import { ethers } from 'ethers';
import { getWalletSigner } from './connectWallet';

interface PropertyFormData {
  contractAddress: string;
  location: string;
  price: string;
  description: string;
}

// Function for client-side interaction to create a new property
export const mintProperty = async (
  propertyFormData: PropertyFormData
): Promise<void> => {
  const { contractAddress, location, price, description } = propertyFormData;

  try {
    // Create contract ABI - this should match your deployed contract
    const abi = [
      'function mintProperty(address owner, string memory location, uint256 price, string memory description) public',
    ];

    // Need to use a signer since this is a state-changing operation
    const signer = await getWalletSigner();

    // Create contract instance with signer
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Convert price from ether to wei
    const priceInWei = ethers.utils.parseEther(price);

    // Create property
    const tx = await contract['mintProperty'](
      await signer.getAddress(),
      location,
      priceInWei,
      description
    );

    // Wait for transaction to be mined
    await tx.wait();

    return tx;
  } catch (error: any) {
    throw new Error(`Error creating property: ${error.message}`);
  }
};

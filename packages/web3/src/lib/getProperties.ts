import { ethers } from 'ethers';
import { Property } from './interfaces';
import { getProvider } from './provider';
// Function for client-side interaction
export const getProperties = async (contractAddress: string): Promise<Property[]> => {

    const provider = getProvider();

    try {
        // Create contract ABI - this should match your deployed contract
        const abi = [
            "function getProperties() view returns (Property[])"
        ];

        // Create contract instance
        const contract = new ethers.Contract(contractAddress, abi, provider);

        // Get property details
        const properties = await contract['getProperties']();

        // Return formatted property details
        return properties;
    } catch (error: any) {
        throw new Error(`Error getting property details: ${error.message}`);
    }
}
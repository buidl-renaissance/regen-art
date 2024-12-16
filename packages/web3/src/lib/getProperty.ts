import { ethers } from 'ethers';
import { Property } from './interfaces';
import { getProvider } from './provider';
// Function for client-side interaction
export const getProperty = async (contractAddress: string, propertyId: number): Promise<Property> => {

    const provider = getProvider();

    try {
        // Create contract ABI - this should match your deployed contract
        const abi = [
            "function getProperty(uint256 propertyId) view returns (address, string, string, string, uint256, address[], address[])"
        ];

        // Create contract instance
        const contract = new ethers.Contract(contractAddress, abi, provider);

        // Get property details
        const [owner, location, description, ipfsHash, totalShares, stakeholders, shares] = await contract['getProperty'](propertyId);

        // Return formatted property details
        return {
            propertyId,
            location,
            ipfsHash,
            description,
            owner,
            totalShares: totalShares.toString(),
            stakeholders,
            shares: shares.map((share: any) => parseInt(share, 16).toString())
        };
    } catch (error: any) {
        throw new Error(`Error getting property details: ${error.message}`);
    }
}
import { ethers } from 'ethers';
import { Property } from './interfaces';
// Function for client-side interaction
export const getPropertyDetailsClient = async (contractAddress: string, propertyId: number): Promise<Property> => {

    const provider = new ethers.providers.InfuraProvider('sepolia', 'c135bebf5b714a58940f17f031d4b278');

    try {
        // Create contract ABI - this should match your deployed contract
        const abi = [
            "function getPropertyDetails(uint256 propertyId) view returns (string, uint256, string, address, uint256, uint256)"
        ];

        // Create contract instance
        const contract = new ethers.Contract(contractAddress, abi, provider);

        // Get property details
        const [location, price, description, owner, totalShares, availableShares] = await contract['getPropertyDetails'](propertyId);

        // Return formatted property details
        return {
            propertyId,
            location,
            price: ethers.utils.formatEther(price),
            description,
            owner,
            totalShares: totalShares.toString(),
            availableShares: availableShares.toString()
        };
    } catch (error: any) {
        throw new Error(`Error getting property details: ${error.message}`);
    }
}
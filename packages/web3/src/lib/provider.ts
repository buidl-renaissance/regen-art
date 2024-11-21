import { ethers } from "ethers";

export const getProvider = () => {
    return new ethers.providers.InfuraProvider('sepolia', 'c135bebf5b714a58940f17f031d4b278');
}
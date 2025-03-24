import { ethers } from "ethers";

export const getProvider = () => {
    return new ethers.BrowserProvider(window.ethereum);
}
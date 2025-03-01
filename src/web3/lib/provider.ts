import { ethers } from "ethers";

export const getProvider = () => {
  return new ethers.providers.JsonRpcProvider(
    "https://sepolia.base.org"
  );
};

import { ethers } from "ethers";

export const getProvider = () => {
  return new ethers.JsonRpcProvider(
    "https://sepolia.base.org"
  );
};

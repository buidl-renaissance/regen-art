import { ethers } from "ethers";

export const getProvider = () => {
  return new ethers.JsonRpcProvider(
    "https://mainnet.base.org"
  );
};

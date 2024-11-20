import React from 'react';
import { ethers } from 'ethers';
import { connectWallet, getWalletSigner } from '@gods.work/web3';

export const useWallet = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [signer, setSigner] = React.useState<ethers.Signer | null>(null);
  const [userAddress, setUserAddress] = React.useState<string | null>(null);
  React.useEffect(() => {
    const checkConnection = async () => {
      const signer = await getWalletSigner();
      if (signer) {
        const userAddress = await signer.getAddress();
        setIsConnected(!!userAddress);
        setSigner(signer);
        setUserAddress(userAddress);
      }
    };
    checkConnection();
  }, []);

  return {
    isConnected,
    signer,
    userAddress,
    connectWallet,
  };
};

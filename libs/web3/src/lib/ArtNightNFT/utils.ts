import { getWalletSigner } from "../connectWallet";
import { ArtNightNFTContract } from "./contract";
import { getTokenIdFromReceipt } from "../RealEstateProperty/utils";

// Function for client-side interaction to create a new property
export const mintArtNightNFT = async (tokenURI: string): Promise<{ receipt: any; txHash: string; tokenId: string | null }> => {

  // Need to use a signer since this is a state-changing operation
  const signer = await getWalletSigner();

  const contract = ArtNightNFTContract(signer);

  // Create property
  const tx = await contract['mintNFT'](
    await signer.getAddress(),
    tokenURI
  );

  // Wait for transaction to be mined
  const receipt = await tx.wait();

  const tokenId = getTokenIdFromReceipt(receipt);

  return { receipt, txHash: tx.hash, tokenId };
};

export const getTokenURI = async (tokenId: string) => {
  const signer = await getWalletSigner();
  const contract = ArtNightNFTContract(signer);
  return contract['tokenURI'](tokenId);
};

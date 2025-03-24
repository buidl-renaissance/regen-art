import { getWalletSigner } from "../connectWallet";
import { getProvider } from "../provider";
import { CollectiveArtContract } from "./contract";

// Function for client-side interaction to create a new property
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mintCollectiveArt = async (tokenURI: string, collective: string): Promise<{ receipt: any; txHash: string; tokenId: string | null }> => {

  // Need to use a signer since this is a state-changing operation
  const signer = await getWalletSigner();

  const contract = CollectiveArtContract(signer);

  // Create property
  const tx = await contract['mintNFT'](
    collective,
    tokenURI,
  );

  // Wait for transaction to be mined
  const receipt = await tx.wait();

  const tokenId = getTokenIdFromReceipt(receipt);

  return { receipt, txHash: tx.hash, tokenId };
};

export const getTokenURI = async (tokenId: string) => {
  const signer = await getWalletSigner();
  const contract = CollectiveArtContract(signer);
  return contract['tokenURI'](tokenId);
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTokenIdFromReceipt = (receipt: any) => {
  // Check for logs in the receipt
  if (receipt && receipt.logs) {
    for (const log of receipt.logs) {
      try {
        // Decode the log if it's from your contract
        // Replace with your contract's ABI and interface
        const contract = CollectiveArtContract(getProvider());

        const parsedLog = contract.interface.parseLog(log);

        // Look for the event that contains the token ID
        if (parsedLog && parsedLog.name === "Transfer") {
          // Assumes an ERC721 T  ransfer event
          const tokenId = parsedLog.args["tokenId"];
          console.log("Token ID:", tokenId.toString());
          return tokenId.toString();
        }
      } catch (error: unknown) {
        // Skip logs that can't be parsed by your contract ABI
        console.error("Error parsing log:", error);
        continue;
      }
    }
  }
  return null;
};

export const getTokenIdFromTransactionHash = async (txHash: string) => {
  try {
    // Get the transaction receipt
    const receipt = await getProvider().getTransactionReceipt(txHash);
    const tokenId = getTokenIdFromReceipt(receipt);
    console.log("tokenId: ", tokenId);
    return tokenId;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return null;
  }
};

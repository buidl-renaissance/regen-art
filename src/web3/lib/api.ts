import { ethers } from "ethers";
import { ArtNightNFTContract } from "./ArtNightNFT/contract";
import { Artwork } from "@/types";

export const getAllNFTArtwork = async () => {
  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://sepolia.base.org", 
    skipFetchSetup: true, // Disable caching
  });

  const contract = ArtNightNFTContract(provider);
  const totalSupply = await contract.artworkCounter();
  console.log("totalSupply", totalSupply.toString());

  const artworks: Artwork[] = [];
  for (let i = 1; i <= Number(totalSupply.toString()); i++) {
    const artwork = await getNFTArtwork(i.toString());
    artworks.push(artwork);
  }
  return artworks;
}

export const getNFTArtwork = async (tokenId: string) => {
  const metadata = await getNFTMetadata(tokenId);
  return nftToArtwork(metadata);
}

export const getNFTMetadata = async (tokenId: string) => {
  // Create provider with cache key
  const provider = new ethers.providers.JsonRpcProvider({
    url: "https://sepolia.base.org",
    skipFetchSetup: true, // Disable caching
  });
  
  const contract = ArtNightNFTContract(provider);

  try {
    // Get token URI from contract
    const tokenURI = await contract.tokenURI(tokenId);

    // Fetch metadata from IPFS/Pinata
    const response = await fetch(tokenURI);
    const metadata = await response.json();
    metadata.tokenId = tokenId;
    // console.log(metadata);

    return metadata;
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    throw error;
  }
};

interface NFTMetadata {
  tokenId: string;
  title: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

export const nftToArtwork = async (nft: NFTMetadata): Promise<Artwork> => {
  return {
    id: parseInt(nft.tokenId),
    title: nft.title,
    description: nft.description,
    image: nft.image,
    artist: nft.attributes.find(attr => attr.trait_type === 'Artist')?.value || '',
    year: nft.attributes.find(attr => attr.trait_type === 'Year')?.value || '',
    medium: nft.attributes.find(attr => attr.trait_type === 'Medium')?.value || '',
    dimensions: nft.attributes.find(attr => attr.trait_type === 'Dimensions')?.value || '',
    exhibition: nft.attributes.find(attr => attr.trait_type === 'Exhibition')?.value || '',
    location: nft.attributes.find(attr => attr.trait_type === 'Location')?.value || '',
  };
};
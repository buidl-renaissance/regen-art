import { Artwork } from "../../types";

const PINATA_JWT = process.env.PINATA_JWT;

export const uploadImage = async (image: File) => {
  // Create FormData and append image file
  const formData = new FormData();
  formData.append('file', image);

  // Upload to IPFS via Pinata
  const response = await fetch(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    }
  );

  const result = await response.json();
  const imageCID = result.IpfsHash;
  console.log('Image uploaded to IPFS with CID:', imageCID, result);
  return imageCID;
};

export const uploadMetadata = async (artwork: Partial<Artwork>, imageCID: string) => {
  // Create metadata object
  const metadata = {
    name: artwork.title,
    description: artwork.description,
    image: `https://brown-selective-rodent-822.mypinata.cloud/ipfs/${imageCID}`, // Replace with actual image CID
    attributes: [
      {
        trait_type: 'Artist',
        value: artwork.artist,
      },
      {
        trait_type: 'Year',
        value: artwork.year,
      },
      {
        trait_type: 'Medium',
        value: artwork.medium,
      },
      {
        trait_type: 'Dimensions',
        value: artwork.dimensions,
      },
      {
        trait_type: 'Exhibition',
        value: artwork.exhibition,
      },
      {
        trait_type: 'Location',
        value: artwork.location,
      },
    ],
  };

  // Convert metadata to JSON string
  const metadataJSON = JSON.stringify(metadata);

  // Create FormData and append file
  const formData = new FormData();
  formData.append(
    'file',
    new Blob([metadataJSON], { type: 'application/json' })
  );

  // Upload to IPFS via Pinata
  const response = await fetch(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    }
  );

  const result = await response.json();
  const tokenCID = result.IpfsHash;
  console.log('Metadata uploaded to IPFS with CID:', tokenCID, result);
  return tokenCID;
};

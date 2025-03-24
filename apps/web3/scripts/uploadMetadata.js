export const uploadImage = async (image) => {
  // Create FormData and append image file
  const formData = new FormData();
  formData.append('file', image);

  // Upload to IPFS via Pinata
  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: formData,
  });

  const result = await response.json();
  const imageCID = result.IpfsHash;
  console.log('Image uploaded to IPFS with CID:', imageCID);
  return imageCID;
};

export const uploadMetadata = async (imageCID) => {
  // Create metadata object
  const metadata = {
    name: 'Collective Art',
    description: 'A unique NFT from Collective Art',
    image: `ipfs://${imageCID}`, // Replace with actual image CID
    attributes: [
      {
        trait_type: 'Collective',
        value: 'Collective Art',
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
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: formData,
    }
  );

  const result = await response.json();
  const tokenCID = result.IpfsHash;
  console.log('Metadata uploaded to IPFS with CID:', tokenCID);
  return tokenCID;
};

const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwNGRjMjAyMC03YmU3LTQxNTItOGU5Ny1mZGY4YzNhZDkyZDEiLCJlbWFpbCI6ImpvaG5AZGV0cm9pdGFydGRhby5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZTU1MjNlYzZmNDg4NGFhNjkwMzMiLCJzY29wZWRLZXlTZWNyZXQiOiI0MWViZGYzZDFkY2Q2MjY3NWUzMTJmNDY1MDEyNDVjZmRhMTdhMWU0NzAwMmUwZjE0YmNhNzBmOTdjZjEzNzNmIiwiZXhwIjoxNzcwNzI0NTIzfQ.WFhP_v3EPdZ037hm93VPWbINCjELChAAvpy1GUx8PTY';

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

export const uploadMetadata = async (imageCID: string) => {
  // Create metadata object
  const metadata = {
    name: 'Art Night NFT',
    description: 'A unique NFT from Art Night',
    image: `https://brown-selective-rodent-822.mypinata.cloud/ipfs/${imageCID}`, // Replace with actual image CID
    attributes: [
      {
        trait_type: 'Artist',
        value: 'Art Night Creator',
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

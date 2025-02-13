import { useState, useEffect } from 'react';
import { uploadImage, uploadMetadata, mintArtNightNFT, getTokenURI } from '@gods.work/web3';

export default function CreateArtwork() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uri, setUri] = useState('');
  
  useEffect(() => {
    const fetchUri = async () => {
      const uri = await getTokenURI('1');
      setUri(uri);
    };
    fetchUri();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);
      setError('');

      // Upload image to IPFS
      const imageCID = await uploadImage(file);
      
      // Upload metadata to IPFS
      const tokenCID = await uploadMetadata(imageCID);

      // Connect to Ethereum
      if (!window.ethereum) throw new Error('Please install MetaMask');
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = provider.getSigner();

      const { receipt, txHash, tokenId } = await mintArtNightNFT(`https://brown-selective-rodent-822.mypinata.cloud/ipfs/${tokenCID}`);
      console.log('Transaction receipt:', receipt, txHash, tokenId);
      // Get contract instance
    //   const contract = ArtNightNFTContract(signer);

      // Mint NFT
    //   const address = await signer.getAddress();
    //   console.log('Minting NFT to address:', address);
    //   const tx = await contract.mintNFT(address);
    //   const receipt = await tx.wait();
    //   console.log('Transaction receipt:', receipt);

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to create artwork');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Artwork</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Upload Artwork</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={!file || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Artwork'}
        </button>

        {error && (
          <div className="text-red-500 mt-4">{error}</div>
        )}

        {success && (
          <div className="text-green-500 mt-4">
            Artwork created successfully!
          </div>
        )}
      </form>

      {uri}
    </div>
  );
}

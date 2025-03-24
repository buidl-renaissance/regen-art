"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { mintCollectiveArt } from "../../../libs/web3/CollectiveArt/utils";
import { uploadMetadata, uploadImage } from "../../../libs/web3/ipfs";
import { getWalletSigner } from "../../../libs/web3/connectWallet";
import { Artwork } from "../../../types";
// import { getArtwork } from "@/mock";

export default function CreateArtwork() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [walletConnected, setWalletConnected] = useState(true);
  const [artwork, ] = useState<Artwork | undefined>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // const [artwork, ] = useState<Artwork | undefined>(getArtwork(4));

  const [formData, setFormData] = useState({
    title: artwork?.title,
    artist: artwork?.artist,
    year: artwork?.year,
    description: artwork?.description,
    medium: artwork?.medium,
    dimensions: artwork?.dimensions,
    exhibition: artwork?.exhibition,
    location: artwork?.location,
  });

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!formData.get('title')) {
        setFormData(prev => ({
          ...prev,
          title: data.title
        }));
      }

      if (!formData.get('description')) {
        setFormData(prev => ({
          ...prev,
          description: data.description
        }));
      }

    } catch (err) {
      console.error('Error analyzing image:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      setFile(file);
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      await analyzeImage(file);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("Please install MetaMask to continue");
      return;
    }

    try {
      // Prompt user to connect wallet
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const signer = await getWalletSigner();
      if (signer) {
        setWalletConnected(true);
        setError("");
      }
    } catch (err: unknown) {
      console.error(err);
      if (typeof err === 'object' && err !== null && 'code' in err && err.code === 4001) {
        setError("Please connect your wallet to continue");
      } else {
        setError("Failed to connect wallet");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (!walletConnected) {
      try {
        await connectWallet();
      } catch (err) {
        console.error(err);
        return;
      }
    }

    try {
      setLoading(true);
      setError("");

      // Upload image to IPFS
      const imageCID = await uploadImage(file);
      // Upload metadata to IPFS
      const tokenCID = await uploadMetadata(
        {
          title: formData.title,
          artist: formData.artist,
          year: formData.year,
          medium: formData.medium,
          dimensions: formData.dimensions,
          exhibition: formData.exhibition,
          location: formData.location,
          image: imageCID,
          description: formData.description,
        },
        imageCID
      );

      // Connect to Ethereum
      if (!window.ethereum) throw new Error("Please install MetaMask");

      const { receipt, txHash, tokenId } = await mintCollectiveArt(
        `https://brown-selective-rodent-822.mypinata.cloud/ipfs/${tokenCID}`,
        "0xa6F865191BE3A1d09b816B336509d376a593aB93"
      );
      console.log("Transaction receipt:", receipt, txHash, tokenId);
      window.location.href = `/artwork/${tokenId}`;
    } catch (err: unknown) {
      console.error(err);
      if (typeof err === 'object' && err !== null && 'message' in err) {
        setError((err.message as string));
      } else {
        setError("Failed to create artwork");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/gallery"
          className="inline-flex items-center mb-8 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Gallery
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-neutral-900 dark:text-neutral-50">
          Create New Artwork
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* {!walletConnected && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-blue-600 dark:text-blue-400">
              Please connect your wallet to create artwork
            </p>
            <button
              onClick={connectWallet}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Connect Wallet
            </button>
          </div>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Artwork Image
                </label>
                <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-700">
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="text-white">Analyzing image...</div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <span className="text-neutral-500 dark:text-neutral-400">
                        Click to upload image
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Artist
                </label>
                <input
                  type="text"
                  value={formData.artist}
                  onChange={(e) =>
                    setFormData({ ...formData, artist: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Year
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Medium
                </label>
                <input
                  type="text"
                  value={formData.medium}
                  onChange={(e) =>
                    setFormData({ ...formData, medium: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Dimensions
                </label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) =>
                    setFormData({ ...formData, dimensions: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Exhibition
              </label>
              <input
                type="text"
                value={formData.exhibition}
                onChange={(e) =>
                  setFormData({ ...formData, exhibition: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !walletConnected}
              className="px-6 py-3 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 rounded-full hover:opacity-90 transition flex items-center disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-50 dark:text-neutral-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Artwork"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { getAllNFTArtwork } from "@/libs/web3/api";
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from "react";
import { Artwork } from "@/types";

export default function GalleryMini() {
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    async function loadArtworks() {
      const allArtworks = await getAllNFTArtwork();
      // Select featured/curated artworks for mini display
      setSelectedArtworks(allArtworks);
    }
    loadArtworks();
  }, []);

  return (
    <SessionProvider>
      <div className="bg-neutral-50 dark:bg-neutral-900 p-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-50">
            Featured Works
          </h1>
          
          <div className="grid grid-cols-2 gap-4">
            {selectedArtworks.map((artwork) => (
              <div key={artwork.id} className="space-y-2">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  {artwork.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {artwork.artist}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}

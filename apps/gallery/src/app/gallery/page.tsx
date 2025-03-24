import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAllNFTArtwork } from "../../libs/web3/api";

export const metadata: Metadata = {
  title: "Gallery | Regenerative Art Collective",
  description: "Browse our collection of collaborative artworks from the Regenerative Art Collective community.",
  openGraph: {
    title: "Gallery | Regenerative Art Collective",
    description: "Browse our collection of collaborative artworks from the Regenerative Art Collective community.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Regenerative Art Collective Gallery",
      },
    ],
  },
};

export default async function Gallery() {
  const artworks = await getAllNFTArtwork();
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-neutral-900 dark:text-neutral-50">
          Collaborative Works
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <Link 
              key={artwork.id}
              href={`/artwork/${artwork.id}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                  {artwork.title}
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  {artwork.artist}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400">
                  {artwork.year}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

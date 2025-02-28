"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getArtwork } from "@/mock";
import { Artwork } from "@/types";

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ArtworkDetails({ params }: PageProps) {
  const [showModal, setShowModal] = useState(false);
  const [artwork, setArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      const data = getArtwork(Number(params.id));
      if (data) {
        setArtwork(data);
      }
    };
    fetchArtwork();
  }, [params.id]);

  if (!artwork) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center mb-8 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Artwork Image */}
          <div 
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <Image
              src={artwork.image}
              alt={artwork.title}
              className="object-cover"
              fill
              priority
              quality={90}
              unoptimized={true}
            />
          </div>

          {/* Artwork Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
              {artwork.title}
            </h1>
            
            <div className="space-y-2">
              <p className="text-xl text-neutral-700 dark:text-neutral-300">
                {artwork.artist}
              </p>
              <p className="text-neutral-500 dark:text-neutral-400">
                {artwork.year}
              </p>
            </div>

            <div className="prose dark:prose-invert">
              <p className="text-neutral-700 dark:text-neutral-300">
                {artwork.description}
              </p>
            </div>

            <div className="space-y-4 border-t border-neutral-200 dark:border-neutral-700 pt-6">
              <div>
                <h2 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Medium
                </h2>
                <p className="mt-1 text-neutral-900 dark:text-neutral-50">
                  {artwork.medium}
                </p>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Dimensions
                </h2>
                <p className="mt-1 text-neutral-900 dark:text-neutral-50">
                  {artwork.dimensions}
                </p>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Exhibition
                </h2>
                <p className="mt-1 text-neutral-900 dark:text-neutral-50">
                  {artwork.exhibition}
                </p>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Location
                </h2>
                <p className="mt-1 text-neutral-900 dark:text-neutral-50">
                  {artwork.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Image Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-[80vw] h-[80vh]">
              <Image
                src={artwork.image}
                alt={artwork.title}
                className="object-contain"
                fill
                sizes="80vw"
                quality={100}
                priority
              />
            </div>
            <button
              className="absolute top-4 right-4 text-white text-xl hover:opacity-75"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

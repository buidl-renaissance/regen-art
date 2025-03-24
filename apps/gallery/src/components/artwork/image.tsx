"use client";

import Image from "next/image";
import { useState } from "react";
import { Artwork } from "../../types";

interface ModalProps {
  artwork: Artwork;
}

export default function ArtworkImage({ artwork }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (!isOpen) {
    return (
      <div 
        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
        onClick={handleOpen}
      >
        <Image
          src={artwork.image}
          alt={artwork.title}
          className="object-cover"
          fill
          priority
          quality={90}
        />
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
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
          onClick={handleClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
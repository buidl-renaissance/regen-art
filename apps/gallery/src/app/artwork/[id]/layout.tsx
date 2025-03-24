import { Metadata } from "next";
import { getNFTArtwork } from "../../../libs/web3/api";

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
  const artwork = await getNFTArtwork((await params).id);
  
  if (!artwork) {
    return {
      title: "Artwork Not Found",
      description: "The requested artwork could not be found."
    };
  }

  return {
    title: `${artwork.title} | Regenerative Art Collective`,
    description: artwork.description,
    openGraph: {
      title: artwork.title,
      description: artwork.description,
      images: [
        {
          url: artwork.image,
          width: 1200,
          height: 1200,
          alt: artwork.title,
        },
      ],
    },
  };
};

export default function ArtworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

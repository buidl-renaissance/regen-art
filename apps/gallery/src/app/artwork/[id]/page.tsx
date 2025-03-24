import Link from "next/link";
import { Artwork } from "../../../types";
import ArtworkImage from "../../../components/artwork/image";
import { notFound } from "next/navigation";
import { getNFTArtwork } from "../../../libs/web3/api";
// import Conversation from "./conversation";
import Content from "./content";

type PageProps = {
  params: Promise<{ id: string }>;
}

export default async function ArtworkDetails({ params }: PageProps) {
  const artwork: Artwork | undefined = await getNFTArtwork((await params).id);

  if (!artwork) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
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
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Artwork Image */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <ArtworkImage artwork={artwork} />
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

            {/* Content Feed */}
            <div className="mt-8">
              <Content artwork={artwork} />
            </div>

            {/* Conversation Component */}
            {/* <div className="mt-8">
              <Conversation artwork={artwork} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

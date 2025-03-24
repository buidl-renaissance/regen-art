"use client";

import Image from "next/image";
import Link from "next/link";
import { getArtist } from "../../mock";

// eslint-disable-next-line @next/next/no-async-client-component
export default function Profile() {
  const artist = getArtist(1);
  if (!artist) {
    return <div>Artist not found</div>;
  }
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Profile Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
              {artist.name}
            </h1>

            <div className="prose dark:prose-invert">
              <p className="text-neutral-700 dark:text-neutral-300">
                {artist.description}
              </p>
            </div>

            <div className="space-y-4 border-t border-neutral-200 dark:border-neutral-700 pt-6">
              <div>
                <h2 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Specialties
                </h2>
                <p className="mt-1 text-neutral-900 dark:text-neutral-50">
                  {artist.specialties.join(", ")}
                </p>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Education
                </h2>
                <p className="mt-1 text-neutral-900 dark:text-neutral-50">
                  {artist.education}
                </p>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Notable Works
                </h2>
                <ul className="mt-1 space-y-1 text-neutral-900 dark:text-neutral-50">
                  {artist.notableWorks.map((work, index) => (
                    <li key={index}>{work}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Contact
                </h2>
                <p className="mt-1 text-neutral-900 dark:text-neutral-50">
                  {artist.contact}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/gallery"
                className="inline-block px-6 py-3 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 rounded-full hover:opacity-90 transition"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { getAllNFTArtwork } from "@/libs/web3/api";
import { SessionProvider } from "next-auth/react"
import { useEffect, useState, useCallback } from "react";
import { Artwork } from "@/types";
import sdk, { SignIn as SignInCore, type Context } from "@farcaster/frame-sdk";
import { signIn, getCsrfToken } from "next-auth/react";

export default function GalleryMini() {
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const handleSignIn = useCallback(async () => {
    try {
      setIsSigningIn(true);
      const nonce = await getCsrfToken();
      if (!nonce) throw new Error("Unable to generate nonce");

      const result = await sdk.actions.signIn({ nonce });

      await signIn("credentials", {
        message: result.message,
        signature: result.signature,
        redirect: false,
      });
    } catch (e) {
      if (e instanceof SignInCore.RejectedByUser) {
        console.error("Sign in rejected by user");
      } else {
        console.error("Sign in error:", e);
      }
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const toggleContext = useCallback(() => {
    setIsContextOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    async function loadArtworks() {
      const allArtworks = await getAllNFTArtwork();
      setSelectedArtworks(allArtworks);
    }
    loadArtworks();

    const loadContext = async () => {
      const frameContext = await sdk.context;
      setContext(frameContext);
      setAdded(frameContext.client.added);
    };
    loadContext();
    handleSignIn(); // Attempt to sign in when component mounts
  }, [handleSignIn]);

  return (
    <SessionProvider>
      <div className="bg-neutral-50 dark:bg-neutral-900 p-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-50">
            Featured Works
          </h1>

          <div className="mb-4">
            <h2 className="font-2xl font-bold">Context</h2>
            <button
              onClick={toggleContext}
              className="flex items-center gap-2 transition-colors"
            >
              <span
                className={`transform transition-transform ${
                  isContextOpen ? "rotate-90" : ""
                }`}
              >
                ➤
              </span>
              Tap to expand
            </button>

            {isContextOpen && (
              <div className="p-4 mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <pre className="font-mono text-xs whitespace-pre-wrap break-words max-w-[260px] overflow-x-">
                  {JSON.stringify(context, null, 2)}
                </pre>
              </div>
            )}
          </div>
          
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

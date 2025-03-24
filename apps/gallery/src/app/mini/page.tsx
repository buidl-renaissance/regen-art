"use client";

import Image from "next/image";
import { getAllNFTArtwork } from "../../libs/web3/api";
import { useEffect, useState, useCallback } from "react";
import { Artwork } from "../../types";
import { sdk, SignIn as SignInCore, type Context } from "@farcaster/frame-sdk";
import { signIn, getCsrfToken } from "next-auth/react";
import { createStore } from "mipd";

export default function GalleryMini() {
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [, setIsSigningIn] = useState(false);
  const [, setContext] = useState<Context.FrameContext>();
  const [, setAdded] = useState(false);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

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

  useEffect(() => {
    async function loadArtworks() {
      const allArtworks = await getAllNFTArtwork();
      setSelectedArtworks(allArtworks);
      if (allArtworks.length > 0) {
        setSelectedArtwork(allArtworks[0]);
      }
      console.log("allArtworks", allArtworks);
    }
    loadArtworks();

    const loadContext = async () => {
      const frameContext = await sdk.context;
      setContext(frameContext);
      setAdded(frameContext.client.added);
      console.log("frameContext", frameContext);
    };
    loadContext();
    // handleSignIn(); // Attempt to sign in when component mounts
  }, [handleSignIn]);

  console.log("selectedArtworks", selectedArtworks);

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);
      setAdded(context.client.added);

      sdk.on("frameAdded", ({ notificationDetails }) => {
        setAdded(true);
        if (notificationDetails) {
          console.log("notificationDetails", notificationDetails);
        }
      });

      sdk.on("frameRemoved", () => {
        setAdded(false);
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("primaryButtonClicked");
      });

      console.log("Calling ready");
      sdk.actions.ready({});

      const store = createStore();

      store.subscribe((providerDetails) => {
        console.log("PROVIDER DETAILS", providerDetails);
      });
    };
    if (sdk && !isSDKLoaded) {
      console.log("Calling load");
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the chat functionality
    console.log("Chat message:", chatMessage);
    setChatMessage("");
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen flex flex-col">
      <div className="flex-1 p-4 pb-24">
        <div className="max-w-full mx-auto">
          <h1 className="text-2xl font-bold text-center mb-6 text-neutral-900 dark:text-neutral-50">
            A Regenerative Art Collective
          </h1>

          {selectedArtwork && (
            <div className="mb-8">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <Image
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-50">
                  {selectedArtwork.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Artist: {selectedArtwork.artist}
                </p>
                {selectedArtwork.year && (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Year: {selectedArtwork.year}
                  </p>
                )}
                {selectedArtwork.medium && (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Medium: {selectedArtwork.medium}
                  </p>
                )}
                {selectedArtwork.dimensions && (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Dimensions: {selectedArtwork.dimensions}
                  </p>
                )}
                {selectedArtwork.description && (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {selectedArtwork.description}
                  </p>
                )}
                <form onSubmit={handleChatSubmit} className="mt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask about this artwork..."
                      className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-neutral-100 dark:bg-neutral-800 p-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="overflow-x-auto">
          <div className="flex gap-4" style={{ minWidth: "min-content" }}>
            {selectedArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className={`flex-none w-20 h-20 cursor-pointer transition-opacity ${
                  selectedArtwork?.id === artwork.id
                    ? "ring-2 ring-blue-500"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

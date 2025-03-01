"use client";

import Image from "next/image";
import { getAllNFTArtwork } from "@/libs/web3/api";
import { useEffect, useState, useCallback } from "react";
import { Artwork } from "@/types";
import { sdk, SignIn as SignInCore, type Context } from "@farcaster/frame-sdk";
import { signIn, getCsrfToken } from "next-auth/react";
import { createStore } from "mipd";

export default function GalleryMini() {
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [, setIsSigningIn] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();
  const [, setAdded] = useState(false);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

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
        // setLastEvent(
        //   `frameAdded${!!notificationDetails ? ", notifications enabled" : ""}`
        // );

        setAdded(true);
        if (notificationDetails) {
          //   setNotificationDetails(notificationDetails);
        }
      });

      sdk.on("frameAddRejected", ({ reason }) => {
        // setLastEvent(`frameAddRejected, reason ${reason}`);
      });

      sdk.on("frameRemoved", () => {
        // setLastEvent("frameRemoved");
        setAdded(false);
        // setNotificationDetails(null);
      });

      sdk.on("notificationsEnabled", ({ notificationDetails }) => {
        // setLastEvent("notificationsEnabled");
        // setNotificationDetails(notificationDetails);
      });
      sdk.on("notificationsDisabled", () => {
        // setLastEvent("notificationsDisabled");
        // setNotificationDetails(null);
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("primaryButtonClicked");
      });

      console.log("Calling ready");
      sdk.actions.ready({});

      // Set up a MIPD Store, and request Providers.
      const store = createStore();

      // Subscribe to the MIPD Store.
      store.subscribe((providerDetails) => {
        console.log("PROVIDER DETAILS", providerDetails);
        // => [EIP6963ProviderDetail, EIP6963ProviderDetail, ...]
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

  return (
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
  );
}

import './global.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo, NextSeo } from "next-seo";
import { Analytics } from "@vercel/analytics/react";

// Default metadata for the application
const defaultMetadata = {
  title: 'Arts For The Earth | A Burg Ink Production',
  description: 'Join us for Arts For The Earth, a celebration of creativity and environmental awareness through art, music, and community engagement.',
  openGraph: {
    title: 'Arts For The Earth | A Burg Ink Production',
    description: 'A celebration of creativity and environmental awareness through art, music, and community engagement.',
    images: [
      {
        url: '/images/arts-for-earth-banner.png',
        width: 1200,
        height: 630,
        alt: 'Arts For The Earth',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const pageMetadata = pageProps.metadata || defaultMetadata;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo {...pageMetadata} />
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_US",
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

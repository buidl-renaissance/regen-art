import '../app/global.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Metadata } from 'next';

// Default metadata for the application
export const metadata: Metadata = {
  title: 'GODS.WORK',
  description: 'A platform for creative communities and events',
  openGraph: {
    title: 'GODS.WORK',
    description: 'A platform for creative communities and events',
    images: ['/images/default-og-image.jpg'],
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const pageMetadata = pageProps.metadata || metadata;
  
  return (
    <>
      <Head>
        <title>{pageMetadata.title as string}</title>
        <meta name="description" content={pageMetadata.description as string} />
        <meta property="og:title" content={(pageMetadata.openGraph?.title as string) || (pageMetadata.title as string)} />
        <meta property="og:description" content={(pageMetadata.openGraph?.description as string) || (pageMetadata.description as string)} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
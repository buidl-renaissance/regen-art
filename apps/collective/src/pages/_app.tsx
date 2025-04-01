import '../app/global.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Metadata } from 'next';

// Default metadata for the application
export const metadata: Metadata = {
  title: 'Art Night Detroit',
  description: 'A platform for Detroit artists and creative communities',
  openGraph: {
    title: 'Art Night Detroit',
    description: 'A platform for Detroit artists and creative communities',
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
        {pageMetadata.openGraph?.images && Array.isArray(pageMetadata.openGraph.images) && 
          pageMetadata.openGraph.images.map((image: any, index: number) => (
            <meta key={index} property="og:image" content={typeof image === 'string' ? image : image.url} />
          ))
        }
        <meta property="og:url" content={pageMetadata.canonical as string} />
        <meta property="og:type" content={pageMetadata.openGraph?.type as string} />
        <meta property="og:site_name" content={pageMetadata.openGraph?.site_name as string} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Analytics } from "@vercel/analytics/react";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{pageProps.meta?.title ? `${pageProps.meta?.title}` : 'Gods Work'}</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
      <Analytics />
    </>
  );
}

export default CustomApp;

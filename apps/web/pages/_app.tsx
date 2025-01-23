import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { ThirdwebProvider } from '@thirdweb-dev/react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThirdwebProvider activeChain="ethereum">
        <Head>
          <title>
            {pageProps.meta?.title ? `${pageProps.meta?.title}` : 'Gods Work'}
          </title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ThirdwebProvider>
    </>
  );
}

export default CustomApp;

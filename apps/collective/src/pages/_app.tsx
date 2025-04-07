import '../app/global.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo, NextSeo } from "next-seo";
import { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const pageMetadata = pageProps.metadata || metadata;
  // Fix: Ensure theme is properly created and not just a string
  const theme = pageProps.theme && typeof pageProps.theme === 'object' ? pageProps.theme : darkTheme;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextSeo {...pageMetadata} />
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "en_IE",
          }}
        />
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </>
  );
}

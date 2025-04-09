import { AppProps } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import './styles.css';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #121212;
    color: #f5f5f5;
    font-family: monospace;
  }
`;

const darkTheme = {
  colors: {
    background: '#121212',
    primary: '#3498db',
    secondary: '#2c2c2c',
    text: '#f5f5f5',
    textSecondary: '#c0c0c0',
    accent: '#3498db'
  }
};

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to buidl!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;

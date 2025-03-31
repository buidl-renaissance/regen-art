import './global.css';
import { StyledComponentsRegistry } from './registry';
import { Providers } from './providers';
import { cookieToInitialState } from '@account-kit/core';
import { config } from './config';
import { headers } from 'next/headers';

export const metadata = {
  metadataBase: new URL('https://collective.gods.work'),
  title: 'Gods.Work Collective',
  description: 'Join the collective of creators, artists, and builders shaping the future.',
  keywords: ['collective', 'creators', 'web3', 'community'],
  authors: [{ name: 'Gods.Work Team' }],
  openGraph: {
    title: 'Gods.Work Collective',
    description: 'Join the collective of creators, artists, and builders shaping the future.',
    images: ['/images/og-image.jpg'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will allow us to persist state across page boundaries (read more here: https://accountkit.alchemy.com/react/ssr#persisting-the-account-state)
  const initialState = cookieToInitialState(
    config,
    (await headers()).get('cookie') ?? undefined
  );
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        {/* <Providers initialState={initialState}>
        </Providers> */}
      </body>
    </html>
  );
}

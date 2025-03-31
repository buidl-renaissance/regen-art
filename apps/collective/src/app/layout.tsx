import './global.css';
import { StyledComponentsRegistry } from './registry';

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
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

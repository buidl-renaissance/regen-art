import './global.css';
import { StyledComponentsRegistry } from './components/registry';
import { Teko } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const teko = Teko({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Andrea Burg | Artist Gallery',
  description:
    'Contemporary artist exploring the intersection of traditional techniques and modern themes. View artwork, tattoos, and more.',
  keywords: 'Andrea Burg, artist, gallery, artwork, tattoos, contemporary art',
  openGraph: {
    title: 'Andrea Burg | Artist Gallery',
    description:
      'Contemporary artist exploring the intersection of traditional techniques and modern themes',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={teko.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
      <Analytics />
    </html>
  );
}

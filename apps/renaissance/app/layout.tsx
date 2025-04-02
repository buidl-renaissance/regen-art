import './global.css';
import { StyledComponentsRegistry } from './registry';
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: 'The Digital Renaissance | A Rebellion on Canvas',
  description: 'Experience the collision of past, present, and future in Detroit\'s creative underground. Art that challenges power, identity, and perception.',
  openGraph: {
    images: [
      {
        url: 'https://nyc3.digitaloceanspaces.com/dpop/images/1742193059847-592079574.jpg',
        width: 1200,
        height: 630,
        alt: 'The Digital Renaissance artwork',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://nyc3.digitaloceanspaces.com/dpop/images/1742193059847-592079574.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <Analytics />
      </body>
    </html>
  );
}

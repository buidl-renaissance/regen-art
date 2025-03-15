import './global.css';
import { StyledComponentsRegistry } from './registry';

export const metadata = {
  title: 'WiredInSamurai - Technology Builder for Communities',
  description: 'Portfolio of WiredInSamurai, a technology builder focused on creating innovative solutions for communities. View featured projects and work experience.',
  openGraph: {
    title: 'WiredInSamurai - Technology Builder for Communities',
    description: 'Portfolio of WiredInSamurai, a technology builder focused on creating innovative solutions for communities. View featured projects and work experience.',
    images: [
      {
        url: '/WiredInSamurai.jpeg',
        width: 1200,
        height: 630,
        alt: 'WiredInSamurai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WiredInSamurai - Technology Builder for Communities',
    description: 'Portfolio of WiredInSamurai, a technology builder focused on creating innovative solutions for communities. View featured projects and work experience.',
    images: ['/WiredInSamurai.jpeg'],
  }
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
      </body>
    </html>
  );
}

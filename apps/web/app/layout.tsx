import './global.css';
import { StyledComponentsRegistry } from './registry';

export const metadata = {
  title: 'GODS WORK',
  description: 'Our mission is to empower artistic communities by creating opportunities for collaboration, growth, and financial sustainability.',
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

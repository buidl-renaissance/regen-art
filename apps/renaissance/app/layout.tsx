import './global.css';
import { StyledComponentsRegistry } from './registry';

export const metadata = {
  title: 'The Digital Renaissance | A Rebellion on Canvas',
  description: 'Experience the collision of past, present, and future in Detroit\'s creative underground. Art that challenges power, identity, and perception.',
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

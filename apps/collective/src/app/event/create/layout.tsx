import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Event | Collective',
  description: 'Create a new event for your community',
  openGraph: {
    title: 'Create Event | Collective',
    description: 'Create a new event for your community',
    type: 'website',
  },
};

export default function CreateEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

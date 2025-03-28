import type { Metadata } from 'next';
import { getEvents } from '@gods.work/utils';
import EventsPage from './page';

export const metadata: Metadata = {
  title: 'Events | Collective',
  description: 'Discover and join creative experiences happening in your community',
  openGraph: {
    title: 'Events | Collective',
    description: 'Discover and join creative experiences happening in your community',
    type: 'website',
  },
};

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Load events server-side
  const events = await getEvents();
  
  return <EventsPage events={events} />;
}

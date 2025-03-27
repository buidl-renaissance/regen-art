import { Metadata, ResolvingMetadata } from 'next';
import { getEvent, DPoPEvent } from '@gods.work/utils';
import EventPage from './page';

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch event data
  const event: DPoPEvent = await getEvent(params.slug);

  return {
    title: `${event.title} | GODS.WORK`,
    description: event.excerpt || 'Event details',
    openGraph: {
      title: event.title,
      description: event.excerpt || 'Event details',
      images: event.image ? [event.image] : [],
    },
  };
}

export default async function EventLayout({ params }: Props) {
  const event: DPoPEvent = await getEvent(params.slug);
  return (
    <EventPage event={event} />
  );
}

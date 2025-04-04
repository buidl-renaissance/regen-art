import { useRouter } from 'next/router';
import styled from 'styled-components';
import { DPoPEvent, getEventBySlug, getRelatedEvents } from '@gods.work/utils';
import { Metadata } from 'next';
import {
  Container,
  BackLink,
  BackButtonContainer,
} from '../../app/components/Styled';
import EventsGrid from '../../app/components/events-grid';
import { Analytics } from "@vercel/analytics/react";

const EventContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const EventHeader = styled.div`
  margin-bottom: 2rem;
`;

const EventTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const EventDescription = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
`;

const EventDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

const RelatedEventsSection = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

export const metadata: Metadata = {
  title: 'Event Series | Art Night Detroit',
  description: 'Explore our curated event series and creative experiences',
};

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const event = await getEventBySlug(slug);
  
  if (!event) {
    return {
      notFound: true,
    };
  }

  const relatedEvents = await getRelatedEvents(event.id, 6);

  return {
    props: {
      event,
      relatedEvents,
      metadata: {
        ...metadata,
        title: `${event.title} | Art Night Detroit`,
        description: event.description || metadata.description,
        openGraph: {
          title: `${event.title} | Art Night Detroit`,
          description: event.description || metadata.description as string,
          images: event.imageUrl ? [{ url: event.imageUrl }] : [],
          type: 'website',
        },
      },
    },
  };
}

export default function EventPage({ 
  event, 
  relatedEvents 
}: { 
  event: DPoPEvent; 
  relatedEvents: DPoPEvent[] 
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <EventContainer>
        <BackButtonContainer>
          <BackLink href="/events">← Back to Events</BackLink>
        </BackButtonContainer>
        
        <EventHeader>
          <EventTitle>{event.title}</EventTitle>
          <p>{new Date(event.startDate).toLocaleDateString()} - {event.location}</p>
        </EventHeader>
        
        <EventDetails>
          <div>
            <EventDescription dangerouslySetInnerHTML={{ __html: event.description || '' }} />
            {event.url && (
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                Learn more or register →
              </a>
            )}
          </div>
          {event.imageUrl && (
            <div>
              <EventImage src={event.imageUrl} alt={event.title} />
            </div>
          )}
        </EventDetails>
        
        {relatedEvents.length > 0 && (
          <RelatedEventsSection>
            <SectionTitle>Related Events</SectionTitle>
            <EventsGrid events={relatedEvents} eventType={event.type} />
          </RelatedEventsSection>
        )}
      </EventContainer>
      <Analytics />
    </Container>
  );
}

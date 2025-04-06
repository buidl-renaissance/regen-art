import { useState } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { TicketedEvent } from '@gods.work/ticketing';
import { getEvents } from '@gods.work/ticketing';
import { EventCard } from '../../app/components/event-card';

interface EventsPageProps {
  initialEvents: TicketedEvent[];
}

export default function EventsPage({ initialEvents }: EventsPageProps) {
  const [events, ] = useState<TicketedEvent[]>(initialEvents);

  return (
    <Container>
      <PageTitle>Upcoming Events</PageTitle>
      
      {events.length === 0 ? (
        <EmptyState>
          <EmptyMessage>No events currently scheduled.</EmptyMessage>
        </EmptyState>
      ) : (
        <EventGrid>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </EventGrid>
      )}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const events = await getEvents();
    
    return {
      props: {
        initialEvents: events,
      },
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      props: {
        initialEvents: [],
      },
    };
  }
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  font-family: 'Teko', sans-serif;
  letter-spacing: 0.02em;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

const EmptyMessage = styled.p`
  font-size: 1.25rem;
  color: #64748b;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

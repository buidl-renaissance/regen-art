'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import EventCard from '../components/EventCard';
import {
  Container,
  Subtitle,
  Title,
  Header,
  LoadingMessage,
  ErrorMessage,
} from '../components/Styled';
import { DPoPEvent } from '@gods.work/utils';

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 1rem auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export default function EventsPage({
  events: initialEvents,
}: {
  events: DPoPEvent[];
}) {
  const [events, setEvents] = useState(initialEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   useEffect(() => {
  //     const fetchEvents = async () => {
  //       try {
  //         setLoading(true);
  //         const eventsData = await getEvents();
  //         setEvents(eventsData);
  //         setError(null);
  //       } catch (err) {
  //         console.error('Error fetching events:', err);
  //         setError('Failed to load events. Please try again later.');
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchEvents();
  //   }, []);

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>Upcoming Events</Title>
          <Subtitle>
            Discover and join creative experiences happening in your community
          </Subtitle>
        </Header>

        {loading ? (
          <LoadingMessage>Loading events...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <EventsGrid>
            {events.length > 0 ? (
              events.map((event: DPoPEvent) => (
                <Link href={`/event/${event.slug}`} passHref key={event.id}>
                  <EventCard event={event} />
                </Link>
              ))
            ) : (
              <p>No events found. Be the first to create one!</p>
            )}
          </EventsGrid>
        )}
      </ContentWrapper>
    </Container>
  );
}

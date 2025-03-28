'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import EventCard from '../components/EventCard';
import { Container, Subtitle, Title, Header, LoadingMessage, ErrorMessage } from '../components/Styled';
import { getEvents, DPoPEvent } from '@gods.work/utils';

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const CreateEventButton = styled.button`
  background: #FF3366;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
  align-self: flex-start;
  
  &:hover {
    background: #E62E5C;
  }
`;

export default function EventsPage({ events: initialEvents }: { events: DPoPEvent[] }) {
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
      <Header>
        <Title>Upcoming Events</Title>
        <Subtitle>Discover and join creative experiences happening in your community</Subtitle>
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

      <Link href="/event/create" passHref>
        <CreateEventButton>Create New Event</CreateEventButton>
      </Link>
    </Container>
  );
}

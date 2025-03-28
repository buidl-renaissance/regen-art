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
import { getEvents, DPoPEvent } from '@gods.work/utils';

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

const EnhancedHeader = styled(Header)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2.5rem;
  position: relative;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
`;

const HeaderTextContent = styled.div`
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    flex: 1;
    margin-bottom: 0;
    margin-right: 2rem;
  }
`;

const CreateEventButton = styled.button`
  background: #ff3366;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  align-self: flex-start;
  box-shadow: 0 2px 8px rgba(255, 51, 102, 0.3);

  &:hover {
    background: #e62e5c;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 51, 102, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 4px rgba(255, 51, 102, 0.2);
  }

  @media (min-width: 768px) {
    align-self: center;
  }
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

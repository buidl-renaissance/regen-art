'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { DPoPEvent, getEvents } from '@gods.work/utils';
import EventCard from './EventCard';

const EventsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const LoadMoreButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 auto 2rem;
  display: block;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357abD;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

interface EventsGridProps {
  events: DPoPEvent[];
  eventType?: string;
}

const EventsGrid: React.FC<EventsGridProps> = ({ events: initialEvents, eventType = 'ArtNight' }) => {
  const [events, setEvents] = useState<DPoPEvent[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialEvents.length >= 18);

  const loadMoreEvents = async () => {
    setLoading(true);
    try {
      const moreEvents = await getEvents({
        type: eventType,
        offset: events.length,
        limit: 18
      });
      
      if (moreEvents.length > 0) {
        setEvents([...events, ...moreEvents]);
        setHasMore(moreEvents.length >= 18);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EventsGridContainer>
        {events.length > 0 ? (
          events.map((event: DPoPEvent) => (
            <Link href={`/event/${event.slug}`} passHref key={event.id}>
              <EventCard event={event} />
            </Link>
          ))
        ) : (
          <p>No events found. Be the first to create one!</p>
        )}
      </EventsGridContainer>
      
      {hasMore && (
        <LoadMoreButton 
          onClick={loadMoreEvents} 
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More Events'}
        </LoadMoreButton>
      )}
    </>
  );
};

export default EventsGrid;
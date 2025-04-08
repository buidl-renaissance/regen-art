import styled from 'styled-components';
import { DPoPEvent } from '@gods.work/utils';
import { FaCalendar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { formatDate, formatTime } from '@gods.work/utils';
import { useEffect, useState } from 'react';

interface EventCardProps {
  event: DPoPEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <EventCardContainer className="event-card">
      <EventImage style={{ backgroundImage: `url(${event.image})` }} />
      <EventContent>
        <EventTitle dangerouslySetInnerHTML={{ __html: event.title }} />
        <EventInfoGrid>
          <EventInfo>
            <FaCalendar />
            <span style={{ marginRight: '0.5rem' }}>
              {formatDate(event.start_date)}
            </span>
            <FaClock />
            <span>{formatTime(event.start_date, event.end_date)}</span>
          </EventInfo>
          {event.venue && (
            <EventInfo>
              <FaMapMarkerAlt />
              <span dangerouslySetInnerHTML={{ __html: event.venue?.title }} />
            </EventInfo>
          )}
          {/* For some reason there is a hydration error when the excerpt is rendered on the server. */}
          {event.excerpt && isMounted && (
            <EventExcerpt dangerouslySetInnerHTML={{ __html: event.excerpt }} />
          )}
        </EventInfoGrid>
      </EventContent>
    </EventCardContainer>
  );
};

const EventCardContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: row;
  height: 220px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const EventImage = styled.div`
  width: 250px;
  height: 100%;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40%;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.7), transparent);
  }
`;

const EventContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
`;

const EventTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EventInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const EventInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;

  svg {
    margin-right: 0.4rem;
    flex-shrink: 0;
    font-size: 0.9rem;
  }
`;

const EventExcerpt = styled.p`
  font-size: 0.875rem;
  line-height: 1.4;
  opacity: 0.7;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: auto;
`;

export default EventCard;
export { formatDate, EventImage, EventContent, EventTitle, EventInfo };

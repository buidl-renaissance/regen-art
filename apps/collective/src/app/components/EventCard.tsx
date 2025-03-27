import Link from 'next/link';
import styled from 'styled-components';
import { DPoPEvent } from '@gods.work/utils';
import { FaCalendar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

// Format date to be more readable
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  
  // Get month name
  const month = date.toLocaleString('en-US', { month: 'long' });
  
  // Get day with ordinal suffix
  const day = date.getDate();
  const suffix = getDaySuffix(day);
  
  return `${month} ${day}${suffix}`;
};

export const formatTime = (startDateString: string, endDateString: string) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Get time in 12-hour format
  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  const startTime = startDate.toLocaleString('en-US', timeOptions).toLowerCase();
  const endTime = endDate.toLocaleString('en-US', timeOptions).toLowerCase();
  
  return `${startTime} - ${endTime}`;
};

// Helper function to get day suffix (st, nd, rd, th)
const getDaySuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

interface EventCardProps {
  event: DPoPEvent;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <EventCardContainer className="event-card">
      <EventImage style={{ backgroundImage: `url(${event.image})` }} />
      <EventContent>
        <EventTitle>{event.title}</EventTitle>
        <EventInfoGrid>
          <EventInfo>
            <FaCalendar />
            <span style={{ marginRight: '0.5rem' }}>{formatDate(event.start_date)}</span>
            <FaClock />
            <span>{formatTime(event.start_date, event.end_date)}</span>
          </EventInfo>
          {event.venue && (
            <EventInfo>
              <FaMapMarkerAlt />
              {event.venue?.title}
            </EventInfo>
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
  height: 120px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const EventImage = styled.div`
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
`;

const EventContent = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const EventTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.5rem;
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
  gap: 0.25rem;
`;

const EventInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;

  svg {
    margin-right: 0.4rem;
    flex-shrink: 0;
    font-size: 0.8rem;
  }
`;

export default EventCard;
export {
  formatDate,
  EventImage,
  EventContent,
  EventTitle,
  EventInfo,
};

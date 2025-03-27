'use client';

import styled from 'styled-components';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import { DPoPEvent, } from '@gods.work/utils';
import { Container, ButtonContainer, BackButton } from '../../components/Styled';
import Link from 'next/link';
import { formatDate, formatTime } from '../../components/EventCard';
import RSVPButton from './RSVPButton';

interface EventPageProps {
  event: DPoPEvent;
}

export default function EventPage({ event }: EventPageProps) {
  if (!event) {
    return (
      <Container>
        <CenteredContent>
          <ErrorMessage>Event not found</ErrorMessage>
          <Link href="/events" passHref>
            <BackButton>Back to Events</BackButton>
          </Link>
        </CenteredContent>
      </Container>
    );
  }

  return (
    <Container>
      <CenteredContent>
        <EventHeader>
          <Link href="/events" passHref>
            <BackLink>← Back to Events</BackLink>
          </Link>
          <EventTitle>{event.title}</EventTitle>
        </EventHeader>

        <EventImageContainer>
          <EventImage src={event.image || '/event-placeholder.jpg'} alt={event.title} />
        </EventImageContainer>

        <EventDetailsContainer>
          <EventInfoSection>
            <EventInfoItem>
              <FaCalendar />
              <span>{formatDate(event.start_date)}</span>
            </EventInfoItem>
            <EventInfoItem>
              <FaClock />
              <span>{formatTime(event.start_date, event.end_date)}</span>
            </EventInfoItem>
            {event.venue && (
              <EventInfoItem>
                <FaMapMarkerAlt />
                <span>{event.venue.title}</span>
              </EventInfoItem>
            )}
            {/* <EventInfoItem>
              <FaUsers />
              <span>{rsvpCount} attending</span>
            </EventInfoItem> */}
          </EventInfoSection>

          <EventDescription dangerouslySetInnerHTML={{ __html: event.content || event.excerpt || 'No description available.' }} />

          <ButtonContainer>
            <Link href="/events" passHref>
              <BackButton>Back</BackButton>
            </Link>
            <RSVPButton eventSlug={event.slug} />
          </ButtonContainer>
        </EventDetailsContainer>
      </CenteredContent>
    </Container>
  );
}

const CenteredContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const EventHeader = styled.div`
  margin-bottom: 2rem;
  text-align: left;
`;

const BackLink = styled.a`
  color: #FF3366;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 1rem;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const EventTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: left;
`;

const EventImageContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EventDetailsContainer = styled.div`
  width: 100%;
`;

const EventInfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
`;

const EventInfoItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  
  svg {
    margin-right: 0.75rem;
    color: #FF3366;
    font-size: 1.2rem;
  }
`;

const EventDescription = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  white-space: pre-wrap;
`;

const ErrorMessage = styled.div`
  color: #FF3366;
  text-align: center;
  font-size: 1.1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: rgba(255, 51, 102, 0.1);
  border-radius: 4px;
`;

'use client';

import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { DPoPEvent } from '@gods.work/utils';
import {
  Container,
  ButtonContainer,
  BackButton,
} from '../../components/Styled';
import Link from 'next/link';
import { formatDate, formatTime } from '../../components/EventCard';
import RSVPButton from '../../components/RSVPButton';
import { CalendarBox } from '../../components/CalendarBox';
import { ErrorMessage } from '../../components/Styled';
import { BackLink } from '../../profile/styles';
import { useEffect, useState } from 'react';

interface EventPageProps {
  event: DPoPEvent;
}

export default function EventPage({ event }: EventPageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageRatio, setImageRatio] = useState(1.5); // Default aspect ratio (3:2)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleImageLoad = (e) => {
    const img = e.target;
    if (img.naturalWidth && img.naturalHeight) {
      setImageRatio(img.naturalWidth / img.naturalHeight);
    }
    setImageLoaded(true);
  };

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
        </EventHeader>

        <EventContentLayout>
          <EventImageContainer ratio={imageRatio}>
            <EventImage
              src={event.image || '/event-placeholder.jpg'}
              alt={event.title}
              onLoad={handleImageLoad}
            />
          </EventImageContainer>

          <EventDetailsContainer>

            <EventTitle>{event.title}</EventTitle>

            <EventInfoSection>
              <EventInfoCard>
                <CalendarBox date={event.start_date} />
                <EventInfoContent>
                  <EventInfoLabel>
                    {formatDate(event.start_date, true)}
                  </EventInfoLabel>
                  <EventInfoValue>
                    {formatTime(event.start_date, event.end_date)}
                  </EventInfoValue>
                </EventInfoContent>
              </EventInfoCard>

              {event.venue && (
                <EventInfoCard>
                  <EventInfoIcon>
                    <FaMapMarkerAlt />
                  </EventInfoIcon>
                  <EventInfoContent>
                    <EventInfoValue>{event.venue.title}</EventInfoValue>
                    <EventInfoLabel>
                      {event.venue.geo.address}, {event.venue.geo.city}, {event.venue.geo.state} {event.venue.geo.zip}
                    </EventInfoLabel>
                  </EventInfoContent>
                </EventInfoCard>
              )}
              {/* <EventInfoItem>
                <FaUsers />
                <span>{rsvpCount} attending</span>
              </EventInfoItem> */}
            </EventInfoSection>

            <ButtonContainer>
              <RSVPButton eventSlug={event.slug} />
            </ButtonContainer>

            <EventDescription
              dangerouslySetInnerHTML={{
                __html:
                  event.content || event.excerpt || 'No description available.',
              }}
            />

            {!isMobile && (
              <ButtonContainer>
                <Link href="/events" passHref>
                  <BackButton>Back</BackButton>
                </Link>
              </ButtonContainer>
            )}
          </EventDetailsContainer>
        </EventContentLayout>
      </CenteredContent>

      {isMobile && (
        <MobileRSVPContainer>
          <RSVPButton eventSlug={event.slug} />
        </MobileRSVPContainer>
      )}
    </Container>
  );
}

const CenteredContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const EventHeader = styled.div`
  margin-bottom: 2rem;
  text-align: left;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const EventTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
`;

const EventContentLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const EventImageContainer = styled.div<{ ratio: number }>`
  min-width: 200px;
  max-width: 300px;
  height: ${props => props.ratio > 1 ? '300px' : '400px'};
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    height: ${props => props.ratio > 1 ? '180px' : '250px'};
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EventDetailsContainer = styled.div`
  flex: 1;
`;

const EventInfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1fr, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const EventInfoCard = styled.div`
  display: flex;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.25rem;
  border-radius: 8px;
  transition: transform 0.2s ease, background 0.2s ease;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 1rem;

    &:hover {
      transform: translateY(-1px);
    }
  }
`;

const EventInfoIcon = styled.div`
  color: #fff;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  width: 50px;
  height: 56px;
  margin-right: 1rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-right: 0.75rem;
  }
`;

const EventInfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventInfoLabel = styled.span`
  font-size: 0.9rem;
  color: #aaaaaa;
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const EventInfoValue = styled.span`
  font-size: 1.1rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const EventDescription = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  white-space: pre-wrap;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 4rem;
  }
`;

const MobileRSVPContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(18, 18, 18, 0.95);
  padding: 1rem;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  z-index: 100;

  button {
    width: 100%;
    padding: 0.85rem 1.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(255, 51, 102, 0.3);
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 51, 102, 0.4);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 1px 4px rgba(255, 51, 102, 0.2);
    }
  }
`;

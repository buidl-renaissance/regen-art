import { formatDate } from '@gods.work/utils';
import { TicketedEvent } from '@gods.work/ticketing';
import styled from 'styled-components';

interface EventCardProps {
  event: TicketedEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      <CardContent>
        <Title>{event.title}</Title>
        <InfoSection>
          <InfoItem>
            <InfoLabel>Date:</InfoLabel> {formatDate(event.date)}
          </InfoItem>
          <InfoItem>
            <InfoLabel>Location:</InfoLabel> {event.location}
          </InfoItem>
        </InfoSection>
        <Description>{event.description}</Description>
        <ViewButton href={`/events/${event.id}`}>View Details</ViewButton>
      </CardContent>
    </Card>
  );
}

const Card = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
  }
`;

const CardContent = styled.div`
  padding: 1.75rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1a202c;
  font-family: 'Teko', sans-serif;
  letter-spacing: 0.02em;
`;

const InfoSection = styled.div`
  margin-bottom: 1.25rem;
  color: #4b5563;
  border-left: 3px solid #2563eb;
  padding-left: 0.75rem;
`;

const InfoItem = styled.p`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  margin-right: 0.5rem;
  color: #2d3748;
`;

const Description = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.6;
  font-size: 1rem;
`;

const ViewButton = styled.a`
  display: inline-block;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.25);

  &:hover {
    background-color: #1d4ed8;
    box-shadow: 0 6px 8px rgba(37, 99, 235, 0.35);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
  }
`;

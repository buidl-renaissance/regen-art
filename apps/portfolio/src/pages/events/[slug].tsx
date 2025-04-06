import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { TicketedEvent, TicketType, getEvent, getTicketTypes } from '@gods.work/ticketing';
import { formatDate } from '@gods.work/utils';
import Tickets from '../../app/components/tickets';

interface EventPageProps {
  event: TicketedEvent;
  ticketTypes: TicketType[];
}

export default function EventPage({ event, ticketTypes }: EventPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Event not found</h1>
      </div>
    );
  }

  return (
    <Container>
      <EventHeader>
        <EventTitle>{event.title}</EventTitle>
        <EventInfo>
          <InfoItem>
            <InfoLabel>Date:</InfoLabel> {formatDate(event.date)}
          </InfoItem>
          <InfoItem>
            <InfoLabel>Location:</InfoLabel> {event.location}
          </InfoItem>
        </EventInfo>
      </EventHeader>

      <EventDescription>{event.description}</EventDescription>

      <TicketsSection>
        <SectionTitle>Tickets</SectionTitle>
        
        {ticketTypes.length === 0 ? (
          <NoTickets>No tickets available for this event.</NoTickets>
        ) : (
          <Tickets event={event} ticketTypes={ticketTypes} />
        )}
      </TicketsSection>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.params || {};
    const eventId = Number(slug);
    
    if (isNaN(eventId)) {
      return {
        notFound: true,
      };
    }

    const event = await getEvent(eventId);
    
    if (!event) {
      return {
        notFound: true,
      };
    }

    const ticketTypes = await getTicketTypes(eventId);

    return {
      props: {
        event,
        ticketTypes,
      },
    };
  } catch (error) {
    console.error('Error fetching event:', error);
    return {
      notFound: true,
    };
  }
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const EventHeader = styled.div`
  margin-bottom: 2rem;
`;

const EventTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const EventInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  font-size: 1.1rem;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  margin-right: 0.5rem;
`;

const EventDescription = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  white-space: pre-line;
`;

const TicketsSection = styled.div`
  background-color: #f8fafc;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const NoTickets = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #64748b;
`;

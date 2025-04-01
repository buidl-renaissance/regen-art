import styled from 'styled-components';
import {
  Container,
  Subtitle,
  Title,
  Header,
} from '../../app/components/Styled';
import { DPoPEvent, getEvents } from '@gods.work/utils';
import EventsGrid from '../../app/components/events-grid';
import { Metadata } from 'next';

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 1rem auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

export const metadata: Metadata = {
  title: 'Events | Art Night Detroit',
  description: 'Discover and join creative experiences happening in your community',
  openGraph: {
    title: 'Events | Art Night Detroit',
    description: 'Discover and join creative experiences happening in your community',
    type: 'website',
  },
};

// Using getServerSideProps for server-side rendering in Next.js Pages Router
export async function getServerSideProps() {
  const initialEvents = await getEvents({
    type: 'ArtNight',
    limit: 18,
  });
  
  return {
    props: {
      initialEvents,
      metadata,
    },
  };
}

// Removed async from the component function to fix the Promise error
export default function EventsPage({
  initialEvents,
}: {
  initialEvents: DPoPEvent[];
}) {
  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>Upcoming Events</Title>
          <Subtitle>
            Discover and join creative experiences happening in your community
          </Subtitle>
        </Header>
        {/* Pass the server-loaded events to the client component */}
        <EventsGrid events={initialEvents} eventType="Tech" />
      </ContentWrapper>
    </Container>
  );
}

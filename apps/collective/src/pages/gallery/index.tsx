import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { FaCalendarAlt, FaPalette, FaProjectDiagram } from 'react-icons/fa';
import {
  Container,
  Section,
  SectionTitle,
  ProjectCard,
  ArtworkCard,
  EventCard,
} from '@gods.work/ui';
import { Project } from '@gods.work/projects';
import { Artwork, Event, getArtworks, getEvents } from '@gods.work/utils';

export async function getServerSideProps() {
  // In a real implementation, you would fetch this data from your API
  // This is just mock data for demonstration
  const featuredArtworks = await getArtworks();
  //   const featuredProjects = await getFeaturedProjects();
  const featuredProjects: Project[] = [];
  const upcomingEvents = await getEvents();

  return {
    props: {
      featuredArtworks,
      featuredProjects,
      upcomingEvents,
      theme: 'dark',
      metadata: {
        title: 'Gallery | Art Night Detroit',
        description:
          "Explore curated artwork, projects, and upcoming events from Detroit's creative community.",
      },
    },
  };
}

export default function GalleryPage({
  featuredArtworks,
  featuredProjects,
  upcomingEvents,
}: {
  featuredArtworks: Artwork[];
  featuredProjects: Project[];
  upcomingEvents: Event[];
}) {
  const [activeTab, setActiveTab] = useState('all');

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Container>
      <Head>
        <title>Gallery | Art Night Detroit</title>
        <meta
          name="description"
          content="Explore curated artwork, projects, and upcoming events from Detroit's creative community."
        />
      </Head>

      <Header>
        <Title>Community Gallery</Title>
        <Subtitle>Showcasing Detroit&apos;s Creative Ecosystem</Subtitle>
      </Header>

      <TabContainer>
        <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          All
        </Tab>
        <Tab
          active={activeTab === 'artwork'}
          onClick={() => setActiveTab('artwork')}
        >
          <FaPalette style={{ marginRight: '8px' }} /> Artwork
        </Tab>
        <Tab
          active={activeTab === 'projects'}
          onClick={() => setActiveTab('projects')}
        >
          <FaProjectDiagram style={{ marginRight: '8px' }} /> Projects
        </Tab>
        <Tab
          active={activeTab === 'events'}
          onClick={() => setActiveTab('events')}
        >
          <FaCalendarAlt style={{ marginRight: '8px' }} /> Events
        </Tab>
      </TabContainer>

      {(activeTab === 'all' || activeTab === 'events') && (
        <Section>
          <SectionTitle>
            <FaCalendarAlt style={{ marginRight: '12px' }} />
            Upcoming Events
          </SectionTitle>
          <CardGrid>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </CardGrid>
        </Section>
      )}

      {(activeTab === 'all' || activeTab === 'artwork') && (
        <Section>
          <SectionTitle>
            <FaPalette style={{ marginRight: '12px' }} />
            Featured Artwork
          </SectionTitle>
          <CardGrid>
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </CardGrid>
          <ViewAllLink href="/artwork">View All Artwork →</ViewAllLink>
        </Section>
      )}

      {(activeTab === 'all' || activeTab === 'projects') && (
        <Section>
          <SectionTitle>
            <FaProjectDiagram style={{ marginRight: '12px' }} />
            Community Projects
          </SectionTitle>
          <CardGrid>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </CardGrid>
          <ViewAllLink href="/projects">View All Projects →</ViewAllLink>
        </Section>
      )}
    </Container>
  );
}

// Styled components
const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 2px solid #444;
  padding-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #f5f5f5;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  letter-spacing: -1px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #cccccc;
  font-weight: normal;
  font-family: 'Courier New', monospace;
  letter-spacing: -0.5px;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #333;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? '#333' : 'transparent')};
  color: ${(props) => (props.active ? '#90caf9' : '#f5f5f5')};
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 2px solid
    ${(props) => (props.active ? '#90caf9' : 'transparent')};
  transition: all 0.3s ease;

  &:hover {
    background: #222;
    color: ${(props) => (props.active ? '#90caf9' : '#cccccc')};
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ViewAllLink = styled(Link)`
  display: block;
  text-align: right;
  color: #90caf9;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  text-decoration: none;
  margin-top: 1rem;
  margin-bottom: 3rem;

  &:hover {
    text-decoration: underline;
  }
`;

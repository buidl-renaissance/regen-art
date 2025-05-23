import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaCode, FaRobot, FaBrain, FaIdCard, FaTicketAlt, FaUsers } from 'react-icons/fa';
import { SectionContainer } from '../components/Styles';

export default function RenAIssance() {
  return (
    <Container>
      <Head>
        <title>Join the RenAIssance | BUIDL Detroit</title>
        <meta
          name="description"
          content="Join the cultural layer of Web3 — open-source tools that preserve memory, empower artists, and bridge physical and digital worlds."
        />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Join the RenAIssance</HeroTitle>
          <HeroText>
            We&apos;re building a new cultural movement — creating tools that
            preserve community stories, support local artists, and connect our
            physical neighborhoods with digital possibilities.
          </HeroText>
          <HeroSubtext>
            Whether you&apos;re a creator, community organizer, or just
            passionate about Detroit&apos;s future, there&apos;s a place for you
            in this movement.
          </HeroSubtext>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Our Community Projects</SectionTitle>

        <ProjectsGrid>
          <ProjectCard>
            <ProjectIcon>
              <FaUsers />
            </ProjectIcon>
            <ProjectTitle>Community Profiles</ProjectTitle>
            <ProjectDescription>
              Create your digital identity within Detroit&apos;s creative community. Connect with collaborators, 
              showcase your skills, and build your network.
            </ProjectDescription>
          </ProjectCard>

          <ProjectCard>
            <ProjectIcon>
              <FaIdCard />
            </ProjectIcon>
            <ProjectTitle>Collective Gallery</ProjectTitle>
            <ProjectDescription>
              Showcase your work as part of Detroit&apos;s creative community. Our collaborative portfolio system 
              helps creators gain visibility, connect with opportunities, and build collective power through shared resources.
            </ProjectDescription>
          </ProjectCard>

          <ProjectCard>
            <ProjectIcon>
              <FaTicketAlt />
            </ProjectIcon>
            <ProjectTitle>Event Ticketing</ProjectTitle>
            <ProjectDescription>
              Our transparent ticketing system ensures fair revenue distribution among artists, 
              venues, and organizers while creating a seamless experience for attendees.
            </ProjectDescription>
          </ProjectCard>
        </ProjectsGrid>
      </Section>

      <Section dark>
        <SectionContainer>
          <SectionTitle>Buidl for Prizes/Grants</SectionTitle>

          <EventsGrid>
            <EventLargeCard>
              <EventImageContainer>
                <EventImage
                  src="/images/ren-ai-ssance.png"
                  alt="RenAIssance 2025"
                />
              </EventImageContainer>
              <EventContent>
                <EventTitle>RenAIssance Art Collective</EventTitle>
                <EventDescription>
                  Build the cultural layer and preserve relics — open-source
                  tools that preserve memory, empower artists, and bridge
                  physical and digital worlds.
                </EventDescription>
                <EventLink
                  href="https://explorer.gitcoin.co/#/round/42161/867/54"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore on Gitcoin →
                </EventLink>
              </EventContent>
            </EventLargeCard>

            <EventLargeCard>
              <EventImageContainer>
                <EventImage
                  src="/images/neighborhood.png"
                  alt="Local events in Detroit"
                />
              </EventImageContainer>
              <EventContent>
                <EventTitle>Neighborhood Open Source Software</EventTitle>
                <EventDescription>
                  Connecting with our community through workshops, events, and
                  collaborative projects.
                </EventDescription>
                <EventLink
                  href="https://explorer.gitcoin.co/#/round/8453/148"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore on Gitcoin →
                </EventLink>
              </EventContent>
            </EventLargeCard>
          </EventsGrid>

          <EventLargeCard>
            <EventImageContainer>
              <EventImage
                src="/images/sui-overflow-2025.jpeg"
                alt="Sui Overflow 2025"
              />
            </EventImageContainer>
            <EventContent>
              <EventTitle>Sui Overflow 2025</EventTitle>
              <EventDescription>
                Building the next generation of decentralized applications on
                the Sui blockchain.
              </EventDescription>
              <EventLink
                href="https://sui-overflow-2025.devfolio.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore on Devfolio →
              </EventLink>
            </EventContent>
          </EventLargeCard>

          <EventLargeCard>
            <EventImageContainer>
              <EventImage
                src="/images/hack-the-grid.jpeg"
                alt="LUKSO Hack The Grid"
              />
            </EventImageContainer>
            <EventContent>
              <EventTitle>LUKSO Hack The Grid</EventTitle>
              <EventDescription>
                Creating innovative solutions at the intersection of design and
                blockchain.
              </EventDescription>
              <EventLink
                href="https://lukso.gitcoin.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore on Gitcoin →
              </EventLink>
            </EventContent>
          </EventLargeCard>

          {/* <CTAButton href="/projects">Join a Project</CTAButton> */}
        </SectionContainer>
      </Section>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    sans-serif;
`;

const Hero = styled.section`
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: #fff;
  padding: 6rem 2rem;

  @media (min-width: 768px) {
    padding: 8rem 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const HeroSubtext = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  line-height: 1.6;
  color: #b0b0b0;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Section = styled.section<{ dark?: boolean }>`
  padding: 5rem 2rem;
  background: ${(props) => (props.dark ? '#1a1a1a' : '#fff')};
  color: ${(props) => (props.dark ? '#fff' : '#1a1a1a')};

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectIcon = styled.div`
  font-size: 2.5rem;
  color: #90caf9;
  margin-bottom: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ProjectDescription = styled.p`
  color: #555;
  line-height: 1.5;
`;

const EventsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 2rem;
  border-left: 4px solid #90caf9;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const EventTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #90caf9;
`;

const EventDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const EventLink = styled(Link)`
  color: #90caf9;
  text-decoration: underline;
  margin-top: 0.5rem;
  display: block;
`;

const EventLargeCard = styled(EventCard)`
  grid-column: span 3;
`;

const EventImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
  border-radius: 8px;
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EventContent = styled.div`
  padding: 0rem;
`;

const EventsGrid = styled(EventsContainer)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

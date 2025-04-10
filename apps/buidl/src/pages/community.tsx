import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import {
  FaUsers,
  FaIdCard,
  FaTicketAlt,
  FaCode,
  FaGithub,
  FaDiscord,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function CommunityPage() {
  return (
    <Container>
      <Head>
        <title>Community Tools | Detroit Renaissance</title>
        <meta
          name="description"
          content="Open-source community tools for Detroit's creative ecosystem - connecting creators, showcasing portfolios, and managing events."
        />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Community Tools</HeroTitle>
          <HeroSubtitle>
            Building the infrastructure for Detroit&apos;s creative renaissance
          </HeroSubtitle>
          <HeroDescription>
            We&apos;re developing a suite of integrated tools to empower Detroit&apos;s creative communities, 
            from digital identity and portfolios to event management and ticketing.
          </HeroDescription>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Our Ecosystem</SectionTitle>
        <EcosystemDescription>
          Our community tools work together to create a comprehensive platform for Detroit&apos;s creative ecosystem. 
          Each component addresses specific needs while integrating seamlessly with the others.
        </EcosystemDescription>

        <ToolsGrid>
          <ToolCard>
            <ToolIcon>
              <FaUsers />
            </ToolIcon>
            <ToolTitle>Community Profiles</ToolTitle>
            <ToolDescription>
              Create your digital identity within Detroit&apos;s creative community. Connect with collaborators, 
              showcase your skills, and build your network.
            </ToolDescription>
            <ToolLink href="/profiles">Explore Profiles</ToolLink>
          </ToolCard>

          <ToolCard>
            <ToolIcon>
              <FaIdCard />
            </ToolIcon>
            <ToolTitle>Creator Portfolios</ToolTitle>
            <ToolDescription>
              Showcase your work, projects, and achievements. Our portfolio system helps creators 
              gain visibility and connect with opportunities in the community.
            </ToolDescription>
            <ToolLink href="/profiles">View Portfolios</ToolLink>
          </ToolCard>

          <ToolCard>
            <ToolIcon>
              <FaTicketAlt />
            </ToolIcon>
            <ToolTitle>Event Ticketing</ToolTitle>
            <ToolDescription>
              Our transparent ticketing system ensures fair revenue distribution among artists, 
              venues, and organizers while creating a seamless experience for attendees.
            </ToolDescription>
            <ToolLink href="/ticketing">Learn More</ToolLink>
          </ToolCard>
        </ToolsGrid>
      </Section>

      <Section>
        <SectionTitle>How It All Connects</SectionTitle>
        <ConnectionDescription>
          Our tools are designed to work together, creating a cohesive ecosystem that supports 
          Detroit&apos;s creative community at every level.
        </ConnectionDescription>

        <FlowDiagram>
          <FlowStep>
            <FlowNumber>1</FlowNumber>
            <FlowContent>
              <FlowTitle>Create Your Profile</FlowTitle>
              <FlowDescription>
                Establish your digital identity in the community with a profile that showcases your skills, 
                interests, and connections.
              </FlowDescription>
            </FlowContent>
          </FlowStep>

          <FlowStep>
            <FlowNumber>2</FlowNumber>
            <FlowContent>
              <FlowTitle>Build Your Portfolio</FlowTitle>
              <FlowDescription>
                Showcase your work and achievements to gain visibility within the community and 
                attract collaboration opportunities.
              </FlowDescription>
            </FlowContent>
          </FlowStep>

          <FlowStep>
            <FlowNumber>3</FlowNumber>
            <FlowContent>
              <FlowTitle>Participate in Events</FlowTitle>
              <FlowDescription>
                Discover, attend, or organize events using our transparent ticketing system that 
                ensures fair compensation for all participants.
              </FlowDescription>
            </FlowContent>
          </FlowStep>

          <FlowStep>
            <FlowNumber>4</FlowNumber>
            <FlowContent>
              <FlowTitle>Grow the Community</FlowTitle>
              <FlowDescription>
                As the ecosystem expands, new opportunities emerge for collaboration, funding, 
                and creative expression throughout Detroit.
              </FlowDescription>
            </FlowContent>
          </FlowStep>
        </FlowDiagram>
      </Section>

      <Section>
        <SectionTitle>Technical Implementation</SectionTitle>
        <TechDescription>
          We&apos;re building these tools using modern web technologies with a focus on accessibility, 
          security, and community ownership.
        </TechDescription>

        <TechStack>
          <TechItem>
            <TechIcon>
              <FaCode />
            </TechIcon>
            <TechName>Next.js & React</TechName>
            <TechDetail>
              Modern frontend framework for building responsive, user-friendly interfaces
            </TechDetail>
          </TechItem>

          <TechItem>
            <TechIcon>
              <FaUsers />
            </TechIcon>
            <TechName>DPoP Authentication</TechName>
            <TechDetail>
              Secure, decentralized authentication system for user identity management
            </TechDetail>
          </TechItem>

          <TechItem>
            <TechIcon>
              <FaTicketAlt />
            </TechIcon>
            <TechName>Smart Contracts</TechName>
            <TechDetail>
              Blockchain-based agreements for transparent ticketing and revenue sharing
            </TechDetail>
          </TechItem>
        </TechStack>
      </Section>

      <CallToAction>
        <CTAContent>
          <CTATitle>Join Us in Building Detroit&apos;s Creative Infrastructure</CTATitle>
          <CTAText>
            Whether you&apos;re a developer, designer, artist, or community organizer, there&apos;s a place for you 
            in building these tools. Help us create the infrastructure that will power Detroit&apos;s creative renaissance.
          </CTAText>
          <CTAButtons>
            <CTAButton href="https://github.com/buidl-renaissance" target="_blank">
              <FaGithub style={{ marginRight: '8px' }} /> Contribute on GitHub
            </CTAButton>
            <CTAButton href="https://discord.gg/kSuS9kdgTk" target="_blank">
              <FaDiscord style={{ marginRight: '8px' }} /> Join Our Discord
            </CTAButton>
          </CTAButtons>
          <SocialLinks>
            <SocialLink href="https://github.com/buidl-renaissance" target="_blank">
              <FaGithub />
            </SocialLink>
            <SocialLink href="https://discord.gg/kSuS9kdgTk" target="_blank">
              <FaDiscord />
            </SocialLink>
            <SocialLink href="https://twitter.com/builddetroit" target="_blank">
              <FaXTwitter />
            </SocialLink>
          </SocialLinks>
        </CTAContent>
      </CallToAction>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  color: #f5f5f5;
  background-color: #121212;
  min-height: 100vh;
`;

const Hero = styled.div`
  padding: 6rem 0 4rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 4rem 0 3rem;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: #a0a0a0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Section = styled.section`
  padding: 4rem 0;
  border-top: 1px solid #333;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EcosystemDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ToolCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const ToolIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #0078d4;
`;

const ToolTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ToolDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #c0c0c0;
`;

const ToolLink = styled(Link)`
  display: inline-block;
  color: #0078d4;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`;

const ConnectionDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FlowDiagram = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FlowStep = styled.div`
  display: flex;
  margin-bottom: 2rem;
  align-items: flex-start;
`;

const FlowNumber = styled.div`
  background-color: #0078d4;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 1.5rem;
  flex-shrink: 0;
`;

const FlowContent = styled.div`
  flex: 1;
  h3 {
    margin-top: 0;
  }
`;

const FlowTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FlowDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #c0c0c0;
`;

const TechDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TechItem = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const TechIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0078d4;
`;

const TechName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TechDetail = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #c0c0c0;
`;

const CallToAction = styled.section`
  padding: 4rem 0;
  background-color: #1a1a1a;
  border-radius: 12px;
  margin: 2rem 0 4rem;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 1.5rem;
`;

const CTATitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background: #0078d4;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #005ea2;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  font-size: 1.5rem;
  color: #a0a0a0;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0078d4;
  }
`;

import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';

export default function OpenSourceSoftware() {
  return (
    <Container>
      <Head>
        <title>Detroit OSS | Open Source Software for the People</title>
        <meta name="description" content="Join Detroit's open source software movement to build tools that empower our communities and address local challenges." />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Detroit Builds Together</HeroTitle>
          <HeroSubtitle>Open Source Software for the People, by the People.</HeroSubtitle>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Why Now?</SectionTitle>
        <SectionText>
          Technology is more accessible than ever. AI and open-source tools are lowering the barrier to entry, 
          giving everyday Detroiters the power to build real-world solutions for their neighborhoods, 
          businesses, and creative communities.
        </SectionText>
      </Section>

      <Section dark>
        <SectionTitle>Our Mission</SectionTitle>
        <SectionText>
          To unite developers, creatives, and civic leaders in Detroit to build open source software 
          that addresses local challenges, empowers communities, and inspires the next generation of builders.
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Who We&apos;re Looking For</SectionTitle>
        <RoleGrid>
          <RoleCard>
            <h3>Developers</h3>
            <p>Web, Mobile, AI, Blockchain</p>
          </RoleCard>
          
          <RoleCard>
            <h3>Designers & Product Thinkers</h3>
            <p>UX/UI, Product Strategy, Visual Design</p>
          </RoleCard>
          
          <RoleCard>
            <h3>Educators & Workshop Hosts</h3>
            <p>Share knowledge and empower others</p>
          </RoleCard>
          
          <RoleCard>
            <h3>Civic Organizers & Community Leaders</h3>
            <p>Connect people and resources</p>
          </RoleCard>
          
          <RoleCard wide>
            <h3>Anyone excited to build tools that matter</h3>
            <p>No coding experience required—just passion and ideas</p>
          </RoleCard>
        </RoleGrid>
      </Section>

      <Section dark>
        <SectionTitle>What We&apos;re Building</SectionTitle>
        <ProjectGrid>
          <ProjectCard>
            <ProjectIcon>🏙️</ProjectIcon>
            <div>
              <h3>Community Platforms</h3>
              <p>Tools to manage events, artist collectives, and civic engagement.</p>
            </div>
          </ProjectCard>
          
          <ProjectCard>
            <ProjectIcon>🎟️</ProjectIcon>
            <div>
              <h3>Decentralized Ticketing</h3>
              <p>Revenue-sharing systems that benefit artists and venues directly.</p>
            </div>
          </ProjectCard>
          
          <ProjectCard>
            <ProjectIcon>🧑‍🎨</ProjectIcon>
            <div>
              <h3>Creator Portfolios</h3>
              <p>Digital identities that connect artists to opportunities and ownership.</p>
            </div>
          </ProjectCard>
          
          <ProjectCard>
            <ProjectIcon>💬</ProjectIcon>
            <div>
              <h3>Local Forums & Feedback Loops</h3>
              <p>Spaces to discuss and vote on what matters most in our neighborhoods.</p>
            </div>
          </ProjectCard>
        </ProjectGrid>
      </Section>

      <Section>
        <SectionTitle>How to Get Involved</SectionTitle>
        <InvolvementGrid>
          <InvolvementCard>
            <h3>Join Our Builder Circle</h3>
            <p>Sign up for early invites to upcoming hack nights and open-source sprints.</p>
            <ActionButton href="/">Join Now</ActionButton>
          </InvolvementCard>
          
          <InvolvementCard>
            <h3>Contribute on GitHub</h3>
            <p>Browse live projects and start collaborating.</p>
            <ActionButton href="/">Explore Repos</ActionButton>
          </InvolvementCard>
          
          <InvolvementCard>
            <h3>Pitch a Community Idea</h3>
            <p>Have an idea for a tool Detroit needs? Let&apos;s talk.</p>
            <ActionButton href="/">Submit an Idea</ActionButton>
          </InvolvementCard>
          
          <InvolvementCard>
            <h3>Come to Our Next Meetup</h3>
            <p>Hang out, code, and connect IRL.</p>
            <ActionButton href="/">RSVP to Event</ActionButton>
          </InvolvementCard>
        </InvolvementGrid>
      </Section>

      <Section dark>
        <SectionTitle>Let&apos;s Build the Renaissance</SectionTitle>
        <Manifesto>
          <p>Detroit was built by builders. This is our generation&apos;s turn—using code, creativity, and collaboration.</p>
          <p>Be part of the open-source movement powering Detroit&apos;s future.</p>
        </Manifesto>
        
        <CTAButton href="/">Join the Movement</CTAButton>
      </Section>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  
  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #90caf9;
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Section = styled.section<{ dark?: boolean }>`
  padding: 5rem 2rem;
  background: ${props => props.dark ? '#1a1a1a' : '#fff'};
  color: ${props => props.dark ? '#fff' : '#1a1a1a'};
  
  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const SectionText = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  line-height: 1.6;
  margin: 0 auto;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 3rem auto 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RoleCard = styled.div<{ wide?: boolean }>`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  @media (min-width: 768px) {
    grid-column: ${props => props.wide ? 'span 2' : 'span 1'};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    color: #555;
    line-height: 1.5;
  }
`;

const ProjectGrid = styled.div`
  max-width: 800px;
  margin: 3rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProjectCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  
  h3 {
    margin-top: 0;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #ccc;
    line-height: 1.6;
  }
`;

const ProjectIcon = styled.div`
  font-size: 2.5rem;
  flex-shrink: 0;
`;

const InvolvementGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 3rem auto 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InvolvementCard = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    color: #555;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }
`;

const ActionButton = styled(Link)`
  display: inline-block;
  background: #333;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    background: #555;
    transform: translateY(-2px);
  }
`;

const Manifesto = styled.div`
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
  
  p {
    font-size: 1.5rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    
    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const CTAButton = styled(Link)`
  display: block;
  max-width: 300px;
  margin: 0 auto;
  background: #90caf9;
  color: #1a1a1a;
  text-align: center;
  padding: 1.25rem 2rem;
  font-size: 1.25rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #64b5f6;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

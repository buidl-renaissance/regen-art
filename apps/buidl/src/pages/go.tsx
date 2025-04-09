import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';

export default function GoBuildDetroit() {
  return (
    <Container>
      <Head>
        <title>Go Build Detroit | Power the Future. Together.</title>
        <meta name="description" content="Join the movement to build a better Detroit through community projects, initiatives, and collaboration." />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Go Build Detroit</HeroTitle>
          <HeroSubtitle>Power the Future. Together.</HeroSubtitle>
          
          <HeroText>
            Detroit has always been a city of builders, dreamers, and doers. From the assembly line to the art studio, 
            from grassroots organizing to groundbreaking innovation—we rise when we rise together.
          </HeroText>
          
          <CallToAction>
            <h2>This is your call to action.</h2>
            <p>
              Detroit doesn&apos;t need permission to evolve. It needs participation. <em>Your participation.</em>
            </p>
            <p>
              Whether you&apos;re a neighbor with a vision, a builder with a plan, or a creative with a cause—this is 
              your invitation to step up, plug in, and push forward.
            </p>
          </CallToAction>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Take Initiative. Make Impact.</SectionTitle>
        <SectionSubtitle>You can:</SectionSubtitle>
        
        <InitiativeGrid>
          <InitiativeCard>
            <h3>Start a Project</h3>
            <p>Launch a community garden, block cleanup, mural, tech workshop, or whatever your neighborhood needs.</p>
          </InitiativeCard>
          
          <InitiativeCard>
            <h3>Join a Movement</h3>
            <p>Find projects already in motion and offer your skills, tools, or time.</p>
          </InitiativeCard>
          
          <InitiativeCard>
            <h3>Access Resources</h3>
            <p>Get connected with grants, tools, workspaces, and people ready to help.</p>
          </InitiativeCard>
          
          <InitiativeCard>
            <h3>Tell Your Story</h3>
            <p>Document your journey and inspire others to take action in their corner of the city.</p>
          </InitiativeCard>
        </InitiativeGrid>
      </Section>

      <Section dark>
        <SectionTitle>How It Works</SectionTitle>
        
        <ProcessSteps>
          <ProcessStep>
            <StepNumber>1</StepNumber>
            <div>
              <h3>Submit Your Idea</h3>
              <p>A one-pager. A dream. A napkin sketch. Start where you are.</p>
            </div>
          </ProcessStep>
          
          <ProcessStep>
            <StepNumber>2</StepNumber>
            <div>
              <h3>Get Matched with Resources</h3>
              <p>We&apos;ll connect you with what you need—whether it&apos;s funding, collaborators, or just advice from someone who&apos;s done it before.</p>
            </div>
          </ProcessStep>
          
          <ProcessStep>
            <StepNumber>3</StepNumber>
            <div>
              <h3>Launch and Grow</h3>
              <p>We&apos;ll help you tell your story, grow your community, and scale your impact.</p>
            </div>
          </ProcessStep>
        </ProcessSteps>
      </Section>

      <Section>
        <SectionTitle>Why Now?</SectionTitle>
        <Manifesto>
          <p>Because no one is coming to save Detroit.</p>
          <p>We are the ones we've been waiting for.</p>
          <p>This is our land. Our legacy. Our future.</p>
          <p>Let's build it. Together.</p>
        </Manifesto>
        
        <CTAButton href="https://github.com/buidl-renaissance/regen-art/">Start Building</CTAButton>
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

const HeroText = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  line-height: 1.6;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CallToAction = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-left: 4px solid #90caf9;
  padding: 2rem;
  border-radius: 0 8px 8px 0;
  
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  em {
    font-style: italic;
    color: #90caf9;
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

const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 400;
`;

const InitiativeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const InitiativeCard = styled.div`
  background: #f5f5f5;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
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

const ProcessSteps = styled.div`
  max-width: 800px;
  margin: 3rem auto;
`;

const ProcessStep = styled.div`
  display: flex;
  margin-bottom: 3rem;
  align-items: flex-start;
  font-family: 'Courier New', monospace;

  h3 {
    margin-top: 0;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #ccc;
    line-height: 1.6;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StepNumber = styled.div`
  background: #90caf9;
  color: #1a1a1a;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 1.5rem;
  flex-shrink: 0;
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

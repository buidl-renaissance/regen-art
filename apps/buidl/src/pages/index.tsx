import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import {
  FaCode,
  FaUsers,
  FaLaptopCode,
  FaGithub,
  FaComments,
} from 'react-icons/fa';

const BuidlPage = () => {
  return (
    <Container>
      <Head>
        <title>BUIDL Detroit - Join the Developer Community</title>
        <meta
          name="description"
          content="Join Detroit's developer community to build open-source projects that empower local creative ecosystems."
        />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>BUIDL Detroit</HeroTitle>
          <HeroSubtitle>
            Build Detroit&apos;s Digital Future
          </HeroSubtitle>
          <HeroDescription>
            Join our community of developers, designers, and creators building
            open-source tools that empower Detroit&apos;s creative ecosystem.
          </HeroDescription>
          <HeroCTA>
            <PrimaryButton
              href="https://github.com/buidl-renaissance/regen-art/"
              target="_blank"
            >
              <FaGithub style={{ marginRight: '8px' }} /> View on GitHub
            </PrimaryButton>
            <SecondaryButton href="/forum">
              <FaComments style={{ marginRight: '8px' }} /> Join Our Forum
            </SecondaryButton>
          </HeroCTA>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>
          <FaCode style={{ marginRight: '12px' }} />
          Our Projects
        </SectionTitle>
        <ProjectGrid>
          <ProjectCard>
            <ProjectHeader>
              <ProjectIcon>
                <FaUsers />
              </ProjectIcon>
              <ProjectTitle>Community Platform</ProjectTitle>
            </ProjectHeader>
            <ProjectDescription>
              A full-stack application for managing Detroit's creative
              communities, events, and projects. Built with Next.js, TypeScript,
              and Knex.js.
            </ProjectDescription>
            <TechStack>
              <TechTag>Next.js</TechTag>
              <TechTag>TypeScript</TechTag>
              <TechTag>Knex.js</TechTag>
              <TechTag>Styled Components</TechTag>
            </TechStack>
            <ProjectActions>
              <ProjectLink
                href="https://github.com/godswork/detroit/tree/main/libs/community"
                target="_blank"
              >
                View Code
              </ProjectLink>
              <ProjectLink href="/projects/community">Get Involved</ProjectLink>
            </ProjectActions>
          </ProjectCard>

          <ProjectCard>
            <ProjectHeader>
              <ProjectIcon>
                <FaLaptopCode />
              </ProjectIcon>
              <ProjectTitle>Creator Portfolios</ProjectTitle>
            </ProjectHeader>
            <ProjectDescription>
              Digital identity and portfolio system for artists and creators to
              showcase their work and connect with the community.
            </ProjectDescription>
            <TechStack>
              <TechTag>React</TechTag>
              <TechTag>TypeScript</TechTag>
              <TechTag>DPoP Auth</TechTag>
              <TechTag>IPFS</TechTag>
            </TechStack>
            <ProjectActions>
              <ProjectLink
                href="https://github.com/godswork/detroit/tree/main/apps/detroit/src/pages/profile"
                target="_blank"
              >
                View Code
              </ProjectLink>
              <ProjectLink href="/projects/profiles">Get Involved</ProjectLink>
            </ProjectActions>
          </ProjectCard>

          <ProjectCard>
            <ProjectHeader>
              <ProjectIcon>
                <FaCode />
              </ProjectIcon>
              <ProjectTitle>Event Ticketing</ProjectTitle>
            </ProjectHeader>
            <ProjectDescription>
              Decentralized ticketing system for community events with revenue
              sharing and transparent distribution to artists and venues.
            </ProjectDescription>
            <TechStack>
              <TechTag>Node.js</TechTag>
              <TechTag>Express</TechTag>
              <TechTag>SQLite/MySQL</TechTag>
              <TechTag>Web3</TechTag>
            </TechStack>
            <ProjectActions>
              <ProjectLink
                href="https://github.com/godswork/detroit/tree/main/libs/ticketing"
                target="_blank"
              >
                View Code
              </ProjectLink>
              <ProjectLink href="/projects/ticketing">Get Involved</ProjectLink>
            </ProjectActions>
          </ProjectCard>
        </ProjectGrid>
      </Section>

      <Section>
        <SectionTitle>How to Get Involved</SectionTitle>
        <StepsContainer>
          <StepCard>
            <StepHeader>
              <StepNumber>1</StepNumber>
              <StepTitle>Join Our Community</StepTitle>
            </StepHeader>
            <StepDescription>
              Connect with our developer community on Discord and GitHub to
              meet collaborators and learn about our development process.
            </StepDescription>
            <StepAction>
              <StepLink href="/join">
                Join Discord <StepLinkArrow>→</StepLinkArrow>
              </StepLink>
            </StepAction>
          </StepCard>

          <StepCard>
            <StepHeader>
              <StepNumber>2</StepNumber>
              <StepTitle>Pick a Project</StepTitle>
            </StepHeader>
            <StepDescription>
              Browse our active projects and find one that matches your skills
              and interests. Each project has detailed documentation to help
              you get started.
            </StepDescription>
            <StepAction>
              <StepLink
                href="https://github.com/godswork/detroit"
                target="_blank"
              >
                Explore Projects <StepLinkArrow>→</StepLinkArrow>
              </StepLink>
            </StepAction>
          </StepCard>

          <StepCard>
            <StepHeader>
              <StepNumber>3</StepNumber>
              <StepTitle>Start Contributing</StepTitle>
            </StepHeader>
            <StepDescription>
              Set up your local development environment, pick an issue to work
              on, and submit your first pull request. We welcome contributions
              of all sizes!
            </StepDescription>
            <StepAction>
              <StepLink href="/docs/contributing">
                Contribution Guide <StepLinkArrow>→</StepLinkArrow>
              </StepLink>
            </StepAction>
          </StepCard>
        </StepsContainer>
      </Section>
    </Container>
  );
};

export default BuidlPage;

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

const HeroCTA = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  background-color: transparent;
  color: #3498db;
  border: 2px solid #3498db;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: rgba(52, 152, 219, 0.1);
  }
`;

const Section = styled.section`
  padding: 4rem 0;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProjectIcon = styled.div`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: #3498db;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  color: #c0c0c0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background-color: #2c2c2c;
  color: #a0a0a0;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ProjectActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProjectLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StepNumber = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 1rem;
`;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #c0c0c0;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const StepAction = styled.div`
  margin-top: auto;
`;

const StepLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #2980b9;
  }
`;

const StepLinkArrow = styled.span`
  margin-left: 0.5rem;
  transition: transform 0.2s;
  
  ${StepLink}:hover & {
    transform: translateX(3px);
  }
`;

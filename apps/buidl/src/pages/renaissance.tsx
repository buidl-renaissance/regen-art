import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import {
  FaDiscord,
  FaGithub,
  FaUsers,
  FaCalendarAlt,
  FaTools,
  FaIdCard,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { ProjectsGallery } from '../components/ProjectsGallery';
import {
  SocialLinks,
  SocialLink,
  CTASection,
  CTAContent,
  CTATitle,
  CTADescription,
  CTAButtons,
  StepAction,
  StepLink,
  StepLinkArrow,
} from '../components/Styles';

const Home = () => {
  return (
    <Container>
      <Head>
        <title>Renaissance City - Detroit&apos;s Creative Ecosystem</title>
        <meta
          name="description"
          content="Open-source platform for Detroit's creative communities."
        />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Build the Renaissance in Detroit</HeroTitle>
          <HeroSubtitle>
            Join us in creating infrastructure for a regenerative creative
            economy
          </HeroSubtitle>
          {/* <HeroDescription>
            Join us in creating infrastructure for a regenerative creative economy.
          </HeroDescription> */}
          <HeroCTA>
            <PrimaryButton href="/profile">Create Profile</PrimaryButton>
            <SecondaryButton href="/readme">ReadMe</SecondaryButton>
          </HeroCTA>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>
          <FaUsers style={{ marginRight: '12px' }} />
          Join the Renaissance
        </SectionTitle>
        <Paragraph>
          Detroit is a city of builders. By contributing, you&apos;re helping
          shape a regenerative creative economy.
        </Paragraph>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>
              <FaTools />
            </FeatureIcon>
            <FeatureTitle>Community Infrastructure</FeatureTitle>
            <FeatureDescription>
              Open-source systems for Detroit&apos;s creative communities. Build
              platforms for creators to find collaborators and share resources.
            </FeatureDescription>
            <StepAction>
              <StepLink href="/community">
                Learn More <StepLinkArrow>→</StepLinkArrow>
              </StepLink>
            </StepAction>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <FaIdCard />
            </FeatureIcon>
            <FeatureTitle>Creator Economy</FeatureTitle>
            <FeatureDescription>
              On-chain digital identity and showcase tools for creators. Build
              infrastructure that empowers artists to share work and connect.
            </FeatureDescription>
            <StepAction>
              <StepLink href="/profiles">
                Learn More <StepLinkArrow>→</StepLinkArrow>
              </StepLink>
            </StepAction>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <FaCalendarAlt />
            </FeatureIcon>
            <FeatureTitle>Events & Experiences</FeatureTitle>
            <FeatureDescription>
              Transparent ticketing with automated revenue sharing. Build tools
              for organizing and promoting local events.
            </FeatureDescription>
            <StepAction>
              <StepLink href="/ticketing">
                Learn More <StepLinkArrow>→</StepLinkArrow>
              </StepLink>
            </StepAction>
          </FeatureCard>
        </FeatureGrid>
      </Section>

      <ProjectsGallery />

      <CTASection>
        <CTAContent>
          <CTATitle>Why It Matters</CTATitle>
          <CTADescription>
            Detroit is a city of visionaries. Your code helps shape a
            regenerative creative economy.
          </CTADescription>
          <CTAButtons>
            <PrimaryButton href="/profile">Create Profile</PrimaryButton>
            <SocialLinks>
              <SocialLink
                href="https://github.com/buidl-renaissance"
                target="_blank"
              >
                <FaGithub />
              </SocialLink>
              <SocialLink href="https://discord.gg/kSuS9kdgTk" target="_blank">
                <FaDiscord />
              </SocialLink>
              <SocialLink
                href="https://twitter.com/builddetroit"
                target="_blank"
              >
                <FaXTwitter />
              </SocialLink>
            </SocialLinks>
          </CTAButtons>
        </CTAContent>
      </CTASection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  font-family: 'Courier New', monospace;
  background-color: #121212;
  color: #f5f5f5;

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;
const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 3rem 0;

  @media (max-width: 768px) {
    min-height: 75vh;
    padding: 2.5rem 0;
  }

  @media (max-width: 480px) {
    min-height: 70vh;
    padding: 2rem 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: #f5f5f5;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 2.75rem;
  }

  @media (max-width: 480px) {
    font-size: 2.25rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.8rem;
  color: #90caf9;
  font-weight: normal;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #cccccc;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const HeroCTA = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 0.875rem;
    margin-top: 1.75rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
`;

const Section = styled.section`
  margin: 5rem 0;
  padding: 0;
  &:first-of-type {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    margin: 4rem 0;
  }

  @media (max-width: 480px) {
    margin: 3rem 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #90caf9;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  font-family: 'Courier New', monospace;
  letter-spacing: -0.5px;
  border-bottom: 1px solid #333;
  padding-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #f5f5f5;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
    margin-top: 1.5rem;
  }
`;

const FeatureCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #90caf9;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  color: #f5f5f5;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #cccccc;
  font-family: 'Courier New', monospace;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  background-color: #90caf9;
  color: #121212;
  font-weight: 600;
  padding: 0.875rem 1.75rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.2s ease;
  font-family: 'Courier New', monospace;

  &:hover {
    background-color: #64b5f6;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background-color: transparent;
  color: #90caf9;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: 2px solid #90caf9;
  border-radius: 6px;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.2s ease;
  font-family: 'Courier New', monospace;

  &:hover {
    background-color: rgba(144, 202, 249, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
    padding: 0.625rem 1.25rem;
    font-size: 1rem;
  }
`;

export default Home;

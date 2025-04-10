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
import { SocialLinks, SocialLink, CTASection, CTAContent, CTATitle, CTADescription, CTAButtons } from '../components/Styles';

const Home = () => {
  return (
    <Container>
      <Head>
        <title>
          Renaissance City - Community Software for Detroit&apos;s Creative
          Ecosystem
        </title>
        <meta
          name="description"
          content="Open-source platform built to serve Detroit&apos;s creative communities through events, artist showcases, and community projects."
        />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Build the Renaissance in Detroit</HeroTitle>
          <HeroSubtitle>
            We&apos;re inviting developers to help launch a new era of decentralized tools that empower artists, communities, and culture.
          </HeroSubtitle>
          <HeroDescription>
            Join us in creating infrastructure that powers a regenerative creative economy from the ground up.
          </HeroDescription>
          <HeroCTA>
            <PrimaryButton href="/profile">Create Your Profile</PrimaryButton>
            <SecondaryButton href="/readme">ReadMe</SecondaryButton>
          </HeroCTA>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>
          <FaUsers style={{ marginRight: '12px' }} />
          Join the Renaissance. Build what matters.
        </SectionTitle>
        <Paragraph>
          Detroit is a city of builders and visionaries. By contributing, you&apos;re not just coding—you&apos;re helping shape a regenerative creative economy from the ground up.
        </Paragraph>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>
              <FaTools />
            </FeatureIcon>
            <FeatureTitle>Community Infrastructure</FeatureTitle>
            <FeatureDescription>
              A full-stack system for managing Detroit&apos;s creative communities. Open-source, modular, and ready to scale with your contributions. Build platforms that enable creators to find collaborators, manage projects, and share resources within the Detroit creative ecosystem.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <FaIdCard />
            </FeatureIcon>
            <FeatureTitle>Creator Economy</FeatureTitle>
            <FeatureDescription>
              Help us power on-chain digital identity and showcase tools for creators. From web3-native portfolios to verifiable credentials and digital galleries, you&apos;ll be building infrastructure that empowers artists to share their work, connect with the community, and own their narrative.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <FaCalendarAlt />
            </FeatureIcon>
            <FeatureTitle>Events & Experiences</FeatureTitle>
            <FeatureDescription>
              Design and deploy transparent ticketing protocols with automated revenue sharing for artists, organizers, and venues. Build tools for organizing, promoting, and documenting local events that bring people together and strengthen Detroit&apos;s creative community.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </Section>

      <ProjectsGallery />

      <CTASection>
        <CTAContent>
          <CTATitle>Why It Matters</CTATitle>
          <CTADescription>
            Detroit is a city of builders and visionaries. By contributing, you&apos;re not just coding—you&apos;re helping shape a regenerative creative economy from the ground up.
          </CTADescription>
          <CTAButtons>
            <PrimaryButton href="/profile">Create Your Profile</PrimaryButton>
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
  
  @media (max-width: 480px) {
    padding: 2rem 1rem;
    min-height: 70vh;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 1rem;
  
  @media (max-width: 480px) {
    padding: 0;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: #f5f5f5;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
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
    font-size: 1.3rem;
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

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const HeroCTA = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;

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

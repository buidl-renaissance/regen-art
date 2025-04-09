import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaGithub, FaGlobe, FaTwitter, FaLinkedin, FaPlus } from 'react-icons/fa';
import { getArtists, Artist, CreatorPortfolio } from '@gods.work/utils';
import ProfileCard from '../../components/ProfileCard';

// Mock data for creator profiles
const CREATORS: CreatorPortfolio[] = [
  {
    id: 1,
    profile: {
      handle: 'Andrea Burg',
      name: 'Andrea Burg',
      profileImage: '/images/creators/andrea.jpg',
      bio: 'Creating vibrant murals that tell Detroit\'s stories through color and form. Specializing in community-driven art projects.',
      website: 'https://artist-portfolio-beige.vercel.app/',
      socialLinks: {
        twitter: 'https://twitter.com/andreaburg',
        instagram: 'https://instagram.com/burg.ink',
        linkedin: 'https://linkedin.com/in/andreaburg',
        github: 'https://github.com/andreaburg'
      }
    },
    tags: ['Murals', 'Public Art', 'Tattoos', 'Community Engagement'],
  },
  {
    id: 2,
    profile: {
      handle: 'WiredInSamurai',
      name: 'WiredInSamurai',
      profileImage: '/images/creators/maya.jpg',
      bio: '',
      website: 'https://mayajohnsonart.com',
      socialLinks: {
        twitter: 'https://twitter.com/mayajart',
        linkedin: 'https://linkedin.com/in/mayajohnsonart',
        github: '',
        instagram: ''
      }
    },
    tags: ['Murals', 'Public Art', 'Community Engagement'],
  }
];

export const getServerSideProps = async () => {
  const artists = await getArtists();
  return {
    props: { artists }
  }
}

export default function CreatorProfiles({ artists }: { artists: Artist[] }) {
  const [filter, setFilter] = useState('All');
  
  // Extract unique tags for filter
  const allTags = ['All', ...new Set(artists.flatMap(creator => creator.tags))];
  
  // Filter creators based on selected tag
  const filteredCreators = filter === 'All' 
    ? CREATORS 
    : CREATORS.filter(creator => creator.tags?.includes(filter));
  
  // Featured creators
  const featuredCreators = CREATORS;

  return (
    <Container>
      <Head>
        <title>Creator Portfolios | Detroit Renaissance</title>
        <meta name="description" content="Discover the talented creators and artists shaping Detroit's creative renaissance." />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Creator Portfolios</HeroTitle>
          <HeroSubtitle>Discover the talent shaping Detroit&apos;s creative renaissance</HeroSubtitle>
          <CreateProfileButton href="/projects/profiles/create">
            <FaPlus style={{ marginRight: '8px' }} /> Create Your Portfolio
          </CreateProfileButton>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Featured Creators</SectionTitle>
        <FeaturedGrid>
          {featuredCreators.map((creator: CreatorPortfolio) => (
            <ProfileCard 
              key={creator.id} 
              profile={creator.profile} 
              tags={creator.tags}
              linkUrl={`/projects/profiles/${creator.id}`}
            />
          ))}
        </FeaturedGrid>
      </Section>

      <Section>
        <FilterHeader>
          <SectionTitle>All Creators</SectionTitle>
          <FilterTabs>
            {allTags.map(tag => (
              <FilterTab 
                key={tag} 
                active={filter === tag}
                onClick={() => setFilter(tag as string)}
              >
                {tag}
              </FilterTab>
            ))}
          </FilterTabs>
        </FilterHeader>
        
        <CreatorGrid>
          {filteredCreators.map(creator => (
            <ProfileCard 
              key={creator.id} 
              profile={creator.profile} 
              tags={creator.tags}
              linkUrl={`/projects/profiles/${creator.id}`}
            />
          ))}
        </CreatorGrid>
      </Section>

      <CallToAction>
        <CTAContent>
          <CTATitle>Join Detroit&apos;s Creative Community</CTATitle>
          <CTAText>
            Showcase your work, connect with collaborators, and be part of Detroit&apos;s creative renaissance.
          </CTAText>
          <CTAButton href="/projects/profiles/create">
            Create Your Portfolio
          </CTAButton>
        </CTAContent>
      </CallToAction>
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
  padding: 5rem 2rem;
  
  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #b6e0ff; /* Improved contrast from #90caf9 */
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CreateProfileButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background: #0078d4; /* Darker blue for better contrast on white text */
  color: #ffffff;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #005ea2; /* Darker hover state */
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    padding: 5rem 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeaturedCreatorCard = styled.div`
  background: #2a2a2a;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  }
`;

const CreatorAvatar = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0078d4;
    color: #ffffff;
    font-size: 3rem;
    font-weight: 700;
  }
`;

const CreatorInfo = styled.div`
  padding: 1.5rem;
  background-color: #1a1a1a;
`;

const CreatorName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #f5f5f5;
`;

const CreatorTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #b0b0b0;
  margin-bottom: 1rem;
`;

const CreatorBio = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #d0d0d0;
`;

const CreatorTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CreatorTag = styled.span`
  background: #333333;
  color: #e0e0e0;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #444444;
`;

const CreatorLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #a0a0a0; /* Lighter for dark theme */
  font-size: 1.25rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #3a97e8; /* Brighter blue for dark theme contrast */
  }
`;

const FilterHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const FilterTab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? '#3a97e8' : '#333333'};
  color: ${props => props.active ? '#ffffff' : '#a0a0a0'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? '#2a87d8' : '#444444'};
  }
`;

const CreatorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CreatorCard = styled.div`
  background: #222222;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
  }
`;

const ViewProfileButton = styled(Link)`
  margin-top: auto;
  background: transparent;
  color: #e0e0e0;
  border: 2px solid #3a97e8;
  text-align: center;
  padding: 0.75rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  margin: 1rem 1.5rem 1.5rem;
  
  &:hover {
    background: #3a97e8;
    color: #ffffff;
  }
`;

const CallToAction = styled.section`
  background: linear-gradient(135deg, #0f0f0f 0%, #222 100%);
  color: #fff;
  padding: 5rem 2rem;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #d0d0d0;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: #3a97e8;
  color: #ffffff;
  text-align: center;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2a87d8;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  }
`;

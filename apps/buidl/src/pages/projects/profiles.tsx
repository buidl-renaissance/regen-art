import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaGithub, FaGlobe, FaTwitter, FaLinkedin, FaPlus } from 'react-icons/fa';

// Mock data for creator profiles
const CREATORS = [
  {
    id: '1',
    name: 'Maya Johnson',
    title: 'Visual Artist & Muralist',
    bio: 'Creating vibrant murals that tell Detroit\'s stories through color and form. Specializing in community-driven art projects.',
    avatar: '/images/creators/maya.jpg',
    links: {
      website: 'https://mayajohnsonart.com',
      twitter: 'https://twitter.com/mayajart',
      linkedin: 'https://linkedin.com/in/mayajohnsonart'
    },
    tags: ['Murals', 'Public Art', 'Community Engagement'],
    featured: true
  },
  {
    id: '2',
    name: 'Jamal Williams',
    title: 'Full-Stack Developer & Tech Educator',
    bio: 'Building digital solutions for local businesses and teaching coding to Detroit youth. Passionate about tech accessibility.',
    avatar: '/images/creators/jamal.jpg',
    links: {
      github: 'https://github.com/jamalwilliams',
      website: 'https://jamalwilliams.dev',
      linkedin: 'https://linkedin.com/in/jamalwilliamsdev'
    },
    tags: ['Web Development', 'Education', 'JavaScript'],
    featured: true
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    title: 'Photographer & Documentarian',
    bio: 'Documenting Detroit\'s transformation through a lens of hope and resilience. Focusing on neighborhood stories and cultural preservation.',
    avatar: '/images/creators/sofia.jpg',
    links: {
      website: 'https://sofiasees.com',
      instagram: 'https://instagram.com/sofiasees'
    },
    tags: ['Photography', 'Documentary', 'Cultural Heritage'],
    featured: false
  },
  {
    id: '4',
    name: 'Marcus Chen',
    title: 'Sound Designer & Music Producer',
    bio: 'Creating soundscapes that capture Detroit\'s musical legacy while pushing boundaries. Specializing in collaborative audio projects.',
    avatar: '/images/creators/marcus.jpg',
    links: {
      website: 'https://marcuschen.audio',
      twitter: 'https://twitter.com/marcuschenaudio'
    },
    tags: ['Sound Design', 'Music Production', 'Audio Engineering'],
    featured: true
  },
  {
    id: '5',
    name: 'Amina Hassan',
    title: 'Community Organizer & Urban Planner',
    bio: 'Working at the intersection of design and social justice to create more equitable neighborhoods in Detroit.',
    avatar: '/images/creators/amina.jpg',
    links: {
      linkedin: 'https://linkedin.com/in/aminahassan',
      twitter: 'https://twitter.com/aminaplans'
    },
    tags: ['Urban Planning', 'Community Organizing', 'Social Justice'],
    featured: false
  },
  {
    id: '6',
    name: 'David Park',
    title: 'Game Developer & Digital Artist',
    bio: 'Creating interactive experiences that explore Detroit\'s history and possible futures through gaming and digital art.',
    avatar: '/images/creators/david.jpg',
    links: {
      github: 'https://github.com/davidparkdev',
      website: 'https://davidpark.games'
    },
    tags: ['Game Development', 'Digital Art', 'Interactive Media'],
    featured: false
  }
];

export default function CreatorProfiles() {
  const [filter, setFilter] = useState('All');
  
  // Extract unique tags for filter
  const allTags = ['All', ...new Set(CREATORS.flatMap(creator => creator.tags))];
  
  // Filter creators based on selected tag
  const filteredCreators = filter === 'All' 
    ? CREATORS 
    : CREATORS.filter(creator => creator.tags.includes(filter));
  
  // Featured creators
  const featuredCreators = CREATORS.filter(creator => creator.featured);

  return (
    <Container>
      <Head>
        <title>Creator Portfolios | Detroit Renaissance</title>
        <meta name="description" content="Discover the talented creators and artists shaping Detroit's creative renaissance." />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Creator Portfolios</HeroTitle>
          <HeroSubtitle>Discover the talent shaping Detroit's creative renaissance</HeroSubtitle>
          <CreateProfileButton href="/projects/profiles/create">
            <FaPlus style={{ marginRight: '8px' }} /> Create Your Portfolio
          </CreateProfileButton>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>Featured Creators</SectionTitle>
        <FeaturedGrid>
          {featuredCreators.map(creator => (
            <FeaturedCreatorCard key={creator.id}>
              <CreatorAvatar>
                {creator.avatar ? (
                  <img src={creator.avatar} alt={creator.name} />
                ) : (
                  <div className="placeholder">{creator.name.charAt(0)}</div>
                )}
              </CreatorAvatar>
              <CreatorInfo>
                <CreatorName>{creator.name}</CreatorName>
                <CreatorTitle>{creator.title}</CreatorTitle>
                <CreatorBio>{creator.bio}</CreatorBio>
                <CreatorTags>
                  {creator.tags.map(tag => (
                    <CreatorTag key={tag}>{tag}</CreatorTag>
                  ))}
                </CreatorTags>
                <CreatorLinks>
                  {creator.links.website && (
                    <SocialLink href={creator.links.website} target="_blank" rel="noopener noreferrer">
                      <FaGlobe />
                    </SocialLink>
                  )}
                  {creator.links.github && (
                    <SocialLink href={creator.links.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </SocialLink>
                  )}
                  {creator.links.twitter && (
                    <SocialLink href={creator.links.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </SocialLink>
                  )}
                  {creator.links.linkedin && (
                    <SocialLink href={creator.links.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </SocialLink>
                  )}
                </CreatorLinks>
              </CreatorInfo>
            </FeaturedCreatorCard>
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
                onClick={() => setFilter(tag)}
              >
                {tag}
              </FilterTab>
            ))}
          </FilterTabs>
        </FilterHeader>
        
        <CreatorGrid>
          {filteredCreators.map(creator => (
            <CreatorCard key={creator.id}>
              <CreatorAvatar>
                {creator.avatar ? (
                  <img src={creator.avatar} alt={creator.name} />
                ) : (
                  <div className="placeholder">{creator.name.charAt(0)}</div>
                )}
              </CreatorAvatar>
              <CreatorName>{creator.name}</CreatorName>
              <CreatorTitle>{creator.title}</CreatorTitle>
              <CreatorTags>
                {creator.tags.slice(0, 2).map(tag => (
                  <CreatorTag key={tag}>{tag}</CreatorTag>
                ))}
                {creator.tags.length > 2 && <CreatorTag>+{creator.tags.length - 2}</CreatorTag>}
              </CreatorTags>
              <ViewProfileButton href={`/projects/profiles/${creator.id}`}>
                View Profile
              </ViewProfileButton>
            </CreatorCard>
          ))}
        </CreatorGrid>
      </Section>

      <CallToAction>
        <CTAContent>
          <CTATitle>Join Detroit's Creative Community</CTATitle>
          <CTAText>
            Showcase your work, connect with collaborators, and be part of Detroit's creative renaissance.
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
  color: #90caf9;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CreateProfileButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background: #90caf9;
  color: #1a1a1a;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #64b5f6;
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
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
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
    background: #90caf9;
    color: #1a1a1a;
    font-size: 3rem;
    font-weight: 700;
  }
`;

const CreatorInfo = styled.div`
  padding: 1.5rem;
`;

const CreatorName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const CreatorTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 1rem;
`;

const CreatorBio = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CreatorTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CreatorTag = styled.span`
  background: #e0e0e0;
  color: #333;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CreatorLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #666;
  font-size: 1.25rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #90caf9;
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
  background: ${props => props.active ? '#90caf9' : '#e0e0e0'};
  color: ${props => props.active ? '#1a1a1a' : '#666'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? '#64b5f6' : '#d0d0d0'};
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
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ViewProfileButton = styled(Link)`
  margin-top: auto;
  background: transparent;
  color: #1a1a1a;
  border: 2px solid #90caf9;
  text-align: center;
  padding: 0.75rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  margin: 1rem 1.5rem 1.5rem;
  
  &:hover {
    background: #90caf9;
  }
`;

const CallToAction = styled.section`
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
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
  color: #e0e0e0;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: #90caf9;
  color: #1a1a1a;
  text-align: center;
  padding: 1rem 2rem;
  font-size: 1.1rem;
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


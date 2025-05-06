import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { getProfiles, ProfileData, CreatorPortfolio } from '@gods.work/utils';
import ProfileCard from '../components/ProfileCard';
import {
  Container,
  SectionContainer,
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  Section,
  SectionTitle,
  CallToAction,
  CTAContent,
  CTATitle,
  CTAText,
  CTAButton,
} from '../components/Styles';
import styled from 'styled-components';

// Mock data for creator profiles
const CREATORS: CreatorPortfolio[] = [
  {
    id: 1,
    profile: {
      handle: 'Andrea Burg',
      name: 'Andrea Burg',
      profileImage:
        'https://nyc3.digitaloceanspaces.com/dpop/profile-pictures/1739516638587-546917813.jpg',
      bio: "Creating vibrant murals that tell Detroit's stories through color and form. Specializing in community-driven art projects.",
      website: 'https://artist-portfolio-beige.vercel.app/',
      socialLinks: {
        twitter: 'https://twitter.com/andreaburg',
        instagram: 'https://instagram.com/burg.ink',
        // linkedin: 'https://linkedin.com/in/andreaburg',
        // github: 'https://github.com/andreaburg'
      },
    },
    tags: ['Murals', 'Public Art', 'Tattoos', 'Community Engagement'],
  },
  {
    id: 2,
    profile: {
      handle: 'WiredInSamurai',
      name: 'WiredInSamurai',
      profileImage:
        'https://dpop.nyc3.digitaloceanspaces.com/wiredinsamurai.jpg',
      bio: 'A multidisciplinary creator exploring the space between traditional and digital mediums, developing software that empowers creative communities through connection, storytelling, and systems where creativity becomes a collective act.',
      website: 'https://wiredinsamurai.builddetroit.xyz',
      socialLinks: {
        twitter: 'https://twitter.com/WiredInSamurai',
        linkedin: 'https://www.linkedin.com/in/john-gulbronson-a285285b/',
        github: 'https://github.com/johngulb',
        instagram: 'https://instagram.com/wiredinsamurai',
      },
    },
    tags: ['Murals', 'Public Art', 'Community Engagement'],
  },
];

export const getServerSideProps = async () => {
  const profiles = await getProfiles();
  return {
    props: { profiles },
  };
};

export default function CreatorProfiles({ profiles }: { profiles: ProfileData[] }) {
  const [filter, setFilter] = useState('All');

  // Extract unique tags for filter
  const allTags = [
    'All',
    ...new Set(profiles.flatMap((profile) => profile.tags)),
  ];

  // Filter creators based on selected tag
  const filteredCreators =
    filter === 'All'
      ? CREATORS
      : CREATORS.filter((creator) => creator.tags?.includes(filter));

  // Featured creators
  const featuredCreators = CREATORS;

  return (
    <Container>
      <Head>
        <title>Creator Portfolios | Detroit Renaissance</title>
        <meta
          name="description"
          content="Discover the talented creators and artists shaping Detroit's creative renaissance."
        />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Creator Portfolios</HeroTitle>
          <HeroSubtitle>
            Discover the talent shaping Detroit&apos;s creative renaissance
          </HeroSubtitle>
          <CreateProfileButton href="/profile">
            <FaPlus style={{ marginRight: '8px' }} /> Create Your Portfolio
          </CreateProfileButton>
        </HeroContent>
      </Hero>

      <Section>
        <SectionContainer size="large">
          <SectionTitle>Featured Creators</SectionTitle>
          <FeaturedGrid>
            {featuredCreators.map((creator: CreatorPortfolio) => (
              <ProfileCard
                key={creator.id}
                profile={creator.profile}
                tags={creator.tags}
                linkUrl={creator.profile.website}
              />
            ))}
          </FeaturedGrid>
        </SectionContainer>
      </Section>

      <Section>
        <SectionContainer size="large">
          <FilterHeader>
            <SectionTitle>All Creators</SectionTitle>
            <FilterTabs>
              {allTags.map((tag) => (
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
            {profiles.map((profile: ProfileData) => (
              <ProfileCard
                key={profile.handle}
                profile={profile}
                tags={profile.tags}
                linkUrl={`/profile/${profile.handle}`}
              />
            ))}
          </CreatorGrid>
        </SectionContainer>
      </Section>

      <CallToAction>
        <CTAContent>
          <CTATitle>Join Detroit&apos;s Creative Community</CTATitle>
          <CTAText>
            Showcase your work, connect with collaborators, and be part of
            Detroit&apos;s creative renaissance.
          </CTAText>
          <CTAButton href="/profile">
            Create Your Portfolio
          </CTAButton>
        </CTAContent>
      </CallToAction>
    </Container>
  );
}

// Styled Components
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
  background: ${(props) => (props.active ? '#3a97e8' : '#333333')};
  color: ${(props) => (props.active ? '#ffffff' : '#a0a0a0')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? '#2a87d8' : '#444444')};
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

import React from 'react';
import styled from 'styled-components';
import { FaUsers } from 'react-icons/fa';

export const CommunityGallery = () => {
  return (
    <Section>
      <SectionTitle>
        <FaUsers style={{ marginRight: '12px' }} />
        Communities
      </SectionTitle>
      <SectionDescription>
        Discover vibrant communities across Detroit or start your own. Connect with like-minded creators and build something meaningful together.
      </SectionDescription>
      
      <CommunityGrid>
        {/* Featured Communities */}
        <CommunityCard>
          <CommunityImage style={{ backgroundImage: `url('/images/communities/artists-collective.jpg')` }} />
          <CommunityContent>
            <CommunityBadge>Active</CommunityBadge>
            <CommunityTitle>Detroit Artists Collective</CommunityTitle>
            <CommunityDescription>
              A community of visual artists collaborating on exhibitions and public art projects throughout Detroit.
            </CommunityDescription>
            <MemberCount>87 members</MemberCount>
            <TagsContainer>
              <Tag>visual arts</Tag>
              <Tag>exhibitions</Tag>
              <Tag>public art</Tag>
            </TagsContainer>
            <CommunityLink href="/communities/detroit-artists-collective">
              View Community →
            </CommunityLink>
          </CommunityContent>
        </CommunityCard>
        
        <CommunityCard>
          <CommunityImage style={{ backgroundImage: `url('/images/communities/tech-detroit.jpg')` }} />
          <CommunityContent>
            <CommunityBadge>Active</CommunityBadge>
            <CommunityTitle>Tech Detroit</CommunityTitle>
            <CommunityDescription>
              Building Detroit&apos;s tech ecosystem through education, networking, and collaborative projects.
            </CommunityDescription>
            <MemberCount>156 members</MemberCount>
            <TagsContainer>
              <Tag>technology</Tag>
              <Tag>education</Tag>
              <Tag>startups</Tag>
            </TagsContainer>
            <CommunityLink href="/communities/tech-detroit">
              View Community →
            </CommunityLink>
          </CommunityContent>
        </CommunityCard>
        
        <CommunityCard>
          <CommunityImage style={{ backgroundImage: `url('/images/communities/urban-farmers.jpg')` }} />
          <CommunityContent>
            <CommunityBadge>Active</CommunityBadge>
            <CommunityTitle>Detroit Urban Farmers</CommunityTitle>
            <CommunityDescription>
              Growing community through urban agriculture, sustainability education, and food justice initiatives.
            </CommunityDescription>
            <MemberCount>112 members</MemberCount>
            <TagsContainer>
              <Tag>urban agriculture</Tag>
              <Tag>sustainability</Tag>
              <Tag>food justice</Tag>
            </TagsContainer>
            <CommunityLink href="/communities/detroit-urban-farmers">
              View Community →
            </CommunityLink>
          </CommunityContent>
        </CommunityCard>
      </CommunityGrid>
      
      <StartCommunityContainer>
        <StartCommunityContent>
          <StartCommunityTitle>Start Your Community</StartCommunityTitle>
          <StartCommunityDescription>
            Have a vision for bringing people together? Create a community on Renaissance City to organize events, showcase projects, and connect with like-minded individuals.
          </StartCommunityDescription>
          <StartCommunityButton href="/communities/new">
            Create a Community
          </StartCommunityButton>
        </StartCommunityContent>
      </StartCommunityContainer>
    </Section>
  );
};

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



// Community Section Styles
const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CommunityCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CommunityImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #333;
  
  @media (max-width: 480px) {
    height: 180px;
  }
`;

const CommunityContent = styled.div`
  padding: 1.5rem;
  position: relative;
  
  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const CommunityBadge = styled.div`
  display: inline-block;
  background-color: rgba(144, 202, 249, 0.1);
  color: #90caf9;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CommunityTitle = styled.h3`
  font-size: 1.4rem;
  color: #f5f5f5;
  margin: 0 0 0.75rem 0;
  font-weight: 600;
`;

const CommunityDescription = styled.p`
  color: #b0b0b0;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const MemberCount = styled.div`
  color: #90caf9;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

const Tag = styled.span`
  background-color: #333;
  color: #b0b0b0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
`;

const CommunityLink = styled.a`
  display: inline-block;
  color: #90caf9;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #bbdefb;
    text-decoration: underline;
  }
`;

const StartCommunityContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2.5rem;
  text-align: center;
  border: 1px dashed #444;
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const StartCommunityContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const StartCommunityTitle = styled.h3`
  font-size: 1.5rem;
  color: #f5f5f5;
  margin-bottom: 1rem;
`;

const StartCommunityDescription = styled.p`
  color: #b0b0b0;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const StartCommunityButton = styled.a`
  display: inline-block;
  background-color: #90caf9;
  color: #121212;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #bbdefb;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

export const SectionDescription = styled.p`
  color: #b0b0b0;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

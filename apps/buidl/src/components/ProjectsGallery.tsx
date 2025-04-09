import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaCalendarAlt } from 'react-icons/fa';

export const ProjectsGallery = () => {
  return (
    <Section>
      <SectionTitle>
        <FaCalendarAlt style={{ marginRight: '12px' }} />
        Deployed Projects
      </SectionTitle>
      <ProjectGrid>
        <ProjectCard>
          <ProjectImage
            style={{
              backgroundImage: `url('https://dpop.nyc3.digitaloceanspaces.com/uploads/resized/800w/oOVcomL9Ybez4Tzt2cFIPSwjZ0o0J88ewsM78ie1.png')`,
            }}
          />
          <ProjectContent>
            <ProjectTitle>Art Night Detroit</ProjectTitle>
            <ProjectDescription>
              A nonprofit event series supporting local creators through
              collaborative documentation and reinvestment in community
              projects.
            </ProjectDescription>
            <ProjectLink href="https://artnightdetroit.com" target="_blank">
              Visit Website →
            </ProjectLink>
          </ProjectContent>
        </ProjectCard>
        <ProjectCard>
          <ProjectImage
            style={{
              backgroundImage: `url('/images/digital-renaissance-hands.jpg')`,
            }}
          />
          <ProjectContent>
            <ProjectTitle>A Regenerative Art Collective</ProjectTitle>
            <ProjectDescription>
              A digital showcase of Detroit&apos;s creative ecosystem,
              featuring artwork, projects, and upcoming events from local
              artists.
            </ProjectDescription>
            <ProjectLink
              href="https://renaissance.gods.work/"
              target="_blank"
            >
              Explore Gallery →
            </ProjectLink>
          </ProjectContent>
        </ProjectCard>
        <ProjectCard>
          <ProjectImage
            style={{ backgroundImage: `url('/images/community.jpg')` }}
          />
          <ProjectContent>
            <ProjectTitle>Launch Your Project</ProjectTitle>
            <ProjectDescription>
              Have an idea for a community initiative? Use our platform to
              organize, promote, and grow your creative project in Detroit.
            </ProjectDescription>
            <ProjectLink href="/projects/new">Get Started →</ProjectLink>
          </ProjectContent>
        </ProjectCard>
      </ProjectGrid>
    </Section>
  );
};

const Section = styled.section`
  padding: 4rem 0;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 0;
  }
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: #f5f5f5;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 1.25rem;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

const ProjectCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #333;
  
  @media (max-width: 480px) {
    height: 180px;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  
  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: #f5f5f5;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #cccccc;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 1.25rem;
  }
`;

const ProjectLink = styled(Link)`
  color: #90caf9;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

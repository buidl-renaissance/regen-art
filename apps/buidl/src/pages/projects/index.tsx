import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { ProjectCard, ProjectStatus } from '@gods.work/projects';
import { Project } from '@gods.work/projects';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { ComingSoon } from '@gods.work/ui';
import router from 'next/router';

export async function getServerSideProps() {
  // In a real implementation, you would fetch this data from your API
  // This is just mock data for demonstration
  const projects: Project[] = [
    {
      id: '1',
      title: 'Community Art Wall',
      description: 'A collaborative mural project bringing together local artists to transform blank walls into vibrant public art displays throughout Detroit neighborhoods.',
      category: 'Art & Culture',
      location: 'Eastern Market',
      imageUrl: '/images/projects/art-wall.jpg',
      websiteUrl: 'https://communityartwall.org',
      status: ProjectStatus.ACTIVE,
      tags: ['mural', 'community', 'public art'],
      slug: 'community-art-wall'
    },
    {
      id: '2',
      title: 'Tech Mentorship Program',
      description: 'Connecting tech professionals with underserved youth to provide coding education, career guidance, and hands-on experience with technology projects.',
      category: 'Technology',
      location: 'Midtown',
      imageUrl: '/images/projects/tech-mentorship.jpg',
      status: ProjectStatus.ACTIVE,
      tags: ['education', 'coding', 'youth'],
      slug: 'tech-mentorship-program'
    },
    {
      id: '3',
      title: 'Urban Garden Initiative',
      description: 'Transforming vacant lots into productive community gardens that provide fresh produce and educational opportunities for neighborhood residents.',
      category: 'Environment',
      location: 'North End',
      imageUrl: '/images/projects/urban-garden.jpg',
      websiteUrl: 'https://detroitgrows.org',
      status: ProjectStatus.ACTIVE,
      tags: ['gardening', 'sustainability', 'food'],
      slug: 'urban-garden-initiative'
    },
    {
      id: '4',
      title: 'Music Production Workshop',
      description: 'Weekly workshops teaching music production skills to aspiring artists, providing access to equipment and mentorship from industry professionals.',
      category: 'Music',
      location: 'Corktown',
      status: ProjectStatus.ACTIVE,
      tags: ['music', 'production', 'education'],
      slug: 'music-production-workshop'
    },
    {
      id: '5',
      title: 'Neighborhood Cleanup Collective',
      description: 'Regular community cleanup events focused on beautifying neighborhoods and fostering community pride and ownership.',
      category: 'Community Building',
      location: 'Various Locations',
      imageUrl: '/images/projects/cleanup.jpg',
      status: ProjectStatus.ACTIVE,
      tags: ['cleanup', 'environment', 'community'],
      slug: 'neighborhood-cleanup-collective'
    },
    {
      id: '6',
      title: 'Youth Leadership Academy',
      description: 'A program designed to develop leadership skills in Detroit youth through workshops, community service, and mentorship opportunities.',
      category: 'Education',
      location: 'Downtown',
      status: ProjectStatus.ACTIVE,
      tags: ['youth', 'leadership', 'education'],
      slug: 'youth-leadership-academy'
    }
  ];

  return {
    props: {
      projects,
      theme: 'dark',
      metadata: {
        title: 'Community Projects | Art Night Detroit',
        description: 'Explore community projects and initiatives in Detroit\'s creative ecosystem.',
      },
    },
  };
}

const ProjectsPage = ({ projects }: { projects: Project[] }) => {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(projects.map(project => project.category))];

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory, projects]);

  
  return (
    <Container>
      <ComingSoon />
    </Container>
  )
  

  return (
    <Container>
      <Head>
        <title>Community Projects | Art Night Detroit</title>
        <meta name="description" content="Explore community projects and initiatives in Detroit's creative ecosystem." />
      </Head>

      <Header>
        <Title>Community Projects</Title>
        <Subtitle>Explore initiatives shaping Detroit&apos;s future</Subtitle>
        <CreateProjectButton href="/projects/new">
          <FaPlus style={{ marginRight: '8px' }} /> Create Project
        </CreateProjectButton>
      </Header>

      <CategoryFilter>
        {categories.map(category => (
          <CategoryButton 
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilter>

      <ProjectsGrid>
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => {
              router.push(`/projects/${project.slug}`);
            }}
          />
        ))}
      </ProjectsGrid>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #f5f5f5;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 1.5rem;
`;

const CreateProjectButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: #90caf9;
  color: #121212;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  position: absolute;
  right: 0;
  top: 0;
  
  &:hover {
    background-color: #64b5f6;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  background-color: ${props => props.active ? '#90caf9' : 'rgba(144, 202, 249, 0.2)'};
  color: ${props => props.active ? '#121212' : '#90caf9'};
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#64b5f6' : 'rgba(144, 202, 249, 0.3)'};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

export default ProjectsPage;

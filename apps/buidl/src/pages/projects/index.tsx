import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { ProjectCard } from '@gods.work/ui';
import router from 'next/router';
import { Creation } from '@gods.work/create';
import { CreateClient } from '@gods.work/clients';

export async function getServerSideProps() {
  // Initialize the CreateClient to fetch data from the database
  const createClient = new CreateClient();
  const creations = await createClient.listCreations();

  return {
    props: {
      creations,
      theme: 'dark',
      metadata: {
        title: 'Community Projects | Art Night Detroit',
        description: 'Explore community projects and initiatives in Detroit\'s creative ecosystem.',
      },
    },
  };
}

const ProjectsPage = ({ creations }: { creations: Creation[] }) => {
  const [filteredCreations, setFilteredCreations] = useState<Creation[]>(creations);
  const [activeType, setActiveType] = useState('All');

  const types = ['All', ...new Set(creations.map(creation => creation.type))];

  useEffect(() => {
    if (activeType === 'All') {
      setFilteredCreations(creations);
    } else {
      setFilteredCreations(creations.filter(creation => creation.type === activeType));
    }
  }, [activeType, creations]);

  
  // return (
  //   <Container>
  //     <ComingSoon />
  //   </Container>
  // )
  

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
        {types.map(type => (
          <CategoryButton 
            key={type}
            active={activeType === type}
            onClick={() => type && setActiveType(type)}
          >
            {type}
          </CategoryButton>
        ))}
      </CategoryFilter>

      <ProjectsGrid>
        {filteredCreations.map(creation => (
          <ProjectCard
            key={creation.id}
            project={creation}
            onClick={() => {
              router.push(`/projects/${creation.slug}`);
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

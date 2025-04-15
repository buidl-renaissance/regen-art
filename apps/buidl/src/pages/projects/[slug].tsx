import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaArrowLeft, FaGithub, FaGlobe, FaEdit, FaUsers, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
// import { getProjectBySlug } from '@gods.work/utils';
import { ButtonLink } from '@gods.work/ui';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactEmail: string;
  imageUrl: string;
  websiteUrl: string;
  githubUrl: string;
  createdAt: string;
  updatedAt: string;
  members: number;
  status: 'active' | 'completed' | 'planning';
}

export async function getServerSideProps({ params }: { params: { slug: string } }) {
  try {
    // const project = await getProjectBySlug(params.slug);
    const project = {
      id: "1",
      slug: params.slug,
      title: "Detroit Community Platform",
      description: "An open-source platform connecting Detroit's creative communities, managing events, and showcasing local projects. Built with Next.js, TypeScript, and modern web technologies.",
      category: "Web Development",
      location: "Detroit, MI",
      contactEmail: "hello@buidldetroit.com",
      imageUrl: "https://dpop.nyc3.digitaloceanspaces.com/projects/detroit-platform.jpg",
      websiteUrl: "https://buidldetroit.com",
      githubUrl: "https://github.com/buidl-renaissance/regen-art",
      createdAt: "2023-09-15T12:00:00Z",
      updatedAt: "2023-11-20T15:30:00Z",
      members: 12,
      status: "active" as const
    };
    
    if (!project) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        project,
      },
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return {
      notFound: true,
    };
  }
}

export default function ProjectDetailPage({ project }: { project: Project }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <LoadingContainer>Loading project details...</LoadingContainer>;
  }
  
  if (!project) {
    return (
      <Container>
        <Head>
          <title>Project Not Found | BUIDL Detroit</title>
        </Head>
        <ErrorContainer>
          <h1>Project Not Found</h1>
          <p>The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <BackLink href="/projects">← Back to Projects</BackLink>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Head>
        <title>{project.title} | BUIDL Detroit</title>
        <meta name="description" content={project.description.substring(0, 160)} />
      </Head>
      
      <BackButtonContainer>
        <BackLink href="/projects">
          <FaArrowLeft /> Back to Projects
        </BackLink>
      </BackButtonContainer>
      
      {project.imageUrl && (
        <ProjectImage 
          src={project.imageUrl} 
          alt={project.title} 
        />
      )}
      
      <ProjectHeader>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectCategory>{project.category}</ProjectCategory>
        
        <ProjectMeta>
          <MetaItem>
            <FaUsers /> {project.members || 0} Contributors
          </MetaItem>
          {project.location && (
            <MetaItem>
              <FaMapMarkerAlt /> {project.location}
            </MetaItem>
          )}
          <MetaItem>
            <FaCalendarAlt /> Created {new Date(project.createdAt).toLocaleDateString()}
          </MetaItem>
          <StatusBadge status={project.status || 'active'}>
            {project.status || 'Active'}
          </StatusBadge>
        </ProjectMeta>
      </ProjectHeader>
      
      <ContentSection>
        <ProjectDescription>
          {project.description}
        </ProjectDescription>
        
        <ActionButtons>
          {project.githubUrl && (
            <ActionButton href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <FaGithub /> View on GitHub
            </ActionButton>
          )}
          {project.websiteUrl && (
            <ActionButton href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
              <FaGlobe /> Visit Website
            </ActionButton>
          )}
          <ActionButton href={`/projects/${project.slug}/edit`} secondary>
            <FaEdit /> Edit Project
          </ActionButton>
        </ActionButtons>
      </ContentSection>
      
      <ContactSection>
        <SectionTitle>Get Involved</SectionTitle>
        <p>Interested in contributing to this project? Contact the project team:</p>
        {project.contactEmail && (
          <ContactLink href={`mailto:${project.contactEmail}`}>
            {project.contactEmail}
          </ContactLink>
        )}
      </ContactSection>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #f5f5f5;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: #f5f5f5;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
    color: #b0b0b0;
  }
`;

const BackButtonContainer = styled.div`
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;
  gap: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const ProjectHeader = styled.div`
  margin-bottom: 2rem;
`;

const ProjectTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const ProjectCategory = styled.div`
  display: inline-block;
  background-color: rgba(74, 144, 226, 0.2);
  color: #4a90e2;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  color: #b0b0b0;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  
  background-color: ${({ status }) => {
    switch (status) {
      case 'active':
        return 'rgba(39, 174, 96, 0.2)';
      case 'completed':
        return 'rgba(74, 144, 226, 0.2)';
      case 'planning':
        return 'rgba(242, 153, 74, 0.2)';
      default:
        return 'rgba(39, 174, 96, 0.2)';
    }
  }};
  
  color: ${({ status }) => {
    switch (status) {
      case 'active':
        return '#27AE60';
      case 'completed':
        return '#4A90E2';
      case 'planning':
        return '#F2994A';
      default:
        return '#27AE60';
    }
  }};
`;

const ContentSection = styled.div`
  margin-bottom: 3rem;
`;

const ProjectDescription = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  white-space: pre-wrap;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled(ButtonLink)<{ secondary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  
  background-color: ${props => props.secondary ? 'transparent' : '#4a90e2'};
  color: ${props => props.secondary ? '#4a90e2' : 'white'};
  border: ${props => props.secondary ? '1px solid #4a90e2' : 'none'};
  
  &:hover {
    background-color: ${props => props.secondary ? 'rgba(74, 144, 226, 0.1)' : '#357ABD'};
  }
`;

const ContactSection = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ContactLink = styled.a`
  color: #4a90e2;
  text-decoration: none;
  display: inline-block;
  margin-top: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

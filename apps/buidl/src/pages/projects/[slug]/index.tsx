import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaGithub,
  FaGlobe,
  FaEdit,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
// import { getProjectBySlug } from '@gods.work/utils';
import { ButtonLink } from '@gods.work/ui';
import { Creation } from '@gods.work/create';
import { CreateClient } from '@gods.work/clients';
export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const createClient = new CreateClient();
    const creation = await createClient.getCreationBySlug(params.slug);

    if (!creation) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        creation,
      },
    };
  } catch (error) {
    console.error('Error fetching creation:', error);
    return {
      notFound: true,
    };
  }
}

export default function CreationDetailPage({
  creation,
}: {
  creation: Creation;
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingContainer>Loading project details...</LoadingContainer>;
  }

  if (!creation) {
    return (
      <Container>
        <Head>
          <title>Creation Not Found | BUIDL Detroit</title>
        </Head>
        <ErrorContainer>
          <h1>Creation Not Found</h1>
          <p>
            The creation you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <BackLink href="/projects">← Back to Projects</BackLink>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Head>
        <title>{creation.title} | BUIDL Detroit</title>
        <meta
          name="description"
          content={creation.description.substring(0, 160)}
        />
      </Head>

      <BackButtonContainer>
        <BackLink href="/projects">
          <FaArrowLeft /> Back to Projects
        </BackLink>
      </BackButtonContainer>

      {creation.imageUrl && (
        <ProjectImage src={creation.imageUrl} alt={creation.title} />
      )}

      <ProjectHeader>
        <ProjectTitle>{creation.title}</ProjectTitle>
        <ProjectCategory>{creation.category}</ProjectCategory>

        <ProjectMeta>
          {/* <MetaItem>
            <FaUsers /> {creation.members || 0} Contributors
          </MetaItem> */}
          {creation.location && (
            <MetaItem>
              <FaMapMarkerAlt /> {creation.location}
            </MetaItem>
          )}
          <MetaItem>
            <FaCalendarAlt /> Created{' '}
            {creation.createdAt ? new Date(creation.createdAt).toLocaleDateString() : 'N/A'}
          </MetaItem>
          <StatusBadge status={creation.status || 'active'}>
            {creation.status || 'Active'}
          </StatusBadge>
        </ProjectMeta>
      </ProjectHeader>

      <ContentSection>
        <ProjectDescription>{creation.description}</ProjectDescription>

        <ActionButtons>
          {/* {creation.githubUrl && (
            <ActionButton href={creation.githubUrl} target="_blank" rel="noopener noreferrer">
              <FaGithub /> View on GitHub
            </ActionButton>
          )} */}
          {creation.url && (
            <ActionButton
              href={creation.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe /> Visit Website
            </ActionButton>
          )}
          <ActionButton href={`/projects/${creation.slug}/edit`} secondary>
            <FaEdit /> Edit Project
          </ActionButton>
        </ActionButtons>
      </ContentSection>

      {/* <ContactSection>
        <SectionTitle>Get Involved</SectionTitle>
        <p>Interested in contributing to this project? Contact the project team:</p>
        {creation.contactEmail && (
          <ContactLink href={`mailto:${creation.contactEmail}`}>
            {creation.contactEmail}
          </ContactLink>
        )}
      </ContactSection> */}
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

  background-color: ${(props) => (props.secondary ? 'transparent' : '#4a90e2')};
  color: ${(props) => (props.secondary ? '#4a90e2' : 'white')};
  border: ${(props) => (props.secondary ? '1px solid #4a90e2' : 'none')};

  &:hover {
    background-color: ${(props) =>
      props.secondary ? 'rgba(74, 144, 226, 0.1)' : '#357ABD'};
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

import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import {
  FaComments,
  FaUsers,
  FaCode,
  FaLaptopCode,
  FaLightbulb,
  FaPlus,
} from 'react-icons/fa';
import {
  StepContent,
  StepDescription,
  StepLink,
  StepNumber,
  StepTitle,
} from '../../components/Styles';

const ForumPage = () => {
  return (
    <Container>
      <Head>
        <title>BUIDL Detroit Forum - Connect with Builders</title>
        <meta
          name="description"
          content="Join the BUIDL Detroit forum to connect with developers, share ideas, and collaborate on projects that empower Detroit's creative ecosystem."
        />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>BUIDL Detroit Forum</HeroTitle>
          <HeroSubtitle>
            Connect, Collaborate, and Create with Detroit Builders
          </HeroSubtitle>
          <HeroDescription>
            A space for developers, designers, and creators to share ideas, ask
            questions, and collaborate on projects that strengthen
            Detroit&apos;s digital infrastructure.
          </HeroDescription>
          <HeroCTA>
            <PrimaryButton href="/forum/new">
              <FaPlus style={{ marginRight: '8px' }} /> Start a Discussion
            </PrimaryButton>
            <SecondaryButton href="/forum/categories">
              <FaComments style={{ marginRight: '8px' }} /> Browse Categories
            </SecondaryButton>
          </HeroCTA>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>
          <FaComments style={{ marginRight: '12px' }} />
          Recent Discussions
        </SectionTitle>
        <ThreadGrid>
          {recentThreads.map((thread) => (
            <ThreadCard key={thread.id}>
              <ThreadHeader>
                <ThreadTitle>{thread.title}</ThreadTitle>
                <ThreadMeta>
                  <ThreadAuthor>{thread.author}</ThreadAuthor>
                  <ThreadDate>{thread.date}</ThreadDate>
                </ThreadMeta>
              </ThreadHeader>
              <ThreadPreview>{thread.preview}</ThreadPreview>
              <ThreadFooter>
                <ThreadCategory>{thread.category}</ThreadCategory>
                <ThreadStats>
                  <ThreadStat>{thread.replies} replies</ThreadStat>
                  <ThreadStat>{thread.views} views</ThreadStat>
                </ThreadStats>
              </ThreadFooter>
            </ThreadCard>
          ))}
        </ThreadGrid>
        <MoreLink href="/forum/all">View all discussions →</MoreLink>
      </Section>

      <Section>
        <SectionTitle>
          <FaUsers style={{ marginRight: '12px' }} />
          Active Communities
        </SectionTitle>
        <CategoryGrid>
          {forumCategories.map((category) => (
            <CategoryCard
              key={category.id}
              href={`/forum/categories/${category.slug}`}
            >
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryContent>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryDescription>
                  {category.description}
                </CategoryDescription>
                <CategoryStats>
                  {category.threads} threads • {category.posts} posts
                </CategoryStats>
              </CategoryContent>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </Section>

      <Section>
        <SectionContainer>
          <SectionTitle>
            <FaLightbulb style={{ marginRight: '12px' }} />
            Get Involved
          </SectionTitle>
          <StepsContainer>
            <Step>
              <StepNumber>1</StepNumber>
              <StepContent>
                <StepTitle>Create Your Profile</StepTitle>
                <StepDescription>
                  Join the BUIDL Detroit community by creating your developer
                  profile. Share your skills, interests, and the projects
                  you&apos;re working on.
                </StepDescription>
                <StepLink href="/profile">Create Profile →</StepLink>
              </StepContent>
            </Step>
            <Step>
              <StepNumber>2</StepNumber>
              <StepContent>
                <StepTitle>Join the Conversation</StepTitle>
                <StepDescription>
                  Introduce yourself in the community forum, ask questions, and
                  share your knowledge with other Detroit builders.
                </StepDescription>
                <StepLink href="/forum/categories/introductions">
                  Introduce Yourself →
                </StepLink>
              </StepContent>
            </Step>
            <Step>
              <StepNumber>3</StepNumber>
              <StepContent>
                <StepTitle>Contribute to Projects</StepTitle>
                <StepDescription>
                  Find open-source projects that match your skills and
                  interests, or propose new ideas for community collaboration.
                </StepDescription>
                <StepLink href="/projects">Explore Projects →</StepLink>
              </StepContent>
            </Step>
          </StepsContainer>
        </SectionContainer>
      </Section>
    </Container>
  );
};

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 1rem;
`;

// Mock data for recent threads
const recentThreads = [
  {
    id: 1,
    title: 'Building a Community Events API',
    author: 'devDetroit',
    date: '2 hours ago',
    preview:
      "I'm working on an API to aggregate community events across Detroit. Looking for feedback on the data model...",
    category: 'Project Collaboration',
    replies: 12,
    views: 87,
  },
  {
    id: 2,
    title: 'React vs. Svelte for Community Projects',
    author: 'techBuilder',
    date: 'Yesterday',
    preview:
      "What are people's thoughts on using Svelte instead of React for new community projects? I've been experimenting with...",
    category: 'Technical Discussion',
    replies: 24,
    views: 156,
  },
  {
    id: 3,
    title: 'Introducing Myself: Frontend Dev from Eastern Market',
    author: 'newCoder313',
    date: '2 days ago',
    preview:
      "Hey everyone! I'm a frontend developer based in Eastern Market. I specialize in React and have been working on...",
    category: 'Introductions',
    replies: 8,
    views: 42,
  },
  {
    id: 4,
    title: 'Detroit Digital Inclusion Hackathon',
    author: 'communityOrg',
    date: '3 days ago',
    preview:
      "We're organizing a hackathon focused on digital inclusion projects for Detroit neighborhoods. Looking for participants and mentors...",
    category: 'Events',
    replies: 18,
    views: 203,
  },
];

// Mock data for forum categories
const forumCategories = [
  {
    id: 1,
    title: 'Project Collaboration',
    slug: 'project-collaboration',
    description:
      "Find collaborators or join existing projects building Detroit's digital infrastructure.",
    icon: <FaCode />,
    threads: 42,
    posts: 187,
  },
  {
    id: 2,
    title: 'Technical Discussions',
    slug: 'technical-discussions',
    description:
      'Discuss technologies, frameworks, and technical challenges in your projects.',
    icon: <FaLaptopCode />,
    threads: 68,
    posts: 312,
  },
  {
    id: 3,
    title: 'Community Announcements',
    slug: 'community-announcements',
    description:
      'Updates, events, and important information for the BUIDL Detroit community.',
    icon: <FaUsers />,
    threads: 24,
    posts: 96,
  },
  {
    id: 4,
    title: 'Ideas & Proposals',
    slug: 'ideas-proposals',
    description:
      'Share your ideas for new projects or improvements to existing community tools.',
    icon: <FaLightbulb />,
    threads: 37,
    posts: 145,
  },
];

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Hero = styled.div`
  padding: 4rem 0;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  color: #3498db;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #c0c0c0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeroCTA = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: #2c2c2c;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3c3c3c;
  }
`;

const Section = styled.section`
  padding: 3rem 0;
  border-top: 1px solid #2c2c2c;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  color: #f5f5f5;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const ThreadGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ThreadCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ThreadHeader = styled.div`
  margin-bottom: 1rem;
`;

const ThreadTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #f5f5f5;
`;

const ThreadMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #a0a0a0;
`;

const ThreadAuthor = styled.span``;

const ThreadDate = styled.span``;

const ThreadPreview = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #c0c0c0;
  margin-bottom: 1rem;
`;

const ThreadFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ThreadCategory = styled.span`
  background-color: #2c2c2c;
  color: #3498db;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ThreadStats = styled.div`
  display: flex;
  gap: 1rem;
`;

const ThreadStat = styled.span`
  font-size: 0.9rem;
  color: #a0a0a0;
`;

const MoreLink = styled(Link)`
  display: block;
  text-align: right;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(Link)`
  display: flex;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CategoryIcon = styled.div`
  font-size: 2rem;
  color: #3498db;
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const CategoryContent = styled.div`
  flex: 1;
`;

const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  color: #f5f5f5;
  margin-bottom: 0.5rem;
`;

const CategoryDescription = styled.p`
  font-size: 0.9rem;
  color: #c0c0c0;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const CategoryStats = styled.div`
  font-size: 0.8rem;
  color: #a0a0a0;
`;

export default ForumPage;

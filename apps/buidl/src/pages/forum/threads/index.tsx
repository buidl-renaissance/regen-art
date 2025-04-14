import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { FaComments, FaPlus } from 'react-icons/fa';
import { ForumThread, getThreads } from '@gods.work/forum';
import { ThreadGrid } from '../../../components/ThreadGrid';
import {
  Container,
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroCTA,
  Section,
  SectionTitle,
  SectionContainer,
} from '../../../components/Styles';
import Link from 'next/link';
import { PrimaryButton } from '../../../components/Styled/Buttons';

interface ThreadsPageProps {
  threads: ForumThread[];
}

export const getServerSideProps = async () => {
  const threads = await getThreads();
  return {
    props: { threads },
  };
};

const ThreadsPage = ({ threads }: ThreadsPageProps) => {
  return (
    <Container>
      <Head>
        <title>Forum Discussions | BUIDL Detroit</title>
        <meta
          name="description"
          content="Browse all discussions in the BUIDL Detroit forum. Join the conversation and connect with Detroit's developer community."
        />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Forum Discussions</HeroTitle>
          <HeroSubtitle>
            Browse all conversations in the BUIDL Detroit community
          </HeroSubtitle>
          <HeroCTA>
            <PrimaryButton href="/forum/threads/new">
              <FaPlus style={{ marginRight: '8px' }} /> Start a Discussion
            </PrimaryButton>
          </HeroCTA>
        </HeroContent>
      </Hero>

      <Section>
        <SectionContainer>
          <SectionTitle>
            <FaComments style={{ marginRight: '12px' }} />
            All Discussions
          </SectionTitle>
          {threads.length > 0 ? (
            <ThreadGrid threads={threads} />
          ) : (
            <EmptyState>
              <p>No discussions have been started yet.</p>
              <Link href="/forum/threads/new">
                <EmptyStateButton>Start the first discussion</EmptyStateButton>
              </Link>
            </EmptyState>
          )}
        </SectionContainer>
      </Section>
    </Container>
  );
};

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin: 2rem 0;

  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    color: #aaa;
  }
`;

const EmptyStateButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

export default ThreadsPage;

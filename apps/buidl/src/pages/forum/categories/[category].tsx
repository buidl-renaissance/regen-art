import React from 'react';
import { Container } from '../../../components/Styles';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import { ForumThread, getCategoryBySlug, getThreads } from '@gods.work/forum';
import { FaPlus } from 'react-icons/fa';
import {
  SectionContainer,
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroCTA,
  Section,
} from '../../../components/Styles';
import { ThreadGrid } from '../../../components/ThreadGrid';

interface CategoryPageProps {
  category: {
    id: number;
    name: string;
    description: string;
    slug: string;
  };
  threads: ForumThread[];
}

const CategoryPage = ({ category, threads }: CategoryPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Hero>
        <HeroContent>
          <HeroTitle>{category.name}</HeroTitle>
          <HeroSubtitle>{category.description}</HeroSubtitle>
          {/* <HeroCTA>
            <NewThreadButton href="/forum/threads/new">
              <FaPlus style={{ marginRight: '0.5rem' }} /> New Thread
            </NewThreadButton>
          </HeroCTA> */}
        </HeroContent>
      </Hero>

      <Section>
        <SectionContainer>
          {threads.length > 0 ? (
            <ThreadGrid threads={threads} />
          ) : (
            <EmptyState>
              <p>No threads in this category yet.</p>
              <Link href="/forum/threads/new">
                <EmptyStateButton>Start the first thread</EmptyStateButton>
              </Link>
            </EmptyState>
          )}
        </SectionContainer>
      </Section>
    </Container>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { category: string };
}) {
  try {
    const category = await getCategoryBySlug(params.category);

    if (!category) {
      return {
        notFound: true,
      };
    }

    const threads = await getThreads({ categoryId: category.id });

    return {
      props: {
        category,
        threads,
      },
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return {
      notFound: true,
    };
  }
}

const NewThreadButton = styled.a`
  display: flex;
  align-items: center;
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s;
  font-family: 'Courier New', monospace;

  &:hover {
    background-color: #2980b9;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #1e1e1e;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  width: 100%;

  p {
    margin-bottom: 1.5rem;
    color: #aaa;
    font-size: 1.1rem;
  }
`;

const EmptyStateButton = styled.a`
  display: inline-block;
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

export default CategoryPage;

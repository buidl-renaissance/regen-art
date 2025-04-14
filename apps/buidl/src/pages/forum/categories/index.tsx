import React from 'react';
import { Container } from '@gods.work/ui';
import styled from 'styled-components';
import Link from 'next/link';
import { ForumCategory, getCategories } from '@gods.work/forum';
import {
  FaComments,
  FaCode,
  FaQuestion,
  FaCalendarAlt,
  FaBriefcase,
} from 'react-icons/fa';
import {
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroCTA,
} from '../../../components/Styles';

interface ForumCategoriesPageProps {
  categories: ForumCategory[];
}

const ForumCategoriesPage = ({ categories }: ForumCategoriesPageProps) => {
  // Add icons to categories if they don't have them
  const categoriesWithIcons = categories.map((category) => {
    if (category.icon) return category;

    // Default icons based on category slug
    let icon;
    switch (category.slug) {
      case 'general':
        icon = <FaComments />;
        break;
      case 'project-collaboration':
        icon = <FaCode />;
        break;
      case 'questions':
        icon = <FaQuestion />;
        break;
      case 'events':
        icon = <FaCalendarAlt />;
        break;
      case 'jobs':
        icon = <FaBriefcase />;
        break;
      default:
        icon = <FaComments />;
    }

    return { ...category, icon };
  });

  return (
    <Container>
      <Hero>
        <HeroContent>
          <HeroTitle>Forum Categories</HeroTitle>
          <HeroSubtitle>Browse discussions by topic or start a new thread</HeroSubtitle>
          <HeroCTA>
            <NewThreadButton href="/forum/new">Start New Thread</NewThreadButton>
          </HeroCTA>
        </HeroContent>
      </Hero>

      <CategoriesGrid>
        {categoriesWithIcons.map((category) => (
          <Link href={`/forum/categories/${category.slug}`} key={category.id}>
            <CategoryCard>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryContent>
                <CategoryTitle>{category.name}</CategoryTitle>
                <CategoryDescription>
                  {category.description}
                </CategoryDescription>
                {/* <CategoryStats>
                  <StatItem>{category.threads} threads</StatItem>
                  <StatItem>{category.posts} posts</StatItem>
                </CategoryStats> */}
              </CategoryContent>
            </CategoryCard>
          </Link>
        ))}
      </CategoriesGrid>
    </Container>
  );
};

export const getServerSideProps = async () => {
  const categories = await getCategories();
  return {
    props: { categories },
  };
};

const NewThreadButton = styled.a`
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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem auto;
  max-width: 1200px;
  padding: 0 2rem;
`;

const CategoryCard = styled.div`
  display: flex;
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #2c2c2c;
  font-family: 'Courier New', monospace;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border-color: #3498db;
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

const CategoryTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;

  a {
    color: #f5f5f5;
    text-decoration: none;

    &:hover {
      color: #3498db;
    }
  }
`;

const CategoryDescription = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const CategoryStats = styled.div`
  display: flex;
  font-size: 0.8rem;
  color: #777;
`;

const StatItem = styled.span`
  margin-right: 1rem;
`;

export default ForumCategoriesPage;

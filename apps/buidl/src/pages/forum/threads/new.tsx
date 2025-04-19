import React from 'react';
import { Container } from '@gods.work/ui';
import { ForumPostCreate } from '../../../components/ForumPostCreate';
import { SectionContainer } from '..';
import { getCategories } from '@gods.work/forum';

const ForumNewPage = ({ categories }: { categories: any[] }) => {
  const handleSubmit = (postData: {
    title: string;
    content: string;
    category: string;
    tags: string[];
  }) => {
    console.log(postData);
  };

  return (
    <Container>
      <SectionContainer>
        <ForumPostCreate onSubmit={handleSubmit} />
      </SectionContainer>
    </Container>
  );
};

export const getServerSideProps = async () => {
  const categories = await getCategories();
  return {
    props: { categories },
  };
};

export default ForumNewPage;

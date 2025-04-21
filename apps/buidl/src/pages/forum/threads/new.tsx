import React from 'react';
import { Container } from '@gods.work/ui';
import { ForumPostCreate } from '../../../components/ForumPostCreate';
import { SectionContainer } from '..';
import { getCategories, ForumThread } from '@gods.work/forum';
import { useRouter } from 'next/router';

const ForumNewPage = ({ categories }: { categories: any[] }) => {
  const router = useRouter();

  const handleSubmit = (thread: ForumThread) => {
    router.push(`/forum/threads/${thread.slug}`);
  };

  return (
    <Container>
      <SectionContainer>
        <ForumPostCreate onSubmit={handleSubmit} categories={categories} />
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

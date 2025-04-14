import React from 'react';
import { Container } from '@gods.work/ui';
import { ForumPostCreate } from '../../components/ForumPostCreate';
import { SectionContainer } from '.';

const ForumNewPage = () => {
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

export default ForumNewPage;

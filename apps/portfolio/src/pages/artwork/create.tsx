'use client';

import styled from 'styled-components';
import { useRouter } from 'next/router';
import { ArtworkForm } from '@gods.work/ui';
import { Artwork } from '@gods.work/utils';

const StyledPage = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

export default function CreateArtworkPage() {
  const router = useRouter();
  
  const handleArtworkCreated = (artwork: Artwork) => {
    // Redirect to the artwork page or gallery after successful creation
    router.push('/artwork');
  };

  return (
    <StyledPage>
      <PageTitle>Create New Artwork</PageTitle>
      <ArtworkForm onSuccess={handleArtworkCreated} />
    </StyledPage>
  );
}


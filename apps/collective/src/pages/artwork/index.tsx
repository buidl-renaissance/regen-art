import React from 'react';
import styled from '@emotion/styled';
import { Artwork, getArtworks } from '@gods.work/utils';
import { ArtworkCard } from '@gods.work/ui';
import { Metadata } from 'next';
import {
  BackButtonContainer,
  BackLink,
  Header,
  Subtitle,
  Title,
} from '../../app/components/Styled';

export const metadata: Metadata = {
  title: 'Artwork | Art Night Detroit',
  description:
    'Explore the artwork created by the artists of Art Night Detroit',
};

const ArtworksPage = ({ artworks }: { artworks: Artwork[] }) => {
  return (
    <PageWrapper>
      <BackButtonContainer>
        <BackLink href="/">← Back to Home</BackLink>
      </BackButtonContainer>
      <Header>
        <Title>Artwork</Title>
        <Subtitle>
          Explore the artwork created by the artists of Art Night Detroit
        </Subtitle>
      </Header>
      <ArtworkGrid>
        {artworks.map((artwork: Artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </ArtworkGrid>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
`;

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

export async function getServerSideProps() {
  const artworks = await getArtworks();

  return {
    props: {
      artworks,
      metadata,
    },
  };
}

export default ArtworksPage;

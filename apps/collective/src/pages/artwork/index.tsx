import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Artwork, getArtworks } from '@gods.work/utils';
import { ArtworkCard, ArtworkFormModal } from '@gods.work/ui';
import { Metadata } from 'next';
import {
  BackButtonContainer,
  BackLink,
  Header,
  Subtitle,
  Title,
} from '../../app/components/Styled';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Artwork | Art Night Detroit',
  description:
    'Explore the artwork created by the artists of Art Night Detroit',
};

const ArtworksPage = ({ artworks: initialArtworks }: { artworks: Artwork[] }) => {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArtworkCreated = (newArtwork: Artwork) => {
    setArtworks([...artworks, newArtwork]);
  };

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
          <Link href={`/artwork/${artwork.slug}`} key={artwork.id}>
            <ArtworkCard artwork={artwork} />
          </Link>
        ))}
        <AddArtworkCard onClick={() => setIsModalOpen(true)}>
          <PlusIcon>+</PlusIcon>
          <AddText>Add New Artwork</AddText>
        </AddArtworkCard>
      </ArtworkGrid>

      <ArtworkFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleArtworkCreated}
      />
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

const AddArtworkCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #f9f9f9;

  &:hover {
    border-color: #666;
    background-color: #f0f0f0;
  }
`;

const PlusIcon = styled.div`
  font-size: 3rem;
  font-weight: 300;
  color: #666;
  margin-bottom: 1rem;
`;

const AddText = styled.p`
  font-size: 1.2rem;
  color: #666;
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

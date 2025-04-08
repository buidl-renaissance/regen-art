import { useState } from 'react';
import styled from 'styled-components';
import { Artwork } from '@gods.work/utils';
import { ArtworkCard, ArtworkFormModal } from '@gods.work/ui';

interface ArtworkGalleryProps {
  artworks: Artwork[];
  onArtworkCreated?: (artwork: Artwork) => void;
}

const ArtworkGallery = ({ artworks, onArtworkCreated }: ArtworkGalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArtworkCreated = (artwork: Artwork) => {
    if (onArtworkCreated) {
      onArtworkCreated(artwork);
    }
  };

  return (
    <>
      <ArtworkGrid>
        {artworks.map((artwork: Artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
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
    </>
  );
};

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const AddArtworkCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  border: 2px dashed #96885f;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: rgba(150, 136, 95, 0.1);
  }

  @media (max-width: 768px) {
    border-radius: 6px;
    height: 200px;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const PlusIcon = styled.div`
  font-size: 3rem;
  font-weight: 300;
  color: #96885f;
  margin-bottom: 1rem;
`;

const AddText = styled.p`
  font-size: 1.2rem;
  color: #96885f;
`;

export default ArtworkGallery;
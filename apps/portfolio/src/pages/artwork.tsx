'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArtworkModal from '../app/components/artwork-modal';
import { ArtworkFormModal, ArtworkCard, ArtworkCardClickableContainer } from '@gods.work/ui';
import { Artwork } from '@/packages/utils/src/lib/interfaces';
import { getArtworks } from '@/packages/utils/src/lib/dpop';

const StyledPage = styled.div`
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ArtworkTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const ArtworkContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

const CategoryTab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => (props.active ? '#96885f' : 'transparent')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: 2px solid #96885f;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? '#96885f' : 'rgba(150, 136, 95, 0.2)'};
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border-width: 1px;
  }
`;

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

export default function ArtworkPage({ artworks }: { artworks: Artwork[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleArtworks, setVisibleArtworks] = useState<Artwork[]>(artworks);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const categories = ['all', ...new Set(artworks?.map(artwork => artwork.data?.category).filter((a: string | undefined) => a))];

  const filteredArtwork = selectedCategory === 'all'
    ? visibleArtworks
    : visibleArtworks.filter(artwork => artwork.data?.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const openModal = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < filteredArtwork?.length) {
      setCurrentIndex(newIndex);
      setSelectedArtwork(filteredArtwork[newIndex]);
    }
  };

  const handleArtworkCreated = (artwork: Artwork) => {
    setVisibleArtworks([...visibleArtworks, artwork]);
  };

  return (
    <StyledPage>
      <ArtworkContainer>
        <ArtworkTitle>Artwork</ArtworkTitle>
        
        {/* <CategoryTabs>
          {categories.map(category => (
            <CategoryTab
              key={category}
              active={selectedCategory === category}
              onClick={() => handleCategoryChange(category)}
            >
              {category?.charAt(0).toUpperCase() + category?.slice(1)}
            </CategoryTab>
          ))}
        </CategoryTabs> */}
        
        <ArtworkGrid>
          {filteredArtwork.map((artwork) => (
            <ArtworkCardClickableContainer key={artwork.id} onClick={() => openModal(artwork)}>
              <ArtworkCard artwork={artwork} />
            </ArtworkCardClickableContainer>
          ))}
          <AddArtworkCard onClick={() => setIsModalOpen(true)}>
            <PlusIcon>+</PlusIcon>
            <AddText>Add New Artwork</AddText>
          </AddArtworkCard>
        </ArtworkGrid>
      </ArtworkContainer>
      
      {selectedArtwork && (
        <ArtworkModal
          isOpen={!!selectedArtwork}
          onClose={closeModal}
          currentImage={selectedArtwork}
          artworks={filteredArtwork}
          currentIndex={filteredArtwork.indexOf(selectedArtwork)}
          onNavigate={handleNavigate}
        />
      )}

      <ArtworkFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleArtworkCreated}
      />
    </StyledPage>
  );
}

export const getServerSideProps = async () => {
  const artworks = await getArtworks({
    artist_id: parseInt(process.env.DPOP_ARTIST_ID ?? '0'),
    limit: 100,
  });
  return {
    props: { artworks },
  };
};

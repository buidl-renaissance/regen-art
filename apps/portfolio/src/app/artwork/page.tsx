'use client';

import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import ArtworkModal from '../artwork-modal';
import { ARTWORKS } from '../mock';
import { ArtworkItem } from '../interfaces';

const StyledPage = styled.div`
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ArtworkContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const ArtworkTitle = styled.h2`
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

const ArtworkCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    border-radius: 6px;
    
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const ArtworkImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ArtworkInfo = styled.div`
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ArtworkName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
`;

const ArtworkMedium = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ArtworkYear = styled.p`
  font-size: 0.9rem;
  color: #888;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export default function ArtworkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
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
  
  const categories = ['all', ...new Set(ARTWORKS.map(item => item.category))];

  const filteredArtwork = selectedCategory === 'all'
    ? ARTWORKS
    : ARTWORKS.filter(item => item.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const openModal = (artwork: ArtworkItem) => {
    setSelectedArtwork(artwork);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < filteredArtwork.length) {
      setCurrentIndex(newIndex);
      setSelectedArtwork(filteredArtwork[newIndex]);
    }
  };

  return (
    <StyledPage>
      <ArtworkContainer>
        <ArtworkTitle>Artwork</ArtworkTitle>
        
        <CategoryTabs>
          {categories.map(category => (
            <CategoryTab
              key={category}
              active={selectedCategory === category}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </CategoryTab>
          ))}
        </CategoryTabs>
        
        <ArtworkGrid>
          {filteredArtwork.map((artwork) => (
            <ArtworkCard key={artwork.title} onClick={() => openModal(artwork)}>
              <ArtworkImage src={artwork.url} alt={artwork.title} />
              <ArtworkInfo>
                <ArtworkName>{artwork.title}</ArtworkName>
                <ArtworkMedium>{artwork.category}</ArtworkMedium>
              </ArtworkInfo>
            </ArtworkCard>
          ))}
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
    </StyledPage>
  );
}

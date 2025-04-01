'use client';

import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import ArtworkModal from './artwork-modal';
import { ArtworkItem } from './interfaces';
import { ARTWORKS } from './mock';

interface GalleryProps {
  title?: string;
}

const artworks = ARTWORKS;

const Gallery: FC<GalleryProps> = ({ title = 'Performance Art' }) => {
  const categories = [
    'All',
    ...new Set(artworks.map((artwork) => artwork.category)),
  ];
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<ArtworkItem | null>(null);
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

  const filteredArtworks =
    activeCategory === 'All'
      ? artworks
      : artworks.filter((artwork) => artwork.category === activeCategory);

  const handleArtworkClick = (artwork: ArtworkItem, index: number) => {
    setCurrentImage(artwork);
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < filteredArtworks.length) {
      setCurrentIndex(newIndex);
      setCurrentImage(filteredArtworks[newIndex]);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <GalleryContainer>
      <GalleryTitle>{title}</GalleryTitle>
      <CategoryTabs>
        {categories.map((category, index) => (
          <CategoryTab
            key={index}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </CategoryTab>
        ))}
      </CategoryTabs>
      <GalleryGrid>
        {filteredArtworks.map((artwork, index) => (
          <ArtworkCard
            key={index}
            onClick={() => handleArtworkClick(artwork, index)}
          >
            <ArtworkImage src={artwork.url} alt={artwork.title} />
            <ArtworkInfo>
              <ArtworkTitle>{artwork.title}</ArtworkTitle>
              <ArtworkDescription>{artwork.description}</ArtworkDescription>
            </ArtworkInfo>
          </ArtworkCard>
        ))}
      </GalleryGrid>

      <ArtworkModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        currentImage={currentImage}
        artworks={filteredArtworks}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
      />
    </GalleryContainer>
  );
};

export default Gallery;

const GalleryContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const GalleryTitle = styled.h2`
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

const GalleryGrid = styled.div`
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
  height: 350px;
  object-fit: cover;
  display: block;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ArtworkInfo = styled.div`
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const ArtworkTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 0 0.3rem;
  }
`;

const ArtworkDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.4;
  }
`;

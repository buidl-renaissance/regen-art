'use client';

import { FC, useState } from 'react';
import styled from 'styled-components';
import ArtworkModal from './artwork-modal';
import { ArtworkItem } from './interfaces';

const GalleryContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GalleryTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CategoryTab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.active ? '#96885f' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#333'};
  border: 2px solid #96885f;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#96885f' : 'rgba(150, 136, 95, 0.2)'};
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
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
`;

const ArtworkImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  display: block;
`;

const ArtworkInfo = styled.div`
  padding: 1.5rem;
`;

const ArtworkTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: #333;
`;

const ArtworkDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
`;

interface GalleryProps {
  title?: string;
}

const artworks: ArtworkItem[] = [
  {
    "title": "Handing Meat, Ashby",
    "filename": "burg_handingmeat_ashby.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/burg_handingmeat_ashby.jpg?fit=695%2C1024&ssl=1",
    "description": "A surreal performance photograph featuring a figure offering raw meat, evoking themes of ritual and transformation.",
    "category": "Ritual Performance"
  },
  {
    "title": "Untitled (IMG_0191)",
    "filename": "IMG_0191.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/IMG_0191.jpg?fit=1024%2C991&ssl=1",
    "description": "Two figures interact in a dense sculptural environment, drawing on costume and gesture to express tension.",
    "category": "Sculptural Performance"
  },
  {
    "title": "Untitled (IMG_0187)",
    "filename": "IMG_0187.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/IMG_0187.jpg?fit=795%2C1024&ssl=1",
    "description": "A solo figure stands in a constructed scene, dressed in hybrid organic-material costume, mid-performance.",
    "category": "Sculptural Performance"
  },
  {
    "title": "Untitled (IMG_0172)",
    "filename": "IMG_0172.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/IMG_0172.jpg?fit=855%2C1024&ssl=1",
    "description": "Theatrical posture and saturated textures blend human and environmental elements in this performance still.",
    "category": "Sculptural Performance"
  },
  {
    "title": "Untitled (IMG_0166)",
    "filename": "IMG_0166.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/IMG_0166.jpg?fit=775%2C1024&ssl=1",
    "description": "Organic costume and suspended elements create tension between levity and weight, dream and decay.",
    "category": "Sculptural Performance"
  },
  {
    "title": "Untitled (IMG_0160)",
    "filename": "IMG_0160.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/IMG_0160.jpg?fit=1024%2C669&ssl=1",
    "description": "A low-angle shot highlights the sculptural body's confrontation with space and gravity.",
    "category": "Sculptural Performance"
  },
  {
    "title": "Red Wing Legs, Kilpatrick",
    "filename": "burg_redwinglegs_kilpatrick-scaled.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/burg_redwinglegs_kilpatrick-scaled.jpg?fit=780%2C1024&ssl=1",
    "description": "A striking performance piece featuring red wings, exploring flight, constraint, and transformation.",
    "category": "Body Art"
  },
  {
    "title": "Mountain Life, Vallejo",
    "filename": "burg_mountainlife_vallejohighres-scaled.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/burg_mountainlife_vallejohighres-scaled.jpg?fit=755%2C1024&ssl=1",
    "description": "Earth-toned costume and naturalistic surroundings present a mythic figure grounded in place.",
    "category": "Environmental Performance"
  },
  {
    "title": "Meat, Ashby",
    "filename": "burg_meat_ashby-scaled.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/burg_meat_ashby-scaled.jpg?fit=710%2C1024&ssl=1",
    "description": "A raw, corporeal display of meat and body, invoking primal connections to ritual and survival.",
    "category": "Ritual Performance"
  },
  {
    "title": "Eye in Cloud, Vallejo",
    "filename": "burg_eyeincloud_vallejo-scaled.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/burg_eyeincloud_vallejo-scaled.jpg?fit=661%2C1024&ssl=1",
    "description": "A lone figure merges with cloudy surroundings, exploring themes of vision, opacity, and dream-state.",
    "category": "Environmental Performance"
  },
  {
    "title": "Detroit Girl",
    "filename": "burg_detroitgirl.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/burg_detroitgirl.jpg?fit=1013%2C1024&ssl=1",
    "description": "A striking feminine figure wrapped in urban mythos, evoking Detroit identity through surrealism.",
    "category": "Urban Performance"
  },
  {
    "title": "Albino Crow, Vallejo",
    "filename": "burg_albinocrow_vallejolowres.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/burg_albinocrow_vallejolowres.jpg?fit=696%2C834&ssl=1",
    "description": "A haunting, pale avian character suggests death, mutation, and the unseen within the natural world.",
    "category": "Character Performance"
  },
  {
    "title": "Hanging Trust",
    "filename": "hangingtrusthighres-scaled.jpg",
    "url": "https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/hangingtrusthighres-scaled.jpg?fit=690%2C1024&ssl=1",
    "description": "A suspended figure in a vulnerable pose, exploring themes of dependency, support, and faith.",
    "category": "Body Art"
  }
];

const Gallery: FC<GalleryProps> = ({ title = "Performance Art" }) => {
  const categories = ["All", ...new Set(artworks.map(artwork => artwork.category))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<ArtworkItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const filteredArtworks = activeCategory === "All" 
    ? artworks 
    : artworks.filter(artwork => artwork.category === activeCategory);

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
            <ArtworkImage 
              src={artwork.url} 
              alt={artwork.title} 
            />
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

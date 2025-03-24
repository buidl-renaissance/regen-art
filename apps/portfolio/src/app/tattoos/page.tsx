'use client';

import { FC, useState } from 'react';
import styled from 'styled-components';
import ArtworkModal from '../artwork-modal';
import { TATTOOS } from '../mock';
import { ArtworkItem, TattooItem } from '../interfaces';

const StyledPage = styled.div`
`;

const TattooContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TattooTitle = styled.h2`
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
`;

const TattooGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const TattooCard = styled.div`
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

const TattooImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  display: block;
`;

const TattooInfo = styled.div`
  padding: 1.5rem;
`;

const TattooName = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: #333;
`;

const TattooDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
`;

const InquirySection = styled.div`
  margin-top: 4rem;
  text-align: center;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 8px;
`;

const InquiryTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const InquiryText = styled.p`
  margin-bottom: 1.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const InquiryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #96885f;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background-color: #7a6e4e;
    transform: translateY(-2px);
  }
`;

const tattoos: TattooItem[] = TATTOOS;

const categories = [
  'All',
  'Traditional',
  'Japanese',
  'Geometric',
  'Floral',
  'Blackwork',
  'Watercolor',
];

const TattoosPage: FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTattoo, setCurrentTattoo] = useState<TattooItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredTattoos =
    activeCategory === 'All'
      ? tattoos
      : tattoos.filter((tattoo) => tattoo.category === activeCategory);

  const handleTattooClick = (tattoo: TattooItem) => {
    const index = filteredTattoos.findIndex(
      (item) => item.title === tattoo.title
    );
    setCurrentTattoo(tattoo);
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < filteredTattoos.length) {
      setCurrentIndex(newIndex);
      setCurrentTattoo(filteredTattoos[newIndex]);
    }
  };

  return (
    <StyledPage>
      <TattooContainer>
        <TattooTitle>Tattoo Gallery</TattooTitle>

        <CategoryTabs>
          {categories.map((category) => (
            <CategoryTab
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </CategoryTab>
          ))}
        </CategoryTabs>

        <TattooGrid>
          {TATTOOS.map((tattoo, index) => (
            <TattooCard key={index} onClick={() => handleTattooClick(tattoo)}>
              <TattooImage src={tattoo.url} alt={tattoo.title} />
              <TattooInfo>
                <TattooName>{tattoo.title}</TattooName>
                <TattooDescription>{tattoo.description}</TattooDescription>
              </TattooInfo>
            </TattooCard>
          ))}
        </TattooGrid>
      </TattooContainer>

      <InquirySection>
        <InquiryTitle>Interested in getting a tattoo?</InquiryTitle>
        <InquiryText>
          Whether you have a specific design in mind or would like to
          collaborate on a custom piece, I'd love to hear from you. Please reach
          out to discuss your ideas, pricing, and availability.
        </InquiryText>
        <InquiryButton>Book a Consultation</InquiryButton>
      </InquirySection>

      <ArtworkModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentImage={currentTattoo as ArtworkItem}
        artworks={filteredTattoos as ArtworkItem[]}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
      />
    </StyledPage>
  );
};

export default TattoosPage;

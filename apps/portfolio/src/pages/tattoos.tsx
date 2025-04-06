'use client';

import { FC, useState } from 'react';
import styled from 'styled-components';
import ArtworkModal from '../app/components/artwork-modal';
import { TATTOOS } from '../app/mock';
import { Artwork } from '@gods.work/utils';
import { ArtworkCard, ArtworkCardClickableContainer } from '@gods.work/ui';
import PageLayout, { PageContainer } from '../app/components/page-layout';

const tattoos: Artwork[] = TATTOOS;

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
  const [currentTattoo, setCurrentTattoo] = useState<Artwork | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredTattoos =
    activeCategory === 'All'
      ? tattoos
      : tattoos.filter((tattoo) => tattoo.data?.category === activeCategory);

  const handleTattooClick = (tattoo: Artwork) => {
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
    <PageLayout
      title="Tattoo Gallery"
      backLink={{
        href: '/',
        text: 'Back to Home',
      }}
    >
      <PageContainer>
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
            <ArtworkCardClickableContainer
              key={index}
              onClick={() => handleTattooClick(tattoo)}
            >
              <ArtworkCard artwork={tattoo} />
            </ArtworkCardClickableContainer>
          ))}
        </TattooGrid>
      </PageContainer>

      <InquirySection>
        <InquiryTitle>Interested in getting a tattoo?</InquiryTitle>
        <InquiryText>
          Whether you have a specific design in mind or would like to
          collaborate on a custom piece, I&apos;d love to hear from you. Please
          reach out to discuss your ideas, pricing, and availability.
        </InquiryText>
        <InquiryButton>Book a Consultation</InquiryButton>
      </InquirySection>

      <ArtworkModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentArtwork={currentTattoo as Artwork}
        artworks={filteredTattoos as Artwork[]}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
      />
    </PageLayout>
  );
};

export default TattoosPage;

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

const TattooGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const InquirySection = styled.div`
  margin-top: 4rem;
  text-align: center;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 8px;

  @media (max-width: 768px) {
    margin-top: 2rem;
    padding: 1.5rem 1rem;
    border-radius: 6px;
  }
`;

const InquiryTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
  }
`;

const InquiryText = styled.p`
  margin-bottom: 1.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
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

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

'use client';

import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Artwork } from '@gods.work/utils';
import { convertDefaultToResized } from '@gods.work/utils';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &.visible {
    opacity: 1;
  }
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ImageInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${ModalContent}:hover & {
    transform: translateY(0);
  }
`;

const ImageTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1.2rem;
`;

const ImageDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const ImageCategory = styled.span`
  display: inline-block;
  margin-top: 5px;
  padding: 3px 8px;
  background-color: #96885f;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  &.prev {
    left: 20px;
  }
  
  &.next {
    right: 20px;
  }
`;

interface ArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentArtwork: Artwork | null;
  artworks: Artwork[];
  currentIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const ArtworkModal: FC<ArtworkModalProps> = ({
  isOpen,
  onClose,
  currentArtwork,
  artworks,
  currentIndex,
  onNavigate
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow for animation
      setTimeout(() => setIsVisible(true), 10);
      
      // Add event listener for escape key
      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') onNavigate('prev');
        if (e.key === 'ArrowRight') onNavigate('next');
      };
      
      window.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
      
      return () => {
        window.removeEventListener('keydown', handleEscKey);
        document.body.style.overflow = '';
      };
    } else {
      setIsVisible(false);
    }
  }, [isOpen, onClose, onNavigate]);
  
  if (!isOpen || !currentArtwork) return null;
  
  return (
    <ModalOverlay 
      className={isVisible ? 'visible' : ''} 
      onClick={onClose}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalImage src={convertDefaultToResized(currentArtwork.data?.image ?? '')} alt={currentArtwork.title} />
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <ImageInfo>
          <ImageTitle>{currentArtwork.title}</ImageTitle>
          <ImageDescription>{currentArtwork.description}</ImageDescription>
          <ImageCategory>{currentArtwork.data?.category}</ImageCategory>
        </ImageInfo>
        
        {currentIndex > 0 && (
          <NavigationButton 
            className="prev" 
            onClick={() => onNavigate('prev')}
          >
            ‹
          </NavigationButton>
        )}
        
        {currentIndex < artworks.length - 1 && (
          <NavigationButton 
            className="next" 
            onClick={() => onNavigate('next')}
          >
            ›
          </NavigationButton>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ArtworkModal;



import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to allow for animation
      setTimeout(() => setIsVisible(true), 10);
      
      // Add event listener for escape key
      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
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
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <ModalOverlay 
      className={isVisible ? 'visible' : ''} 
      onClick={onClose}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {title && <ModalHeader>{title}</ModalHeader>}
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &.visible {
    opacity: 1;
  }
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

export default Modal;

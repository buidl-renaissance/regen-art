import React from 'react';
import styled from 'styled-components';

interface ComingSoonProps {
    message?: string;
    description?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
    message = "Coming Soon",
    description = "We're working on something awesome. Check back later!"
}) => {
  return (
    <Container>
      <Message>{message}</Message>
      <Description>{description}</Description>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  width: 100%;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    min-height: 50vh;
    padding: 1rem;
  }
`;

const Message = styled.h2`
  font-family: 'Courier New', monospace;
  font-size: 3rem;
  color: #f5f5f5;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  color: #cccccc;
  text-align: center;
  max-width: 80%;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
`;

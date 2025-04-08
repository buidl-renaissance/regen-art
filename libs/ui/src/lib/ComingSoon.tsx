import React from 'react';
import styled from 'styled-components';

export const ComingSoon: React.FC = () => {
  return (
    <Container>
      <Message>Coming Soon</Message>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  width: 100%;
  padding: 2rem;
`;

const Message = styled.h2`
  font-family: 'Courier New', monospace;
  font-size: 3rem;
  color: #f5f5f5;
  text-align: center;
  text-transform: uppercase;
`;

'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { submitEventRsvp } from '@gods.work/utils';

interface RSVPButtonProps {
  eventSlug: string;
}

const RSVPButton = ({ eventSlug }: RSVPButtonProps) => {
  const [isRSVPing, setIsRSVPing] = useState(false);
  const [hasRSVPed, setHasRSVPed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRSVP = async () => {
    try {
      setIsRSVPing(true);
      setError(null);
      
      const result = await submitEventRsvp(eventSlug);
      
      if (result.success) {
        setHasRSVPed(true);
      } else {
        setError(result.message || 'Failed to RSVP. Please try again.');
      }
    } catch (err) {
      console.error('RSVP error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsRSVPing(false);
    }
  };

  return (
    <>
      <StyledRSVPButton 
        onClick={handleRSVP} 
        disabled={isRSVPing || hasRSVPed}
      >
        {isRSVPing ? 'Processing...' : hasRSVPed ? 'Registered' : 'Register'}
      </StyledRSVPButton>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

const StyledRSVPButton = styled.button`
  background: #FF3366;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover:not(:disabled) {
    background: #E62E5C;
  }
  
  &:disabled {
    background: ${props => props.children === 'RSVP Confirmed!' ? '#4CAF50' : '#999'};
    cursor: ${props => props.children === 'RSVP Confirmed!' ? 'default' : 'not-allowed'};
  }
`;

const ErrorMessage = styled.div`
  color: #FF3366;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

export default RSVPButton;

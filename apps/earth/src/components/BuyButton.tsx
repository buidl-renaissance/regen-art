'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import { TicketType } from '@gods.work/ticketing';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

// Predefined ticket types for the event
const defaultTicketTypes: TicketType[] = [
  {
    id: 'general-event-1',
    name: 'General Admission',
    description: 'Standard entry to Arts For The Earth',
    price: 20,
    available: 200,
    sold: 0,
    reserved: 0,
    remaining: 200,
  }
];

const BuyButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // For simplicity, we're using a fixed quantity of 1 for the general admission ticket
      const lineItems = [{
        ticketTypeId: defaultTicketTypes[0].id,
        quantity: 1,
      }];
      
      // Create checkout session
      const response = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: '1', // Fixed event ID for Arts For The Earth
          items: lineItems,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }
      
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        console.error('Stripe checkout error:', error);
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const StyledButton = styled.button`
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #4ade80, #22c55e);
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: bold;
    font-size: 1rem;
    font-family: var(--font-cambria);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    width: auto;
    min-width: 180px;
    max-width: 250px;
    transition: all 0.3s;
    box-shadow: 0 0 20px rgba(74, 222, 128, 0.5),
      0 10px 15px -3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `;
  
  return (
    <StyledButton onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Buy Tickets'}
    </StyledButton>
  );
};

export default BuyButton;

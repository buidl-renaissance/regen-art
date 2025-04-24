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
  },
];

const BuyButton = ({ dark = false }: { dark?: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      // For simplicity, we're using a fixed quantity of 1 for the general admission ticket
      const lineItems = [
        {
          ticketTypeId: defaultTicketTypes[0].id,
          quantity: 1,
        },
      ];

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

  const StyledButton = styled.button<{ dark?: boolean }>`
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.75rem 1.5rem;
    background: ${(props) =>
      props.dark
        ? 'linear-gradient(135deg, #5C5C3D, #4A4433)'
        : 'linear-gradient(135deg, #4ade80, #22c55e)'};
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
    box-shadow: ${(props) =>
      props.dark
        ? '0 0 20px rgba(92, 92, 61, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)'
        : '0 0 20px rgba(74, 222, 128, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)'};
    cursor: pointer;
    animation: pulse 2s infinite;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);

    @keyframes pulse {
      0% {
        box-shadow: ${(props) =>
          props.dark
            ? '0 0 20px rgba(92, 92, 61, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)'
            : '0 0 20px rgba(74, 222, 128, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)'};
      }
      50% {
        box-shadow: ${(props) =>
          props.dark
            ? '0 0 30px rgba(92, 92, 61, 0.8), 0 10px 20px -3px rgba(0, 0, 0, 0.3)'
            : '0 0 30px rgba(74, 222, 128, 0.8), 0 10px 20px -3px rgba(0, 0, 0, 0.3)'};
      }
      100% {
        box-shadow: ${(props) =>
          props.dark
            ? '0 0 20px rgba(92, 92, 61, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)'
            : '0 0 20px rgba(74, 222, 128, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.2)'};
      }
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: ${(props) =>
        props.dark
          ? '0 0 30px rgba(92, 92, 61, 0.9), 0 15px 20px -5px rgba(0, 0, 0, 0.3)'
          : '0 0 30px rgba(74, 222, 128, 0.9), 0 15px 20px -5px rgba(0, 0, 0, 0.3)'};
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      animation: none;
    }

    @media (max-width: 640px) {
      font-size: 0.875rem;
      padding: 0.625rem 1.25rem;
      min-width: 150px;
      max-width: 200px;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      padding: 0.75rem 1rem;
      min-width: 120px;
      max-width: 180px;
      letter-spacing: 0.03em;
    }
  `;
  return (
    <StyledButton onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Buy Tickets'}
    </StyledButton>
  );
};

export default BuyButton;

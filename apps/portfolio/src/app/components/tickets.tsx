'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { TicketType, TicketedEvent } from '@gods.work/ticketing';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

interface TicketsProps {
  event: TicketedEvent;
  ticketTypes: TicketType[];
}

const Tickets: React.FC<TicketsProps> = ({ event, ticketTypes }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    ticketTypes.reduce((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {})
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (ticketId: string, change: number) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(0, prev[ticketId] + change);
      const ticket = ticketTypes.find((t) => t.id === ticketId);

      if (ticket && newQuantity <= ticket.available) {
        return { ...prev, [ticketId]: newQuantity };
      }
      return prev;
    });
  };

  const calculateTotal = () => {
    return ticketTypes.reduce((total, ticket) => {
      return total + ticket.price * (quantities[ticket.id] || 0);
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      // Create line items for Stripe checkout
      const lineItems = ticketTypes
        .filter((ticket) => quantities[ticket.id] > 0)
        .map((ticket) => ({
          ticketTypeId: ticket.id,
          eventId: event.id,
          price_data: {
            currency: 'usd',
            product_data: {
              name: ticket.name,
              description: ticket.description,
            },
            unit_amount: ticket.price * 100, // Stripe uses cents
          },
          quantity: quantities[ticket.id],
        }));

      // Create checkout session
      const response = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event.id,
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

  const totalTickets = Object.values(quantities).reduce(
    (sum, qty) => sum + qty,
    0
  );

  return (
    <TicketsContainer>
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}

      <EventInfo>
        <EventTitle>{event.title}</EventTitle>
        <EventDate>{event.date}</EventDate>
      </EventInfo>

      <TicketList>
        {ticketTypes.map((ticket) => (
          <TicketItem key={ticket.id}>
            <TicketInfo>
              <TicketName>{ticket.name}</TicketName>
              <TicketDescription>{ticket.description}</TicketDescription>
              <TicketPrice>${ticket.price}</TicketPrice>
              <TicketAvailability>
                {ticket.remaining} tickets available
              </TicketAvailability>
            </TicketInfo>
            <TicketActions>
              <QuantitySelector>
                <QuantityButton
                  onClick={() => handleQuantityChange(ticket.id, -1)}
                  disabled={quantities[ticket.id] <= 0}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>{quantities[ticket.id] || 0}</QuantityDisplay>
                <QuantityButton
                  onClick={() => handleQuantityChange(ticket.id, 1)}
                  disabled={quantities[ticket.id] >= ticket.available - ticket.sold}
                >
                  +
                </QuantityButton>
              </QuantitySelector>
              <AddToCartButton
                onClick={() => handleQuantityChange(ticket.id, 1)}
                disabled={quantities[ticket.id] >= ticket.available - ticket.sold}
              >
                Add
              </AddToCartButton>
            </TicketActions>
          </TicketItem>
        ))}
      </TicketList>

      {totalTickets > 0 && (
        <TotalSection>
          <TotalAmount>Total: ${calculateTotal()}</TotalAmount>
          <CheckoutButton onClick={handleCheckout} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Checkout'}
          </CheckoutButton>
        </TotalSection>
      )}
    </TicketsContainer>
  );
};

export default Tickets;


const TicketsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Teko', sans-serif;
`;

const EventInfo = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const EventTitle = styled.h2`
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const EventDate = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TicketItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TicketInfo = styled.div`
  flex: 1;
`;

const TicketName = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const TicketDescription = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`;

const TicketPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`;

const TicketAvailability = styled.p`
  font-size: 0.9rem;
  color: #888;
`;

const TicketActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.2rem;
  min-width: 30px;
  text-align: center;
`;

const AddToCartButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-family: 'Teko', sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const TotalSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalAmount = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
`;

const CheckoutButton = styled.button`
  background-color: #96885f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 2rem;
  font-family: 'Teko', sans-serif;
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #7a6e4e;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #96885f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
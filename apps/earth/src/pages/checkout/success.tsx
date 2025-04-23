import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import { CheckoutSession } from '@gods.work/ticketing';
import axios from 'axios';

const SuccessContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 5rem 3rem;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(5, 13, 5, 0.9),
    rgba(10, 42, 10, 0.9)
  );

  @media (min-width: 1024px) {
    padding: 6rem 4rem;
    border-radius: 12px;
    margin-top: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const SuccessHeader = styled.div`
  margin-bottom: 3rem;

  @media (min-width: 1024px) {
    margin-bottom: 4rem;
  }
`;

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #48984c;

  @media (min-width: 1024px) {
    font-size: 3.5rem;
    letter-spacing: 0.05em;
    text-shadow: 0 0 10px rgba(72, 152, 76, 0.3);
  }
`;

const SuccessMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #ffffff;

  @media (min-width: 1024px) {
    font-size: 1.4rem;
    max-width: 80%;
    margin: 0 auto 2rem;
    line-height: 1.8;
  }
`;

const OrderDetails = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 3rem;
  border-radius: 12px;
  text-align: left;
  position: relative;
  overflow: hidden;

  @media (min-width: 1024px) {
    padding: 3rem;
    margin: 4rem auto;
    max-width: 80%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, #a7f3d0 0%, #6ee7b7 100%);

    @media (min-width: 1024px) {
      height: 6px;
    }
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;

  @media (min-width: 1024px) {
    font-size: 1.2rem;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
  }

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;

  @media (min-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const DetailValue = styled.span`
  @media (min-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const ReturnButton = styled(Link)`
  display: inline-block;
  background-color: #96885f;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (min-width: 1024px) {
    padding: 1rem 2.5rem;
    font-size: 1.2rem;
    border-radius: 6px;
    margin-top: 1rem;
  }

  &:hover {
    background-color: #7a6e4e;
    transform: translateY(-2px);
  }
`;

const MarketingSection = styled.div`
  margin-top: 3rem;
  border-radius: 12px;
  color: #ffffff;
  text-align: left;
  position: relative;
  overflow: hidden;

  @media (min-width: 1024px) {
    margin-top: 5rem;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
`;

const MarketingTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #d1fae5;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-shadow: 0 0 8px rgba(209, 250, 229, 0.6),
    0 0 15px rgba(74, 222, 128, 0.4);

  @media (min-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
    letter-spacing: 0.08em;
  }
`;

const MarketingText = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;

  @media (min-width: 1024px) {
    font-size: 1.25rem;
    line-height: 2;
    margin-bottom: 2rem;
  }

  strong {
    color: #a7f3d0;
    font-weight: 700;
  }
`;

const EventHighlights = styled.ul`
  list-style-type: none;
  padding-left: 1rem;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.75rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
    padding-left: 2rem;
  }
`;

const HighlightItem = styled.li`
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;
  transition: transform 0.2s ease;

  @media (min-width: 1024px) {
    font-size: 1.2rem;
    padding-left: 2rem;
    margin-bottom: 1rem;
  }

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #a7f3d0;
    font-size: 1.2rem;

    @media (min-width: 1024px) {
      font-size: 1.5rem;
    }
  }

  &:hover {
    transform: translateX(5px);
    color: #a7f3d0;
  }
`;

export default function CheckoutSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (session_id) {
      fetchSessionDetails();
    }
  }, [session_id]);

  const fetchSessionDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/checkout/session?session_id=${session_id}`
      );
      setSession(response.data);
    } catch (err) {
      console.error('Error fetching session details:', err);
      setError('Unable to load order details. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SuccessContainer>
        <SuccessMessage>Loading order details...</SuccessMessage>
      </SuccessContainer>
    );
  }

  if (error) {
    return (
      <SuccessContainer>
        <SuccessTitle>Something went wrong</SuccessTitle>
        <SuccessMessage>{error}</SuccessMessage>
        <ReturnButton href="/tickets">Return to Tickets</ReturnButton>
      </SuccessContainer>
    );
  }

  return (
    <SuccessContainer>
      <SuccessHeader>
        <SuccessTitle>Payment Successful!</SuccessTitle>
        <SuccessMessage>
          Thank you for your purchase. Your tickets have been confirmed and will
          be sent to your email shortly.
        </SuccessMessage>
      </SuccessHeader>

      {session && (
        <OrderDetails>
          {/* <DetailRow>
            <DetailLabel>Order ID:</DetailLabel>
            <DetailValue>{session.sessionId}</DetailValue>
          </DetailRow> */}
          <DetailRow>
            <DetailLabel>Event:</DetailLabel>
            <DetailValue>{'Art Exhibition'}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Total Amount:</DetailLabel>
            <DetailValue>${Number(session.total).toFixed(2)}</DetailValue>
          </DetailRow>
          {/* <DetailRow>
            <DetailLabel>Status:</DetailLabel>
            <DetailValue>{session.status === 'completed' ? 'Confirmed' : session.status}</DetailValue>
          </DetailRow> */}
        </OrderDetails>
      )}

      <MarketingSection>
        <MarketingTitle>
          🌿🎨 ARTS FOR THE EARTH 🌍✨
        </MarketingTitle>
        <MarketingText style={{ textAlign: 'center' }}>APRIL 26, 2025</MarketingText>
        <MarketingText style={{ textAlign: 'center' }}>2804 WIGHT ST, DETROIT, MI</MarketingText>
        <MarketingText>
          We are made of water and gifted with the beauty of life by our Mother
          Earth. Let&apos;s come together to celebrate our planet by giving back
          to her in a day full of creativity, music, and community support!
        </MarketingText>
        <MarketingText>12p - 2a</MarketingText>
        <MarketingText>
          Our Great Lakes surrounding our Beautiful State need our support to
          keep them clean and the wildlife alive! join us for a vibrant
          celebration of creativity, sustainability, and community healing at
          #ArtsForTheEarth. This special fundraiser is dedicated to raising our
          vibration, honoring the Earth, and supporting environmental
          organizations working to protect the planet.
        </MarketingText>
        <MarketingText>
          <strong>What to Expect:</strong>
        </MarketingText>
        <EventHighlights>
          <HighlightItem>Live Music & DJs</HighlightItem>
          <HighlightItem>Live Art & Nature-Inspired Gallery</HighlightItem>
          <HighlightItem>Vendor Market & Food</HighlightItem>
          <HighlightItem>Recycled Crafts & Flower Crowns</HighlightItem>
          <HighlightItem>Crystals & Natural Herbs</HighlightItem>
          <HighlightItem>Interactive 5x5 Community Canvas</HighlightItem>
          <HighlightItem>
            Creation Station with Coloring Pages and Canvas&apos;s-while
            supplies last
          </HighlightItem>
          <HighlightItem>Exclusive Tattoo Experiences</HighlightItem>
          <HighlightItem>
            Raffle Prizes, including an Earth Honoring Tattoo
          </HighlightItem>
        </EventHighlights>
      </MarketingSection>
    </SuccessContainer>
  );
}

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import { CheckoutSession } from '@gods.work/ticketing';
import axios from 'axios';

const SuccessContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
`;

const SuccessHeader = styled.div`
  margin-bottom: 2rem;
`;

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2e7d32;
`;

const SuccessMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const OrderDetails = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
`;

const DetailValue = styled.span``;

const ReturnButton = styled(Link)`
  display: inline-block;
  background-color: #96885f;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #7a6e4e;
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
      const response = await axios.get(`/api/checkout/session?session_id=${session_id}`);
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
          Thank you for your purchase. Your tickets have been confirmed and will be sent to your email shortly.
        </SuccessMessage>
      </SuccessHeader>

      {session && (
        <OrderDetails>
          <DetailRow>
            <DetailLabel>Order ID:</DetailLabel>
            <DetailValue>{session.sessionId}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Event:</DetailLabel>
            <DetailValue>{'Art Exhibition'}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Total Amount:</DetailLabel>
            <DetailValue>${session.total.toFixed(2)}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Status:</DetailLabel>
            <DetailValue>{session.status === 'completed' ? 'Confirmed' : session.status}</DetailValue>
          </DetailRow>
        </OrderDetails>
      )}

      <ReturnButton href="/tickets">Return to Tickets</ReturnButton>
    </SuccessContainer>
  );
};

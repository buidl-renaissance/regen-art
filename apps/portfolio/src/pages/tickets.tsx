'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Tickets from '../app/components/tickets';
import { getEvent, getTicketTypes } from '@gods.work/ticketing';
import { TicketedEvent, TicketType } from '@gods.work/ticketing';

const StyledPage = styled.div`
  background-color: #f5f5f5;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  padding: 0 70px;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 2px;
    background: #96885f;
    position: absolute;
    top: 50%;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: #96885f;
  text-decoration: none;
  font-size: 1.1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const getServerSideProps = async () => {
  const ticketTypes = await getTicketTypes(1);
  const event = await getEvent(1);
  return {
    props: { ticketTypes, event }
  };
};

const TicketsPage = ({ ticketTypes, event }: { ticketTypes: TicketType[], event: TicketedEvent }) => {
  return (
    <StyledPage>
      <PageContainer>
        <BackButton href="/events">← Back to Events</BackButton>
        
        <PageHeader>
          <PageTitle>Buy Tickets</PageTitle>
          <PageDescription>
            Secure your spot at our upcoming events. Choose from various ticket options below.
          </PageDescription>
        </PageHeader>
        
        <Tickets 
          event={event}
          ticketTypes={ticketTypes}
        />
      </PageContainer>
    </StyledPage>
  );
};

export default TicketsPage;

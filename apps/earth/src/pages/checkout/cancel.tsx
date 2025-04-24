'use client';

import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const CancelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, #050d05, #0a2a0a, #061d0e, #011510);
  color: #ffffff;
  text-align: center;
  font-family: var(--font-geist-sans);
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const CancelHeader = styled.div`
  width: 100%;
  padding: 1rem;
  padding-top: 6rem;
  padding-bottom: 0;
  
  @media (min-width: 768px) {
    padding: 2rem;
    padding-top: 12rem;
    padding-bottom: 0;
  }
`;

const CancelTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
  color: #ff6b6b;
  font-family: var(--font-cambria);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
`;

const CancelMessage = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  max-width: 800px;
  line-height: 1.5;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
`;

const EarthImage = styled.div`
  width: 150px;
  height: 150px;
  margin: 1.5rem auto;
  background-image: url('/SadEarth.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.8;

  @media (min-width: 768px) {
    width: 300px;
    height: 300px;
    margin: 2rem auto;
  }
`;

const FactsContainer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  max-width: 800px;
`;

const FactTitle = styled.h3`
  color: #a7f3d0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const FactList = styled.ul`
  text-align: left;
  margin-bottom: 1.5rem;
`;

const FactItem = styled.li`
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #ff6b6b;
  }
`;

const ReturnButton = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #4ade80, #22c55e);
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.5);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(74, 222, 128, 0.7);
  }
`;

const RainEffect = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Raindrop = styled.div`
  position: absolute;
  width: 2px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0 0 5px 5px;
  z-index: -1;
`;

export default function CheckoutCancel() {
  const router = useRouter();
  const [raindrops, setRaindrops] = useState<
    Array<{
      id: number;
      left: string;
      height: string;
      animationDuration: string;
      animationDelay: string;
    }>
  >([]);

  useEffect(() => {
    // Create rain effect
    const dropCount = 50;
    const newRaindrops = [];

    for (let i = 0; i < dropCount; i++) {
      newRaindrops.push({
        id: i,
        left: `${Math.random() * 100}%`,
        height: `${Math.random() * 20 + 10}px`,
        animationDuration: `${Math.random() * 1 + 0.5}s`,
        animationDelay: `${Math.random() * 2}s`,
      });
    }

    setRaindrops(newRaindrops);

    // Cancel the checkout session via API
    const cancelCheckout = async () => {
      try {
        const { session_id } = router.query;
        if (session_id) {
          await fetch(`/api/checkout/cancel?session_id=${session_id}`);
        }
      } catch (error) {
        console.error('Error cancelling checkout:', error);
      }
    };

    cancelCheckout();
  }, [router.query]);

  return (
    <CancelContainer>
      <RainEffect>
        {raindrops.map((drop) => (
          <Raindrop
            key={drop.id}
            style={{
              left: drop.left,
              height: drop.height,
              animation: `falling ${drop.animationDuration} linear ${drop.animationDelay} infinite`,
            }}
          />
        ))}
      </RainEffect>

      <CancelHeader>
        <CancelTitle>Oh No! You&apos;ve Abandoned Mother Earth</CancelTitle>
        <CancelMessage>
          Your purchase was cancelled, and somewhere, a tree just lost its last
          leaf. The Earth was counting on your support today.
        </CancelMessage>
      </CancelHeader>

      <EarthImage />

      <FactsContainer>
        <FactTitle>
          What Your Cancelled Purchase Could Have Supported:
        </FactTitle>
        <FactList>
          <FactItem>
            Planting native trees to restore urban forests in Detroit
          </FactItem>
          <FactItem>
            Cleaning up plastic pollution from the Great Lakes
          </FactItem>
          <FactItem>
            Supporting indigenous water protectors fighting for clean water
          </FactItem>
          <FactItem>
            Educational programs teaching the next generation about
            sustainability
          </FactItem>
          <FactItem>
            Community gardens providing fresh food in urban food deserts
          </FactItem>
        </FactList>
      </FactsContainer>

      <CancelMessage>
        Every ticket purchase helps fund vital environmental initiatives.
        Without your support, these projects may not reach their full potential.
        The Earth gives us everything - clean air, water, food, and beauty. What
        will you give back?
      </CancelMessage>

      <ReturnButton href="/">Reconsider and Return to Event</ReturnButton>

      <style jsx global>{`
        @keyframes falling {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </CancelContainer>
  );
}

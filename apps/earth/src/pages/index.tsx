'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import BuyButton from '../components/BuyButton';

const PageContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  font-family: var(--font-geist-sans);
  background: linear-gradient(135deg, #050d05, #0a2a0a, #061d0e, #011510);
  position: relative;
  overflow: hidden;
  color: #ffffff;
`;

const FloatingParticle = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.3);
  animation: float 15s infinite ease-in-out;

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(10px, -20px);
    }
    50% {
      transform: translate(-15px, -35px);
    }
    75% {
      transform: translate(20px, -15px);
    }
  }
`;

const Header = styled.header`
  text-align: center;
  width: 100%;
  max-width: 56rem;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 0.5rem;
  padding-top: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 30vh;

  p {
    font-size: 0.75rem;
    margin-top: 0.75rem;
    margin-bottom: 0;
    color: #a7f3d0;
    max-width: 90%;
  }

  @media (min-width: 640px) {
    padding: 1rem;
    padding-top: 10rem;
    padding-bottom: 0;
    
    p {
      font-size: 0.875rem;
      margin-top: 1rem;
      max-width: 100%;
    }
  }

  @media (min-width: 768px) {
    padding-top: 14rem;
    padding-bottom: 0;
  }
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  font-family: var(--font-cambria);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: linear-gradient(to right, #d4fc79 0%, #96e6a1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.6),
    0 0 20px rgba(212, 252, 121, 0.4);
  animation: glow 3s ease-in-out infinite alternate;
  line-height: 1.1;

  @keyframes glow {
    from {
      text-shadow: 0 0 15px rgba(255, 255, 255, 0.6),
        0 0 20px rgba(212, 252, 121, 0.4);
    }
    to {
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.7),
        0 0 30px rgba(212, 252, 121, 0.5), 0 0 40px rgba(150, 230, 161, 0.3);
    }
  }

  @media (min-width: 640px) {
    font-size: 4rem;
    margin-bottom: 0.75rem;
  }
  @media (min-width: 768px) {
    font-size: 5.5rem;
  }
  @media (min-width: 1024px) {
    font-size: 6.5rem;
    line-height: 1.2;
  }
`;

const EventProduction = styled.h4`
  font-size: 1rem;
  margin-top: 0.25rem;
  font-family: var(--font-cambria);
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #a7f3d0;
  text-shadow: 0 0 10px rgba(167, 243, 208, 0.5),
    0 0 15px rgba(167, 243, 208, 0.3);

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #a7f3d0;
  font-family: var(--font-cambria);
  text-shadow: 0 0 10px rgba(167, 243, 208, 0.5),
    0 0 15px rgba(167, 243, 208, 0.3);
  letter-spacing: 0.08em;
  margin: 0.25rem 0;

  @media (min-width: 640px) {
    font-size: 2rem;
    margin: 0.5rem 0;
  }
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const EventTime = styled.h4`
  font-size: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
  font-family: var(--font-cambria);
  font-weight: 600;
  letter-spacing: 0.05em;
  background: linear-gradient(to right, #d1fae5 0%, #a7f3d0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 8px rgba(209, 250, 229, 0.6),
    0 0 15px rgba(74, 222, 128, 0.4);

  @media (min-width: 640px) {
    font-size: 1.5rem;
    margin-top: 0.5rem;
  }
  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const EventLocation = styled.h4`
  font-size: 1rem;
  margin-top: 0.25rem;
  font-family: var(--font-cambria);
  font-weight: 600;
  letter-spacing: 0.05em;

  @media (min-width: 640px) {
    font-size: 1.25rem;
    margin-top: 0.5rem;
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0.35;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    height: 56vh;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
`;

export default function Home() {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      top: string;
      left: string;
      size: string;
      animationDuration: string;
      animationDelay: string;
    }>
  >([]);

  useEffect(() => {
    const particleCount = window.innerWidth < 768 ? 8 : 30;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 2}px`,
        animationDuration: `${Math.random() * 20 + 10}s`,
        animationDelay: `${Math.random() * 5}s`,
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <PageContainer>
      {particles.map((particle) => (
        <FloatingParticle
          key={particle.id}
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDuration: particle.animationDuration,
            animationDelay: particle.animationDelay,
          }}
        />
      ))}
      <Header>
        <MainTitle>ARTS FOR THE EARTH</MainTitle>
        <EventProduction>A BURG INK PRODUCTION</EventProduction>
        <SubTitle>APRIL 26, 2025</SubTitle>
        <EventTime>12PM - 2AM</EventTime>
        <EventLocation>2804 WIGHT ST, DETROIT, MI</EventLocation>
        <BuyButton />
        <p>
          All proceeds benefit: Water Protectors Network, Friends of the Rouge,
          & Greening of Detroit—supporting the vital work of protecting our
          planet and its future generations.
        </p>
      </Header>
      <EventImage
        src="/arts-for-earth-blank.png"
        alt="Arts For The Earth Event"
      />
    </PageContainer>
  );
}

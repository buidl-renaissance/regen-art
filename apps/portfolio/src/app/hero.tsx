'use client';

import { FC } from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const HeroVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
  font-size: 5.625rem;
  font-weight: 500;
  font-style: normal;
  line-height: 1em;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #fff;
  max-width: 700px;
  margin: 0 auto 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ArtistName = styled.div`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  padding: 0 70px;
  
  &::before,
  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 2px;
    background: #fff;
    position: absolute;
    top: 43%;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  z-index: 1;
`;

const HeroButton = styled.a`
  padding: 0.5rem 2rem;
  color: #e1e1e1;
  background-color: transparent;
  border: 4px solid #96885f;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

interface HeroProps {
  artistName?: string;
  title?: string;
  subtitle?: string;
  videoSrc?: string;
}

const Hero: FC<HeroProps> = ({
  artistName = 'Burg Ink',
  title = 'Andrea Burg',
  subtitle = '',
  videoSrc = 'https://andreaburg.com/wp-content/uploads/2025/02/tattoo-timelapse-adobe.mp4#t=55,115',
}) => {
  return (
    <HeroContainer>
      <HeroVideo autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/mp4" />
      </HeroVideo>
      <HeroOverlay />
      <Title>{title}</Title>
      <ArtistName>{artistName}</ArtistName>
      <Subtitle>{subtitle}</Subtitle>
      <HeroButtons>
        <HeroButton href="/artwork">Artwork</HeroButton>
        <HeroButton href="/tattoos">Tattoos</HeroButton>
        <HeroButton href="/inquire">Inquire</HeroButton>
      </HeroButtons>
    </HeroContainer>
  );
};

export default Hero;
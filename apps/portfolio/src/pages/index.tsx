'use client';

import styled from 'styled-components';
import Hero from '../app/components/hero';
import Gallery from '../app/components/gallery';

const StyledPage = styled.div`
  margin: 0 auto;

  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
  }

  .artwork-card {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
    
    @media (max-width: 768px) {
      border-radius: 6px;
      
      &:hover {
        transform: translateY(-3px);
      }
    }
  }

  .artwork-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    
    @media (max-width: 768px) {
      height: 180px;
    }
  }

  .artwork-info {
    padding: 1rem;
    
    @media (max-width: 768px) {
      padding: 0.75rem;
    }
  }

  .artwork-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #333;
    
    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 0.3rem;
    }
  }

  .artwork-description {
    font-size: 0.9rem;
    color: #666;
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const AboutSection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  position: relative;
  background-color: #f5f5f5;
  
  @media (max-width: 768px) {
    padding: 2.5rem 1rem;
  }
`;

const AboutTitle = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  margin-bottom: 1.5rem;
  color: #333;
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0 40px;
    margin-bottom: 1rem;
    
    &::before,
    &::after {
      width: 30px;
    }
  }
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #555;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;

const MoreLink = styled.a`
  padding: 0.5rem 2rem;
  color: #333;
  background-color: transparent;
  border: 4px solid #96885f;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  display: inline-block;
  text-decoration: none;

  &:hover {
    background-color: rgba(150, 136, 95, 0.2);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 1.5rem;
    font-size: 1rem;
    border-width: 3px;
  }
`;

const ContactSection = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: #333;
  color: #fff;
  
  @media (max-width: 768px) {
    padding: 2.5rem 1rem;
  }
`;

const ContactTitle = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  margin-bottom: 1.5rem;
  color: #fff;
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0 40px;
    margin-bottom: 1rem;
    
    &::before,
    &::after {
      width: 30px;
    }
  }
`;

const ContactText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;

const ContactEmail = styled.span`
  color: #96885f;
  font-weight: 500;
  display: block;
  font-size: 1.4rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-top: 0.75rem;
  }
`;

export default function Index() {
  return (
    <StyledPage>
      <Hero />
      <Gallery />

      <AboutSection>
        <AboutTitle>About the Artist</AboutTitle>
        <AboutText>
          Andrea Burg, a lifelong creator, channels energy-healing and shamanic practices into her art, 
          intending to serve her soul&apos;s journey and contribute to collective healing. Guided by inner wisdom, 
          her diverse creations, spanning tattooing to mixed media, embody a commitment to transforming emotions, 
          fostering love, and inspiring a more harmonious world.
        </AboutText>
        <MoreLink href="/about">More about the artist</MoreLink>
      </AboutSection>

      <ContactSection>
        <ContactTitle>Contact</ContactTitle>
        <ContactText>
          For inquiries about commissions or available works, please email:
          <ContactEmail>andrea@burgink.com</ContactEmail>
        </ContactText>
      </ContactSection>
    </StyledPage>
  );
}

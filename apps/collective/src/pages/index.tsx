'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Metadata } from 'next';
import { Subtitle } from '../app/components/Styled';

export const metadata: Metadata = {
  title: 'Art Night Detroit',
  description: 'Art Night Detroit - Creating a community of creative people to come together on Wednesday nights for the sake of art, since 2018.',
  openGraph: {
    title: 'Art Night Detroit',
    description: 'Art Night Detroit - Creating a community of creative people to come together on Wednesday nights for the sake of art, since 2018.',
    images: ['https://dpop.nyc3.digitaloceanspaces.com/uploads/resized/800w/oOVcomL9Ybez4Tzt2cFIPSwjZ0o0J88ewsM78ie1.png'],
  },
};

export const getServerSideProps = async () => {
  return {
    props: {
      metadata,
    },
  };
};

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <StyledPage>
      <div className="background">
        {/* <video autoPlay muted loop playsInline>
          <source src="https://andreaburg.com/wp-content/uploads/2025/02/tattoo-timelapse-adobe.mp4#t=55,115" type="video/mp4" />
        </video> */}
        <img src="https://dpop.nyc3.digitaloceanspaces.com/uploads/resized/800w/oOVcomL9Ybez4Tzt2cFIPSwjZ0o0J88ewsM78ie1.png" alt="Art Night Detroit" />
      </div>
      <div className="overlay"></div>
      
      <div className="content">
        <div className="top-half">
          {/* <img src="/logo.svg" alt="Event Logo" className="logo" /> */}
          <h1 className="event-title">Art Night Detroit</h1>
          <Subtitle style={{ maxWidth: '600px' }}>
            Creating a community of creative people to come together on Wednesday nights for the sake of art, since 2018.
          </Subtitle>
          <div className="nav-links">
            <Link href="/events">
              <button className="nav-button">Events</button>
            </Link>
            <Link href="/artists">
              <button className="nav-button">Artists</button>
            </Link>
            <Link href="/artwork">
              <button className="nav-button">Artwork</button>
            </Link>
          </div>
          {/* <div className="event-date">One Night Only — December 31, 2023</div> */}
          {/* <Link href="/join">
            <button className="cta-button">Join Us</button>
          </Link>
          <div className="secondary-option mt-4">
            Already a member? <span className="sign-in-link">Sign In</span>
          </div> */}
        </div>
        
        {/* <div className="bottom-half">
        </div> */}
        
        {/* <div className="footer">
          Powered by Collective Studio
        </div> */}
      </div>
    </StyledPage>
  );
}


const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  color: white;
  font-family: 'Inter', sans-serif;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    
    video, img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 0;
  }

  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .top-half {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    text-align: center;

    @media (max-width: 768px) {
      padding: 1.5rem;
    }
  }

  .logo {
    max-width: 180px;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      max-width: 140px;
      margin-bottom: 1.5rem;
    }
  }

  .event-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }

  .event-date {
    font-size: 1.5rem;
    font-weight: 500;
    opacity: 0.9;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
  .nav-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin: 0;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    @media (max-width: 480px) {
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
  }

  .nav-button {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.5);
    padding: 0.85rem 1.75rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &:hover {
      background: rgba(255, 255, 255, 0.35);
      transform: translateY(-4px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      border-color: rgba(255, 255, 255, 0.8);
    }

    &:active {
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      padding: 0.7rem 1.25rem;
      font-size: 0.95rem;
    }

    @media (max-width: 480px) {
      padding: 0.6rem 1rem;
      font-size: 0.85rem;
      border-width: 1px;
    }
  }

  .bottom-half {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 768px) {
      padding: 1.5rem;
      gap: 1rem;
    }
  }

  .cta-button {
    background: #FF3366;
    color: white;
    border: none;
    padding: 1rem 3rem;
    font-size: 1.25rem;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #E62E5C;
    }

    @media (max-width: 768px) {
      padding: 0.85rem 2.5rem;
      font-size: 1.1rem;
    }

    @media (max-width: 480px) {
      padding: 0.75rem 2rem;
      font-size: 1rem;
      width: 100%;
      max-width: 250px;
    }
  }

  .secondary-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    margin-top: 0.5rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }

  .sign-in-link {
    color: #FF3366;
    text-decoration: underline;
    cursor: pointer;
    font-weight: 500;
  }

  .footer {
    padding: 1rem;
    text-align: center;
    font-size: 0.75rem;
    opacity: 0.7;

    @media (max-width: 768px) {
      padding: 0.75rem;
      font-size: 0.7rem;
    }
  }
`;

'use client';

import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    
    video {
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
    background: rgba(0, 0, 0, 0.6);
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
  }

  .logo {
    max-width: 180px;
    margin-bottom: 2rem;
  }

  .event-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .event-date {
    font-size: 1.5rem;
    font-weight: 500;
    opacity: 0.9;
  }

  .bottom-half {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
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
  }

  .secondary-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
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
  }
`;

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <StyledPage>
      <div className="background">
        <video autoPlay muted loop playsInline>
          <source src="https://andreaburg.com/wp-content/uploads/2025/02/tattoo-timelapse-adobe.mp4#t=55,115" type="video/mp4" />
        </video>
      </div>
      <div className="overlay"></div>
      
      <div className="content">
        <div className="top-half">
          {/* <img src="/logo.svg" alt="Event Logo" className="logo" /> */}
          <h1 className="event-title">Art Night Detroit</h1>
          {/* <div className="event-date">One Night Only — December 31, 2023</div> */}
          <Link href="/join">
            <button className="cta-button">Get Started</button>
          </Link>
          <div className="secondary-option mt-4">
            Already have an account? <span className="sign-in-link">Sign In</span>
          </div>
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

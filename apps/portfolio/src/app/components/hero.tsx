import { FC } from 'react';
import styled from 'styled-components';

interface HeroProps {
  onExploreClick: () => void;
}

const StyledHero = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
  position: relative;
  overflow: hidden;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.1) 0%,
      rgba(99, 102, 241, 0) 70%
    );
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .hero-content {
    max-width: 900px;
    padding: 1.5rem;
    position: relative;
    z-index: 1;
  }

  .profile-image {
    width: clamp(150px, 30vw, 200px);
    height: clamp(150px, 30vw, 200px);
    border-radius: 50%;
    margin-bottom: 2rem;
    object-fit: cover;
    border: 4px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }

  h1 {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 800;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: clamp(1.2rem, 4vw, 1.8rem);
    margin-bottom: 2.5rem;
    color: #e2e8f0;
    font-weight: 300;
    letter-spacing: 0.5px;
    opacity: 0.9;
  }

  .cta-button {
    padding: 1rem 2rem;
    font-size: clamp(1rem, 3vw, 1.3rem);
    background: linear-gradient(45deg, #60a5fa, #a78bfa);
    border: none;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(96, 165, 250, 0.4);
    }
  }
`;

export const Hero: FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <StyledHero className="hero">
      <div className="hero-content">
        <img
          src="/WiredInSamurai.jpeg"
          alt="WiredInSamurai"
          className="profile-image"
        />
        <h1>WiredInSamurai</h1>
        <p className="subtitle">Technology Builder for Communities</p>
        <button className="cta-button" onClick={onExploreClick}>
          Explore Work
        </button>
      </div>
    </StyledHero>
  );
};
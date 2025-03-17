'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';

const StyledPage = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  .section {
    padding: 2rem 0.75rem;

    @media (min-width: 768px) {
      padding: 5rem 2rem;
    }
  }

  .title {
    font-size: clamp(1.75rem, 5vw, 3.5rem);
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #1e293b;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (min-width: 768px) {
      margin-bottom: 2rem;
    }
  }

  .subtitle {
    font-size: clamp(1.25rem, 4vw, 1.5rem);
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
    color: #334155;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (min-width: 768px) {
      margin-bottom: 1.5rem;
    }
  }

  .story-text {
    font-size: clamp(1rem, 3vw, 1.5rem);
    line-height: 1.6;
    max-width: 800px;
    margin: 0.5rem auto 1.5rem auto;
    color: #334155;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.8s ease, transform 0.8s ease;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (min-width: 768px) {
      margin: 2rem auto;
      line-height: 1.8;
    }
  }

  .artwork {
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    display: block;
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, opacity 1s ease;
    opacity: 0;

    &.visible {
      opacity: 1;
    }

    @media (min-width: 768px) {
      margin: 3rem auto;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    &:hover {
      transform: scale(1.02);
    }
  }

  .divider {
    width: 80%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      #60a5fa,
      #a78bfa,
      transparent
    );
    margin: 3rem auto;
    border-radius: 2px;
    opacity: 0;
    transition: opacity 1.2s ease, width 1.2s ease;

    &.visible {
      opacity: 1;
    }

    @media (min-width: 768px) {
      width: 60%;
      height: 3px;
      margin: 4rem auto;
      border-radius: 3px;
    }
  }

  .prolog {
    max-width: 800px;
    margin: 0 auto 2rem;
    text-align: center;

    @media (min-width: 768px) {
      margin: 0 auto 3rem;
    }
  }

  .highlight {
    color: #4f46e5;
    font-weight: 600;
  }

  .feature-item {
    margin-bottom: 4rem;
    transform: translateY(15px);
    transition: opacity 0.8s ease, transform 0.8s ease;

    @media (min-width: 768px) {
      margin-bottom: 3rem;
    }
  }

  .cta {
    font-size: clamp(1.1rem, 3vw, 1.6rem);
    font-weight: bold;
    text-align: center;
    margin: 1rem auto;
    color: #4f46e5;

    @media (min-width: 768px) {
      margin: 3rem auto;
    }
  }

  .cta-button {
    padding: 0.85rem 2rem;
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    background: linear-gradient(45deg, #60a5fa, #a78bfa);
    border: none;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 15px rgba(96, 165, 250, 0.3),
      inset 0 1px 2px rgba(255, 255, 255, 0.4);
    text-decoration: none;
    font-weight: 600;
    text-align: center;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
    z-index: 1;
    display: block;
    margin: 2rem auto;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: all 0.6s ease;
      z-index: -1;
    }

    &:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 25px rgba(96, 165, 250, 0.5),
        inset 0 1px 3px rgba(255, 255, 255, 0.6);
      letter-spacing: 0.8px;

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(1px) scale(0.98);
      box-shadow: 0 2px 10px rgba(96, 165, 250, 0.3);
    }
  }

  .cta-container {
    margin: 3rem auto;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
    opacity: 0;
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      opacity: 0.5;
      transform: rotate(0deg);
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.5;
      transform: rotate(360deg);
    }
  }

  .fade-in-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');

      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (elementPosition.top < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledPage>
      <div className="section">
        <h1 className={`title animate-on-scroll ${isLoaded ? 'visible' : ''}`}>
          The Digital Renaissance
        </h1>
        <h2
          className={`subtitle animate-on-scroll ${isLoaded ? 'visible' : ''}`}
        >
          A Rebellion on Canvas
        </h2>
        <p
          className={`story-text animate-on-scroll ${
            isLoaded ? 'visible' : ''
          }`}
          style={{ textAlign: 'center', fontSize: '0.8rem' }}
        >
          Art is more than just an expression—it's a movement. A revolution. A
          story waiting to be told.
        </p>
        <div className="prolog">
          <img
            src="https://nyc3.digitaloceanspaces.com/dpop/images/1742193049620-737119928.jpg"
            className={`artwork animate-on-scroll ${isLoaded ? 'visible' : ''}`}
            alt="Daft Punk painting"
          />

          <p className="story-text animate-on-scroll">
            <i>
              At the heart of Detroit's creative underground, these pieces
              emerge from the collision of past, present, and future—challenging
              power, identity, and perception.
            </i>
          </p>

          <div className="feature-item">
            <img
              src="https://nyc3.digitaloceanspaces.com/dpop/images/1742237935375-886916373.jpg"
              className="artwork animate-on-scroll"
              alt="Go to Jail by Daniel Geanes | ECNTRC"
            />
            <p className="story-text animate-on-scroll">
              <span className="highlight">🔹 "GO TO JAIL"</span>
            </p>
            <p className="story-text animate-on-scroll">
              A stark reminder of systemic control and the voices that push
              back. A symbol of defiance, justice, and the power of speech.
            </p>
          </div>

          <div className="feature-item">
            <img
              src="https://nyc3.digitaloceanspaces.com/dpop/images/1742238888924-13365302.jpg"
              className="artwork animate-on-scroll"
              alt="Unshaken – A Portrait of Determination by Daniel Easterly"
            />
            <p className="story-text animate-on-scroll">
              <span className="highlight">🔹 Raw Expression</span>
            </p>
            <p className="story-text animate-on-scroll">
              The striking portrait of a man with an unfiltered gaze. Emotion,
              power, and frustration drip from every brushstroke.
            </p>
          </div>

          <div className="feature-item">
            <img
              src="https://nyc3.digitaloceanspaces.com/dpop/images/1742238267382-21069306.jpg"
              className="artwork animate-on-scroll"
              alt="Digital Icons – A Tribute to Daft Punk by Nathan Karinen"
            />
            <p className="story-text animate-on-scroll">
              <span className="highlight">🔹 Digital Icons Reimagined</span>
            </p>
            <p className="story-text animate-on-scroll">
              The legendary duo (Daft Punk) reborn in shimmering abstraction.
              Their helmets, symbols of digital-era mystique, reflect the
              ever-blurring lines between reality and technology.
            </p>
          </div>

          <div className="feature-item">
            <img
              src="https://nyc3.digitaloceanspaces.com/dpop/images/1742238440602-66614981.jpg"
              className="artwork animate-on-scroll"
              alt="Trippin’ – A Psychedelic Self-Reflection by Daniel Geanes | ECNTRC"
            />
            <p className="story-text animate-on-scroll">
              <span className="highlight">🔹 Fragmented Identity</span>
            </p>
            <p className="story-text animate-on-scroll">
              A portrait dissected, reconstructed, and redefined. Where does the
              self begin, and where does it end?
            </p>
          </div>

          <p className="story-text animate-on-scroll">
            Each piece is a chapter of a larger story—one that reclaims
            narratives, questions authority, and celebrates the fusion of
            tradition and digital evolution.
          </p>

          <div className={`cta-container animate-on-scroll`}>
            <p className="cta">🔥 Own a piece of the rebellion.</p>
            <p className="cta">Collect. Connect. Create.</p>
          </div>
        </div>

        <div className="divider animate-on-scroll"></div>
        <h2 className="title animate-on-scroll">
          Chapter 1: The Architects of Sound & Vision
        </h2>
        <img
          src="https://nyc3.digitaloceanspaces.com/dpop/images/1742193054861-372202014.jpg"
          className="artwork animate-on-scroll"
          alt="Daft Punk painting"
        />
        <p className="story-text animate-on-scroll">
          The neon hum of a future yet to arrive lingers in the air. A flicker
          of light reflects off their helmets—gold and chrome, past and future,
          analog and digital, colliding in an endless loop. They are the
          architects of sound, pioneers of the unseen, the unheard, the
          unexplored.
        </p>
        <p className="story-text animate-on-scroll">
          In the dim glow of a studio where creativity breathes, two icons stand
          immortalized in paint. The stars shimmer across their helmets, as if
          signaling that their presence transcends the limits of time. This is
          not just a portrait—it's a portal, capturing the eternal beat of an
          era that refuses to fade.
        </p>
        <p className="story-text animate-on-scroll">
          Across the room, a new world takes shape. Obie's brush drags across
          the canvas, carving out a different kind of legend—one grounded in
          raw, gritty reality. A group of figures crouch in the shade of
          towering green, their faces masked with mischief and intent. They
          exist in a space between rebellion and camaraderie, where the rules of
          the old world no longer apply.
        </p>
        <p className="story-text animate-on-scroll">
          The contrast is electric. One piece pays homage to the revolution of
          sound, the other, a manifesto of the streets—both speaking the same
          language of defiance and innovation. Here, in this studio, past
          movements and future visions are not separate. They are in
          conversation, stitched together by the artists who dare to redefine
          what's possible.
        </p>
        <p className="story-text animate-on-scroll">
          The Digital Renaissance has begun. And this?
          <br />
          This is only Chapter One.
        </p>

        <div className="divider animate-on-scroll"></div>
        <h2 className="title animate-on-scroll">Chapter 2: The Awakening</h2>
        <img
          src="https://nyc3.digitaloceanspaces.com/dpop/images/1742193059847-592079574.jpg"
          className="artwork animate-on-scroll"
          alt="Mystic painting"
        />
        <p className="story-text animate-on-scroll">
          The air is thick with the scent of paint and revolution. The studio
          hums with an unseen energy, as though the spirits of past movements
          have gathered to witness the birth of something new. The canvases lean
          against each other like silent conspirators, their stories tangled
          together, waiting for the right moment to be unleashed.
        </p>
        <p className="story-text animate-on-scroll">
          In the center, she stands. A green-skinned mystic, eyes wide with
          prophecy, a third eye gazing into realms beyond the physical. Her
          presence is electric, an oracle of the digital age, guiding the
          artists and visionaries who gather here. She is nature and machine,
          wisdom and rebellion—watching, waiting, knowing. The revolution is
          near.
        </p>
        <p className="story-text animate-on-scroll">
          To her left, a message from the past rings out in cold, bureaucratic
          lettering: "GO TO JAIL." The ink is sharp, the image unmistakable—a
          reminder of the systems that have dictated fate for too long. But this
          is no defeatist message. It is a call to arms. The artists here refuse
          to be pawns in someone else's game. They are flipping the board.
        </p>
        <p className="story-text animate-on-scroll">
          In the shadows, the masked duo lingers. Daft Punk, the sentinels of
          sound, the architects of a new world. Their helmets reflect the chaos
          and the beauty of the present moment, their music an anthem for those
          daring enough to dream.
        </p>
        <p className="story-text animate-on-scroll">
          And then there is the gaze—piercing, unyielding. A portrait of
          defiance, of frustration, of power held just beneath the surface. A
          man on the edge, ready to step into the unknown. He is not alone.
        </p>
        <p className="story-text animate-on-scroll">
          The setting is complete. The elements are in place. The mystic has
          spoken. The artists have gathered. The sound is building.
        </p>
        <p className="story-text animate-on-scroll">
          The revolution begins at Art Night—where expression is currency, and
          creation is resistance.
        </p>
        <div className="divider animate-on-scroll"></div>
        <div className="cta-container animate-on-scroll">
          <button
            className="cta-button"
            onClick={() => window.open('https://art.gods.work', '_blank')}
          >
            Join the Revolution
          </button>
        </div>
        <div className="divider animate-on-scroll"></div>
      </div>
    </StyledPage>
  );
}

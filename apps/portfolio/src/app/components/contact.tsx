import styled from 'styled-components';
import { SectionTitle } from './section-title';

export function Contact() {
  return (
    <StyledContactSection className="contact-section">
      <SectionTitle>Get in Touch</SectionTitle>
      <div className="contact-content">
        <p>
          I&apos;m always interested in hearing about new projects and
          opportunities. Whether you have a question or just want to say hi,
          feel free to reach out!
        </p>
        <div className="contact-links">
          <a href="mailto:john@dpop.tech" aria-label="Email">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/john-gulbronson-a285285b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
            </svg>
          </a>
          <a
            href="https://github.com/johngulb"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </StyledContactSection>
  );
}
const StyledContactSection = styled.section`
  background: #fff;
  padding: 4rem 1rem;

  .section-title {
    text-align: center;
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 700;
    margin-bottom: 3rem;
    color: #1e293b;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(45deg, #60a5fa, #a78bfa);
      border-radius: 2px;
    }
  }

  .contact-content {
    max-width: 620px;
    margin: 0 auto;
    text-align: center;
    padding: 0 1rem;

    p {
      color: #1e293b;
      font-size: clamp(1rem, 3vw, 1.2rem);
      margin-bottom: 2rem;
      line-height: 1.7;
    }

    .contact-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 2rem;

      @media (min-width: 768px) {
        gap: 2rem;
        margin-top: 3rem;
      }

      a {
        color: #3b82f6;
        font-size: 1.5rem;
        transition: transform 0.3s ease;

        @media (min-width: 768px) {
          font-size: 2rem;
        }

        &:hover {
          transform: translateY(-4px);
          color: #6366f1;
        }

        svg {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;

          @media (min-width: 768px) {
            width: 48px;
            height: 48px;
          }
        }
      }
    }
  }
`;

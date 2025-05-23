'use client';

import { useState } from 'react';
import styled from 'styled-components';
import {
  FaEye,
  FaPaintBrush,
  FaHeadphones,
  FaClipboardList,
} from 'react-icons/fa';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Art Night Detroit',
  description:
    'Join the collective of creators, artists, and builders shaping the future.',
};

export async function getServerSideProps() {
  return {
    props: {
      metadata,
    },
  };
}

interface JoinContainerProps {
  selectedRole: string;
}

export default function Join() {
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    {
      id: 'collector',
      title: 'Art Collector',
      description: 'I collect and appreciate creative works.',
      icon: <FaEye className="icon" />,
    },
    {
      id: 'artist',
      title: 'Visual Artist',
      description: 'I create visual art and exhibitions.',
      icon: <FaPaintBrush className="icon" />,
    },
    {
      id: 'musician',
      title: 'Musician / Producer',
      description: 'I create and perform music.',
      icon: <FaHeadphones className="icon" />,
    },
    {
      id: 'organizer',
      title: 'Event Organizer',
      description: 'I organize creative events and experiences.',
      icon: <FaClipboardList className="icon" />,
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  return (
    <JoinContainer selectedRole={selectedRole}>
      <div className="background">
        <video autoPlay muted loop playsInline>
          <source src="/event-background.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="overlay"></div>

      <div className="content">
        <h1>What best describes your creative identity?</h1>

        <div className="role-grid">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`role-card ${
                selectedRole === role.id ? 'selected' : ''
              }`}
              onClick={() => handleRoleSelect(role.id)}
            >
              {role.icon}
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </div>
          ))}
        </div>

        <div className="button-container">
          <button className="continue-button">Create Profile</button>
        </div>
      </div>
    </JoinContainer>
  );
}

const JoinContainer = styled.div<JoinContainerProps>`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  color: white;
  font-family: 'Inter', sans-serif;
  background: #121212;

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
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }

  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .role-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .role-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    &.selected {
      border-color: #ff3366;
      background: rgba(255, 51, 102, 0.15);
    }

    .icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #ff3366;
    }

    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    p {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding-bottom: 2rem;
  }

  .continue-button {
    background: #ff3366;
    color: white;
    border: none;
    padding: 1rem 3rem;
    font-size: 1.25rem;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
    opacity: ${(props) => (props.selectedRole ? 1 : 0.5)};
    pointer-events: ${(props) => (props.selectedRole ? 'auto' : 'none')};

    &:hover {
      background: #e62e5c;
    }
  }
`;

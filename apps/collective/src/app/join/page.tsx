'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaPaintBrush, FaHeadphones, FaClipboardList } from 'react-icons/fa';

interface JoinContainerProps {
  selectedRole: string;
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
      border-color: #FF3366;
      background: rgba(255, 51, 102, 0.15);
    }

    .icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #FF3366;
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
    background: #FF3366;
    color: white;
    border: none;
    padding: 1rem 3rem;
    font-size: 1.25rem;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
    opacity: ${props => props.selectedRole ? 1 : 0.5};
    pointer-events: ${props => props.selectedRole ? 'auto' : 'none'};

    &:hover {
      background: #E62E5C;
    }
  }
`;

export default function Join() {
  const [selectedRole, setSelectedRole] = useState('');

  const roles = [
    {
      id: 'guest',
      title: 'Guest / Collector',
      description: 'I\'m here to explore, connect, and collect.',
      icon: <FaEye className="icon" />
    },
    {
      id: 'artist',
      title: 'Artist / Vendor',
      description: 'I\'m showcasing or selling my work.',
      icon: <FaPaintBrush className="icon" />
    },
    {
      id: 'performer',
      title: 'Performer / DJ',
      description: 'I\'m on the lineup.',
      icon: <FaHeadphones className="icon" />
    },
    {
      id: 'organizer',
      title: 'Organizer / Staff',
      description: 'I\'m working the event.',
      icon: <FaClipboardList className="icon" />
    }
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
        <h1>How are you showing up tonight?</h1>
        
        <div className="role-grid">
          {roles.map(role => (
            <div 
              key={role.id}
              className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
              onClick={() => handleRoleSelect(role.id)}
            >
              {role.icon}
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </div>
          ))}
        </div>
        
        <div className="button-container">
          <button className="continue-button">Next</button>
        </div>
      </div>
    </JoinContainer>
  );
}

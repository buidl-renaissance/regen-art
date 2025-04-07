import { useState, useEffect } from 'react';
import styled from 'styled-components';

// Username Form Component
export const UsernameFormComponent = ({
  username,
  setUsername,
  onSubmit,
}: {
  username: string;
  setUsername: (username: string) => void;
  onSubmit: () => void;
}) => {
  const [updatedUsername, setUpdatedUsername] = useState<string>(username);

  useEffect(() => {
    setUpdatedUsername(username);
  }, [username]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedUsername.trim()) {
      setUsername(updatedUsername);
      onSubmit();
    }
  };

  return (
    <FormContainer>
      <Instructions>
        Enter your username
      </Instructions>

      <UsernameForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={updatedUsername}
          onChange={(e) => setUpdatedUsername(e.target.value)}
          required
          autoFocus
        />
        <Button type="submit" disabled={!updatedUsername.trim()}>
          Continue
        </Button>
      </UsernameForm>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 320px;
  font-family: monospace;
`;

const Instructions = styled.div`
  margin: 1rem 0;
  line-height: 1.4;
  text-align: center;
  max-width: 300px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const UsernameForm = styled.form`
  margin: 0.75rem 0 1.5rem;
  width: 100%;
  input {
    font-family: monospace;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.875rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  transition: border-color 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 1px 4px rgba(74, 144, 226, 0.2);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-family: monospace;

  &:hover {
    background-color: #357ae8;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

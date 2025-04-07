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
    <>
      <Instructions>
        <p>
          Please enter your username to begin the DPoP authentication process.
          After submitting your username, you&apos;ll be shown a QR code to scan
          with your mobile app.
        </p>
      </Instructions>

      <UsernameForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter your username"
          value={updatedUsername}
          onChange={(e) => setUpdatedUsername(e.target.value)}
          required
        />
        <Button type="submit" disabled={!updatedUsername.trim()}>
          Continue
        </Button>
      </UsernameForm>
    </>
  );
};

const Instructions = styled.div`
  margin: 1rem 0;
  line-height: 1.6;
  text-align: center;
  max-width: 600px;
`;

const UsernameForm = styled.form`
  margin: 1.5rem 0;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #357ae8;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

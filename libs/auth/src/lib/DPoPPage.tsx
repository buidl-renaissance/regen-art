import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from './hooks/useAuth';
import { Container, Title, Subtitle, Header } from '@gods.work/ui';
import {
  formatDate,
  getOrCreateHotWallet,
  signMessage,
} from '@gods.work/utils';
import QRCode from 'react-qr-code';
import { useClient } from './hooks/useClient';
import { useUsername } from './hooks/useUsername';

// Styled components
const DPoPContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QRCodeContainer = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StatusMessage = styled.div<{ isSuccess?: boolean; isError?: boolean }>`
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  background-color: ${(props) =>
    props.isSuccess
      ? 'rgba(0, 128, 0, 0.1)'
      : props.isError
      ? 'rgba(255, 0, 0, 0.1)'
      : 'rgba(0, 0, 0, 0.05)'};
  color: ${(props) =>
    props.isSuccess ? '#006400' : props.isError ? '#8b0000' : 'inherit'};
`;

const Instructions = styled.div`
  margin: 1rem 0;
  line-height: 1.6;
  text-align: center;
  max-width: 600px;
`;

const ClientIdDisplay = styled.div`
  margin: 1rem 0;
  padding: 0.75rem;
  color: #000;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  word-break: break-all;
  text-align: center;
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

export const DPoPPage: React.FC = () => {
  const [status, setStatus] = useState<'waiting' | 'success' | 'error'>(
    'waiting'
  );
  const [statusMessage, setStatusMessage] = useState<string>(
    'Waiting for authentication...'
  );
  const [webhookId, setWebhookId] = useState<string>('');
  const [qrData, setQRData] = useState<string>('');
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const { user } = useAuth();
  const { clientId } = useClient();
  const { username, setUsername } = useUsername();
  const [updatedUsername, setUpdatedUsername] = useState<string>(username);

  useEffect(() => {
    const { wallet, address, phrase } = getOrCreateHotWallet();
    console.log('Wallet: ', wallet);
    console.log('Address: ', address);
    console.log('Phrase: ', phrase);
  }, []);

  useEffect(() => {
    setUpdatedUsername(username);
  }, [username]);

  useEffect(() => {
    if (clientId && webhookId && username && !qrData) {
      const generateQRData = async () => {
        const client_sig = await signMessage(clientId);
        console.log('Generating QR Data w/ Sig', client_sig);
        setQRData(
          JSON.stringify({
            webhookId,
            client_id: clientId,
            client_sig,
            username,
            timestamp: Date.now(),
          })
        );
      };
      generateQRData();
    }
  }, [clientId, webhookId, username, qrData]);

  // Generate a unique webhook ID and public key on component mount
  useEffect(() => {
    if (showQRCode) {
      const generateKeys = async () => {
        try {
          // Generate a random webhook ID
          const id =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          setWebhookId(id);

          // Initialize the webhook endpoint
          await initializeWebhook(id, clientId);
        } catch (error) {
          console.error('Error generating authentication data:', error);
          setStatus('error');
          setStatusMessage(
            'Failed to initialize authentication. Please try again.'
          );
        }
      };

      generateKeys();
      console.log('QR Data: ', qrData);
      // Poll for webhook responses
      const interval = setInterval(() => {
        checkWebhookStatus();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [clientId, qrData, showQRCode]);

  // Initialize webhook endpoint
  const initializeWebhook = async (id: string, clientId: string) => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected');
      socket.send(JSON.stringify({ type: 'register', client_id: clientId }));
      setInterval(() => {
        socket.send(JSON.stringify({ type: 'ping' }));
      }, 30000); // ping every 30 seconds
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('Message from server: ', data);
      if (data.type === 'pong') {
        console.log('Pong received');
      } else if (data.type === 'authenticated') {
        console.log('Register response received');
        console.log('Authenticated: ', data);
        window.location.href = '/profile';
      }
    };
  };

  // Check webhook status
  const checkWebhookStatus = async () => {
    try {
      // In a real implementation, you would check if the webhook has received a response
      // This is a mock implementation that randomly succeeds after some time
      if (status === 'waiting' && Math.random() < 0.1) {
        setStatus('success');
        setStatusMessage('Authentication successful! Redirecting...');

        // // Redirect after successful authentication
        // setTimeout(() => {
        //   router.push('/events');
        // }, 2000);
      }
    } catch (error) {
      console.error('Error checking webhook status:', error);
    }
  };

  // Handle username submission
  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedUsername.trim()) {
      setUsername(updatedUsername);
      setShowQRCode(true);
    }
  };

  return (
    <Container>
      <DPoPContainer>
        <Header>
          <Title>Authenticate with DPoP</Title>
          <Subtitle>
            Secure authentication without sharing your password
          </Subtitle>
        </Header>

        {!showQRCode ? (
          <>
            <Instructions>
              <p>
                Please enter your username to begin the DPoP authentication
                process. After submitting your username, you&apos;ll be shown a
                QR code to scan with your mobile app.
              </p>
            </Instructions>

            <UsernameForm onSubmit={handleUsernameSubmit}>
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
        ) : (
          <>
            <Instructions>
              <p>
                Open your DPoP-compatible mobile app and scan this QR code to
                securely authenticate. This method uses Demonstration of
                Proof-of-Possession to verify your identity without sharing your
                password.
              </p>
            </Instructions>

            <ClientIdDisplay>
              Username: {username} | Client ID: {clientId}
            </ClientIdDisplay>

            <QRCodeContainer>
              <QRCode value={qrData} size={256} />
            </QRCodeContainer>

            <StatusMessage
              isSuccess={status === 'success'}
              isError={status === 'error'}
            >
              {statusMessage}
            </StatusMessage>
          </>
        )}

        {user && (
          <div>
            <p>Currently logged in as: {user.name}</p>
            <p>
              Last login:{' '}
              {formatDate(user.last_login || new Date().toISOString(), true)}
            </p>
          </div>
        )}
      </DPoPContainer>
    </Container>
  );
};

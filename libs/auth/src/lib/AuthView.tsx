import { formatDate } from '@/libs/utils/src/lib/datetime';
import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { getOrCreateHotWallet, signMessage } from '@gods.work/utils';

import { useClient } from './hooks/useClient';
import { useUsername } from './hooks/useUsername';

import { QRCodeAuthentication } from './QRCodeAuthentication';
import { UsernameFormComponent } from './UsernameFormComponent';

export const AuthView: React.FC = () => {
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

  useEffect(() => {
    const { wallet, address, phrase } = getOrCreateHotWallet();
    console.log('Wallet: ', wallet);
    console.log('Address: ', address);
    console.log('Phrase: ', phrase);
  }, []);

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

  const handleUsernameSubmit = () => {
    setShowQRCode(true);
  };

  return (
    <AuthContainer>
      {!showQRCode ? (
        <UsernameFormComponent
          username={username}
          setUsername={setUsername}
          onSubmit={handleUsernameSubmit}
        />
      ) : (
        <QRCodeAuthentication
          username={username}
          clientId={clientId}
          qrData={qrData}
          status={status}
          statusMessage={statusMessage}
        />
      )}

      {/* <UserInfo user={user} /> */}
    </AuthContainer>
  );
};

const AuthContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: monospace;
`;

// User Info Component
export const UserInfo = ({ user }: { user: any }) => {
  if (!user) return null;

  return (
    <UserInfoContainer>
      <p>Currently logged in as: {user.name}</p>
      <p>
        Last login:{' '}
        {formatDate(user.last_login || new Date().toISOString(), true)}
      </p>
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 2rem;
  width: 100%;
`;

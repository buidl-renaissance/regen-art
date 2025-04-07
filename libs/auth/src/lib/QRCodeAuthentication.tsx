import QRCode from 'react-qr-code';
import styled from 'styled-components';

// QR Code Authentication Component
export const QRCodeAuthentication = ({
  username,
  clientId,
  qrData,
  status,
  statusMessage,
}: {
  username: string;
  clientId: string;
  qrData: string;
  status: 'waiting' | 'success' | 'error';
  statusMessage: string;
}) => {
  return (
    <>
      <Instructions>
        Scan this QR code with your DPoP-compatible mobile app to authenticate
        securely without sharing your password.
      </Instructions>

      <QRCodeContainer>
        <QRCode value={qrData} size={256} />
        <ClientIdDisplay>
            <div className="username">{username}</div>
            <div className="client-id">{clientId}</div>
        </ClientIdDisplay>
      </QRCodeContainer>


      <StatusMessage
        isSuccess={status === 'success'}
        isError={status === 'error'}
      >
        {statusMessage}
      </StatusMessage>
    </>
  );
};

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
  line-height: 1.2;
  text-align: center;
  max-width: 360px;
  font-size: 0.8rem;
  font-family: monospace;
`;

const ClientIdDisplay = styled.div`
  margin-top: 1rem;
  /* margin: 1rem 0; */
  /* padding: 0.5rem; */
  color: #000;
  /* background-color: #f5f5f5; */
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
  word-break: break-all;
  text-align: center;
  .client-id {
    font-size: 0.4rem;
  }
`;

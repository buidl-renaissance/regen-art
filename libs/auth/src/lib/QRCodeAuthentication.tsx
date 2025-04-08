import QRCode from 'react-qr-code';
import styled from 'styled-components';

// QR Code Authentication Component
export const QRCodeAuthentication = ({
  handle,
  clientId,
  qrData,
  status,
  statusMessage,
  instructions,
  size = 256,
}: {
  handle: string;
  clientId: string;
  qrData: string;
  status: 'waiting' | 'success' | 'error';
  statusMessage?: string;
  instructions?: string;
  size?: number;
}) => {
  return (
    <QRAuthContainer>
      {instructions && (
        <Instructions>
          {instructions}
        </Instructions>
      )}

      <QRCodeContainer size={size}>
        <QRCode value={qrData} size={size} />
      </QRCodeContainer>
      <ClientIdDisplay>
        <div className="handle">{handle}</div>
        <div className="client-id">{clientId}</div>
      </ClientIdDisplay>

      {statusMessage && (
        <StatusMessage
          isSuccess={status === 'success'}
          isError={status === 'error'}
          size={size}
        >
          {statusMessage}
        </StatusMessage>
      )}
    </QRAuthContainer>
  );
};

const QRAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem auto;
`;

const QRCodeContainer = styled.div<{ size: number }>`
  margin: ${props => props.size <= 128 ? '0rem' : '2rem'} auto;
  width: max-content;
  padding: ${props => props.size <= 128 ? '1rem' : '1.5rem'};
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StatusMessage = styled.div<{ isSuccess?: boolean; isError?: boolean; size: number }>`
  margin: ${props => props.size <= 128 ? '0.75rem' : '1.5rem'} 0;
  padding: ${props => props.size <= 128 ? '0.5rem' : '1rem'};
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
  color: #fff;
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

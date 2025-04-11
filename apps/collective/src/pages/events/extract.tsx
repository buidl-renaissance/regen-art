import { useState } from 'react';
import styled from 'styled-components';

// Define styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  margin-bottom: 1.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.primary ? '#3182ce' : '#e2e8f0')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? '#2c5282' : '#cbd5e0')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResultBox = styled.div`
  padding: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow-x: auto;
`;

const Pre = styled.pre`
  margin: 0;
`;

export default function EventExtractor() {
  const [htmlInput, setHtmlInput] = useState('');
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = () => {
    if (!htmlInput.trim()) {
      setError('Please paste HTML content first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      fetch('/api/ai/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: htmlInput }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `API request failed with status ${response.status}`
            );
          }
          return response.json();
        })
        .then((result) => {
          if (result.error) {
            throw new Error(result.error);
          }
          setExtractedData(result.data);
          setIsLoading(false);
        })
        .catch((err) => {
          const errorMessage =
            err instanceof Error
              ? err.message
              : 'Could not extract event data from HTML';
          setError(errorMessage);
          setIsLoading(false);
        });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Could not extract event data from HTML';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setHtmlInput('');
    setExtractedData(null);
    setError(null);
  };

  return (
    <Container>
      <Title>Event Data Extractor</Title>
      <Description>
        Paste HTML content containing event information below to extract
        structured data.
      </Description>

      {error && <Description style={{ color: 'red' }}>{error}</Description>}

      <div>
        <Subtitle>Input HTML</Subtitle>
        <TextArea
          value={htmlInput}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setHtmlInput(e.target.value)
          }
          placeholder="Paste HTML content here..."
        />
        <ButtonGroup>
          <Button primary onClick={handleExtract} disabled={isLoading}>
            {isLoading ? 'Extracting...' : 'Extract Data'}
          </Button>
          <Button onClick={handleClear}>Clear</Button>
        </ButtonGroup>
      </div>

      {extractedData && (
        <div>
          <Subtitle>Extracted Data</Subtitle>
          <ResultBox>
            <Pre>{JSON.stringify(extractedData, null, 2)}</Pre>
          </ResultBox>
        </div>
      )}
    </Container>
  );
}

import styled from 'styled-components';
import { FaUpload } from 'react-icons/fa';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: 'Inter', sans-serif;
  background: #121212;
  padding: 1rem;
`;

export const Header = styled.div`
  margin-bottom: 3rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

export const FormContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

export const UploadSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const UploadIcon = styled(FaUpload)`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ff3366;
`;

export const UploadText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

export const UploadSubtext = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  margin-top: 1rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 0.75rem;
  color: white;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;

  &:focus {
    outline: none;
    border-color: #ff3366;
  }
`;

export const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  min-height: 100px;
  padding: 0.75rem;
  resize: vertical;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #ff3366;
  }
`;

export const Button = styled.button`
  background: #ff3366;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem auto;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const BackButtonContainer = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export const BackButton = styled.button`
  background: transparent;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const NextButton = styled.button`
  background: #ff3366;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #e62e5c;
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin: 3rem 0;
`;

export const ErrorMessage = styled.div`
  color: #ff3366;
  background: rgba(255, 51, 102, 0.1);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const SuccessMessage = styled.div`
  color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 300px;
  }
`;

export const EditButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3a7bc8;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.6rem 1rem;
  }
`;

export const LogoutButton = styled.button`
  background-color: #ff3366;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e62958;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.6rem 1rem;
  }
`;

export const Section = styled.section`
  margin-bottom: 3rem;
  border-left: 3px solid #444;
  padding-left: 1.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const EventGridItem = styled.div`
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

export const EmptyState = styled.p`
  color: #aaaaaa;
  font-style: italic;
  text-align: center;
  padding: 2rem 0;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    padding: 1.5rem 0;
    font-size: 1rem;
  }
`;

export const Value = styled.span`
  color: #aaaaaa;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ErrorDisplay = styled.div`
  text-align: center;
  color: #ff3366;
  margin: 3rem 0;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    margin: 2rem 0;
    font-size: 1.25rem;
  }
`;

export const BackLink = styled.a`
  color: #ff3366;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 1rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
  }
`;

export const CenteredContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

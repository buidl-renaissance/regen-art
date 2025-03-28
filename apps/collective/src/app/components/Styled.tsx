import styled from 'styled-components';
import { FaUpload } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: 'Inter', sans-serif;
  background: #121212;
  padding: 1rem;
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const FormContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const UploadSection = styled.div`
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

const UploadIcon = styled(FaUpload)`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #ff3366;
`;

const UploadText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const UploadSubtext = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  margin-top: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem auto;
  gap: 1rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const BackButton = styled.button`
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

const NextButton = styled.button`
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

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin: 3rem 0;
`;

const ErrorMessage = styled.div`
  color: #ff3366;
  background: rgba(255, 51, 102, 0.1);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export {
  Container,
  Header,
  Title,
  Subtitle,
  FormContainer,
  UploadSection,
  UploadIcon,
  UploadText,
  UploadSubtext,
  PreviewImage,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonContainer,
  BackButton,
  NextButton,
  ErrorMessage,
  SuccessMessage,
  LoadingMessage,
};

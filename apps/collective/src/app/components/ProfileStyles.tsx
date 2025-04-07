import styled from 'styled-components';

const CreateProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  /* background-color: #1a1a1a; */
  color: #f5f5f5;
  font-family: monospace;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #f5f5f5;
  line-height: 1.1;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
`;

const FormContainer = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 6px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 0.8rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  color: #f5f5f5;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #333;
  color: #f5f5f5;

  &:focus {
    outline: none;
    border-color: #96885f;
    box-shadow: 0 0 0 2px rgba(150, 136, 95, 0.25);
  }

  &:disabled {
    background-color: #2a2a2a;
    color: #888;
    cursor: not-allowed;
    border-color: #3a3a3a;
  }

  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #96885f;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 0.5rem;

  &:hover {
    background-color: #7a6e4e;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #444;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
    margin-top: 0rem;
  }
`;

const HelpText = styled.p`
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 0.5rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
`;

const ProfileImage = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 0.8rem;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

const ProfilePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff3366;
  color: white;
  font-size: 2.2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ProfileTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0.4rem 0;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ProfileEmail = styled.p`
  font-size: 1rem;
  color: #cccccc;
  margin: 0.2rem 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProfileOrganization = styled.p`
  font-size: 1rem;
  color: #cccccc;
  margin: 0.2rem 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ProfileBio = styled.p`
  font-size: 0.95rem;
  color: #dddddd;
  margin: 0.8rem 0;
  max-width: 600px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    max-width: 100%;
  }
`;

const ProfileSection = styled.section`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
  }
`;

const ProfileInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #333;
  color: #f5f5f5;
  font-size: 0.95rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 0 2px rgba(102, 102, 102, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.9rem;
    min-height: 100px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  margin: 2rem 0 1rem;
  color: #f5f5f5;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 1.5rem 0 0.8rem;
  }
`;

const SocialInputContainer = styled.div`
  position: relative;
`;

const SocialIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 1.1rem;
`;

const SocialInput = styled(Input)`
  padding-left: 2.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    margin-top: 1.8rem;
  }
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 0.8rem 1.5rem;
  border: ${props => props.primary ? 'none' : '1px solid #666'};
  border-radius: 4px;
  background-color: ${props => props.primary ? '#3a86ff' : 'transparent'};
  color: ${props => props.primary ? '#fff' : '#f5f5f5'};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#2a76ef' : '#333'};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

export {
  ProfileBio,
  ProfileEmail,
  ProfileHeader,
  ProfileImage,
  ProfileInfo,
  ProfileInfoItem,
  ProfileOrganization,
  ProfilePlaceholder,
  ProfileSection,
  ProfileTitle,
  CreateProfileContainer,
  PageTitle,
  FormContainer,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  HelpText,
  SocialInputContainer,
  SocialIcon,
  SocialInput,
  ButtonContainer,
  SectionTitle,
  TextArea,
  Button
};

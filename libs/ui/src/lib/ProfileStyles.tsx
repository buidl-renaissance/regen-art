import styled from 'styled-components';

export const ProfileContainer = styled.div`
  background-color: #2a2a2a;
  color: #f5f5f5;
  font-family: monospace;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 0rem;
  }
`;

export const CreateProfileContainer = styled.div`
  background-color: #2a2a2a;
  color: #f5f5f5;
  font-family: monospace;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0rem;
    border-radius: 0;
  }
`;

export const PageTitle = styled.h1`
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

export const ProfileFormContainer = styled.div`
  padding: 2rem;
  min-height: 100vh;
  margin: auto;
  max-width: 800px;
  /* @media (max-width: 768px) {
    padding: 0rem;
  } */
`;

export const ProfileFormGroup = styled.div`
  margin-bottom: 0.8rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

export const ProfileLabel = styled.label`
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

export const ProfileInput = styled.input`
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

export const ProfileSubmitButton = styled.button`
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

export const ProfileHelpText = styled.p`
  font-size: 0.75rem;
  color: #aaa;
  margin-top: 0.5rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
`;

export const ProfileImage = styled.div`
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

export const ProfilePlaceholder = styled.div`
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

export const ProfileTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0.4rem 0;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const ProfileEmail = styled.p`
  font-size: 1rem;
  color: #cccccc;
  margin: 0.2rem 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ProfileOrganization = styled.p`
  font-size: 1rem;
  color: #cccccc;
  margin: 0.2rem 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ProfileBio = styled.p`
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

export const ProfileSection = styled.section`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
  }
`;

export const ProfileInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
`;

export const ProfileTextArea = styled.textarea`
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

export const ProfileSectionTitle = styled.h2`
  font-size: 1.4rem;
  margin: 2rem 0 1rem;
  color: #f5f5f5;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 1.5rem 0 0.8rem;
  }
`;

export const SocialInputContainer = styled.div`
  position: relative;
`;

export const SocialIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 1.1rem;
`;

export const SocialInput = styled(ProfileInput)`
  padding-left: 2.5rem;
`;

export const ProfileButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1.8rem;
  }
`;

export const ProfileButton = styled.button<{ primary?: boolean }>`
  padding: 0.8rem 1.5rem;
  border: ${(props) => (props.primary ? 'none' : '1px solid #666')};
  border-radius: 4px;
  background-color: ${(props) => (props.primary ? '#3a86ff' : 'transparent')};
  color: ${(props) => (props.primary ? '#fff' : '#f5f5f5')};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.primary ? '#2a76ef' : '#333')};
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


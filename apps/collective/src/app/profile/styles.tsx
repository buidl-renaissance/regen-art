import styled from 'styled-components';

const CenteredContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
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
  font-size: 2.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProfileTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const ProfileEmail = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin: 0.25rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProfileOrganization = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin: 0.25rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProfileBio = styled.p`
  font-size: 1rem;
  color: #dddddd;
  margin: 1rem 0;
  max-width: 600px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    max-width: 100%;
  }
`;

const ButtonGroup = styled.div`
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

const EditButton = styled.button`
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

const LogoutButton = styled.button`
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

const ProfileSection = styled.section`
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const ProfileInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

const SectionTitle = styled.h2`
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

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const EventGridItem = styled.div`
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

const EmptyState = styled.p`
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

const LoadingMessage = styled.h2`
  text-align: center;
  color: #ffffff;
  margin: 3rem 0;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    margin: 2rem 0;
    font-size: 1.25rem;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Value = styled.span`
  color: #aaaaaa;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ErrorDisplay = styled.div`
  text-align: center;
  color: #ff3366;
  margin: 3rem 0;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    margin: 2rem 0;
    font-size: 1.25rem;
  }
`;

const BackLink = styled.a`
  color: #FF3366;
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


export {
  BackLink,
  ButtonGroup,
  CenteredContent,
  EditButton,
  EmptyState,
  ErrorDisplay,
  EventGrid,
  EventGridItem,
  Label,
  LoadingMessage,
  LogoutButton,
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
  SectionTitle,
  Value,
};

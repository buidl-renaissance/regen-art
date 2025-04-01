import styled from 'styled-components';

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
};

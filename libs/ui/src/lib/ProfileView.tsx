import React from 'react';
import styled from 'styled-components';
import { useClient } from '@gods.work/auth';
import { QRCodeAuthentication } from '@gods.work/auth';
import { ProfileData } from '@gods.work/utils';
import Link from 'next/link';
import { ProfileButton } from './ProfileStyles';
// import { ArtworkCard } from '@/libs/ui/src/lib/ArtworkCard';
// import ArtworkGallery from './ArtworkGallery';
import { FaXTwitter, FaInstagram, FaGithub, FaGlobe, FaLinkedin, FaPlus } from 'react-icons/fa6';

interface ProfileViewProps {
  profileData: ProfileData;
  showVerifyButton?: boolean;
  showEditProfile?: boolean;
  isCurrentUser?: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profileData,
  showVerifyButton = false,
  showEditProfile = false,
  isCurrentUser = false,
}: ProfileViewProps) => {
  const { clientId } = useClient();

  if (!profileData) {
    return <ProfileContainer>Loading profile...</ProfileContainer>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileInfoContainer>
          <ProfileImageAndInfoWrapper>
            {profileData.profileImage ? (
              <ProfileImage
                src={profileData.profileImage}
                alt={profileData.handle}
              />
            ) : (
              isCurrentUser && (
                <EmptyProfileImage>
                  <Link href="/profile/edit" passHref>
                    <AddImageButton>
                      <FaPlus />
                    </AddImageButton>
                  </Link>
                </EmptyProfileImage>
              )
            )}
            <ProfileInfoContent>
              <ProfileName>@{profileData.handle}</ProfileName>
              <ButtonContainer>
                {showEditProfile && (
                  <Link href="/profile/edit" passHref>
                    <EditProfileButton>Edit Profile</EditProfileButton>
                  </Link>
                )}
                {showVerifyButton && (
                  <Link href="/profile/verify" passHref>
                    <VerifyButton>Verify</VerifyButton>
                  </Link>
                )}
              </ButtonContainer>
            </ProfileInfoContent>
          </ProfileImageAndInfoWrapper>
        </ProfileInfoContainer>
      </ProfileHeader>

      {(profileData.socialLinks &&
        Object.values(profileData.socialLinks).some((link) => link)) || profileData.website ? (
          <SocialLinksContainer>
            {profileData.website && (
              <SocialLink
                href={profileData.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe />
              </SocialLink>
            )}
            {profileData.socialLinks?.twitter && (
              <SocialLink
                href={`https://x.com/${profileData.socialLinks.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter />
              </SocialLink>
            )}
            {profileData.socialLinks?.linkedin && (
              <SocialLink
                href={`${profileData.socialLinks.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </SocialLink>
            )}
            {profileData.socialLinks?.instagram && (
              <SocialLink
                href={`${profileData.socialLinks.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </SocialLink>
            )}
            {profileData.socialLinks?.github && (
              <SocialLink
                href={`${profileData.socialLinks.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </SocialLink>
            )}
          </SocialLinksContainer>
      ) : (
        isCurrentUser && (
          <SocialLinksContainer>
            <AddButton>Add social links <FaPlus style={{ marginLeft: '5px' }} /></AddButton>
          </SocialLinksContainer>
        )
      )}

      {profileData.bio ? (
        <ProfileSection>
          <SectionTitle>About</SectionTitle>
          <ProfileBio>{profileData.bio}</ProfileBio>
        </ProfileSection>
      ) : (
        isCurrentUser && (
          <ProfileSection>
            <SectionTitle>About</SectionTitle>
            <EmptySection>
              <Link href="/profile/edit" passHref>
                <AddButton>Add bio <FaPlus style={{ marginLeft: '5px' }} /></AddButton>
              </Link>
            </EmptySection>
          </ProfileSection>
        )
      )}

      <QRCodeContainer>
        <QRCodeWrapper>
          <QRCodeAuthentication
            handle={profileData.handle}
            clientId={clientId}
            qrData={JSON.stringify({
              handle: profileData.handle,
              client_id: clientId,
              timestamp: Date.now(),
            })}
            status="waiting"
            instructions="Scan to connect"
            size={120}
          />
        </QRCodeWrapper>
      </QRCodeContainer>

      {/* {profileData.artworks && profileData.artworks.length > 0 ? (
        <ArtworkGallery artworks={profileData.artworks} />
      ) : (
        isCurrentUser && (
          <ProfileSection>
            <SectionTitle>Artwork Gallery</SectionTitle>
            <EmptySection>
              <Link href="/profile/artwork/add" passHref>
                <AddButton>Add artwork <FaPlus style={{ marginLeft: '5px' }} /></AddButton>
              </Link>
            </EmptySection>
          </ProfileSection>
        )
      )} */}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  font-family: monospace;
  color: #f5f5f5;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.5rem 1rem;

  /* @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  } */
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  /* @media (max-width: 480px) {
    align-items: center;
    width: 100%;
  } */
`;

const ProfileImageAndInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const ProfileInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QRCodeContainer = styled.div`
  display: none;
  justify-content: center;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    display: flex;
  }
`;

const QRCodeWrapper = styled.div`
  border-radius: 8px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #444;

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const EmptyProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #2a2a2a;
  border: 3px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const AddImageButton = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5f5f5;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #6c9fff;
  }
`;

const EmptySection = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

const AddButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #6c9fff;
  border: 1px dashed #6c9fff;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: monospace;
  transition: all 0.2s ease;
  text-decoration: none;
  
  &:hover {
    background-color: rgba(108, 159, 255, 0.1);
  }
`;

const ProfileName = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  text-align: left;

  @media (max-width: 480px) {
    font-size: 1.4rem;
    text-align: center;
  }
`;

const EditProfileButton = styled.button`
  background-color: transparent;
  color: #6c9fff;
  border: 1px solid #6c9fff;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  cursor: pointer;
  font-family: monospace;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(108, 159, 255, 0.1);
  }
`;

const ProfileSection = styled.section`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2a2a2a;
  border-radius: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #444;
  padding-bottom: 0.5rem;
  text-align: left;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const ProfileBio = styled.p`
  line-height: 1.5;
  margin: 0;
  word-break: break-word;
  font-size: 0.95rem;
`;

const SocialLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  width: 100%;
`;

const SocialLink = styled.a`
  color: #6c9fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #2a2a2a;
  transition: all 0.2s ease;

  &:hover {
    background-color: #3a3a3a;
    transform: translateY(-3px);
    color: #8cb0ff;
  }
`;

const VerifyButton = styled(ProfileButton)`
  display: inline-block;
  text-decoration: none;
  text-align: center;
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  background-color: #4caf50;
  border: 1px solid #4caf50;

  &:hover {
    background-color: #45a049;
  }
`;

import React from 'react';
import styled from 'styled-components';
import { useClient } from '@gods.work/auth';
import { QRCodeAuthentication } from '@gods.work/auth';
import { ProfileData } from '@gods.work/utils';
import Link from 'next/link';
import { ProfileButton } from './ProfileStyles';
// import { ArtworkCard } from '@/libs/ui/src/lib/ArtworkCard';
import ArtworkGallery from './ArtworkGallery';
import { FaTwitter, FaInstagram, FaGithub, FaGlobe } from 'react-icons/fa';

interface ProfileViewProps {
  profileData: ProfileData;
  showVerifyButton?: boolean;
  showEditProfile?: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profileData,
  showVerifyButton = false,
  showEditProfile = false,
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
            {profileData.profileImage && (
              <ProfileImage
                src={profileData.profileImage}
                alt={profileData.handle}
              />
            )}
            <ProfileInfoContent>
              <ProfileName>@{profileData.handle}</ProfileName>
              <ButtonContainer>
                {showEditProfile && (
                  <Link href="/profile/edit" passHref>
                    <EditProfileButton>
                      Edit Profile
                    </EditProfileButton>
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

      {profileData.bio && (
        <ProfileSection>
          <SectionTitle>About</SectionTitle>
          <ProfileBio>{profileData.bio}</ProfileBio>
        </ProfileSection>
      )}

      {profileData.website && (
        <ProfileSection>
          <SectionTitle>Website</SectionTitle>
          <ProfileLink
            href={profileData.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGlobe style={{ marginRight: '8px' }} />
            {profileData.website}
          </ProfileLink>
        </ProfileSection>
      )}

      {profileData.socialLinks &&
        Object.values(profileData.socialLinks).some((link) => link) && (
          <ProfileSection>
            <SectionTitle>Social Links</SectionTitle>
            <SocialLinksContainer>
              {profileData.socialLinks.twitter && (
                <SocialLink
                  href={`https://twitter.com/${profileData.socialLinks.twitter}`}
                  target="_blank"
                >
                  <FaTwitter style={{ marginRight: '8px' }} />
                  @{profileData.socialLinks.twitter}
                </SocialLink>
              )}
              {profileData.socialLinks.instagram && (
                <SocialLink
                  href={`https://instagram.com/${profileData.socialLinks.instagram}`}
                  target="_blank"
                >
                  <FaInstagram style={{ marginRight: '8px' }} />
                  @{profileData.socialLinks.instagram}
                </SocialLink>
              )}
              {profileData.socialLinks.github && (
                <SocialLink
                  href={`https://github.com/${profileData.socialLinks.github}`}
                  target="_blank"
                >
                  <FaGithub style={{ marginRight: '8px' }} />
                  {profileData.socialLinks.github}
                </SocialLink>
              )}
            </SocialLinksContainer>
          </ProfileSection>
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

      {profileData.artworks && profileData.artworks.length > 0 && (
        <ArtworkGallery artworks={profileData.artworks} />
      )}
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
  margin-bottom: 1.5rem;
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
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
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

const ProfileLink = styled.a`
  color: #6c9fff;
  text-decoration: none;
  word-break: break-all;
  display: flex;
  align-items: center;
  padding: 0.25rem 0;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  width: 100%;
`;

const SocialLink = styled.a`
  color: #6c9fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
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

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaGithub, FaGlobe, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { ProfileData } from '@gods.work/utils';

interface ProfileCardProps {
  profile: ProfileData;
  tags?: string[];
  linkUrl?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, tags, linkUrl }) => {
  return (
    <Card>
      <Avatar>
        {profile.profileImage ? (
          <img src={profile.profileImage} alt={profile.name || ''} />
        ) : (
          <div className="placeholder">{profile.name ? profile.name.charAt(0) : profile.handle.charAt(0)}</div>
        )}
      </Avatar>
      <CardContent>
        <Name>{profile.name || profile.handle}</Name>
        {profile.organization && <Organization>{profile.organization}</Organization>}
        {profile.bio && <Bio>{profile.bio}</Bio>}
        
        {tags && tags.length > 0 && (
          <Tags>
            {tags.slice(0, 3).map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
            {tags.length > 3 && <Tag>+{tags.length - 3}</Tag>}
          </Tags>
        )}
        
        <SocialLinks>
          {profile.website && (
            <SocialLink href={profile.website} target="_blank" rel="noopener noreferrer">
              <FaGlobe />
            </SocialLink>
          )}
          {profile.socialLinks?.github && (
            <SocialLink href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
          )}
          {profile.socialLinks?.twitter && (
            <SocialLink href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
          )}
          {profile.socialLinks?.linkedin && (
            <SocialLink href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialLink>
          )}
          {profile.socialLinks?.instagram && (
            <SocialLink href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialLink>
          )}
        </SocialLinks>
        
        {linkUrl && (
          <ViewButton href={linkUrl}>
            View Profile
          </ViewButton>
        )}
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  background: #222222;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
  }
`;

const Avatar = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0078d4;
    color: #ffffff;
    font-size: 3rem;
    font-weight: 700;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Name = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #f5f5f5;
`;

const Organization = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  color: #b0b0b0;
  margin-bottom: 0.75rem;
`;

const Bio = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  color: #d0d0d0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background: #333333;
  color: #e0e0e0;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #444444;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SocialLink = styled.a`
  color: #a0a0a0;
  font-size: 1.25rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #3a97e8;
  }
`;

const ViewButton = styled(Link)`
  margin-top: auto;
  background: transparent;
  color: #e0e0e0;
  border: 2px solid #3a97e8;
  text-align: center;
  padding: 0.75rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: #3a97e8;
    color: #ffffff;
  }
`;

export default ProfileCard;

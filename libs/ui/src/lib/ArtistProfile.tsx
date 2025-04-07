import { Artist } from '@gods.work/utils';
import React from 'react';
import styled from 'styled-components';

interface ArtistProfileProps {
  artist: Artist;
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 2px solid #444;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ArtistName = styled.h2`
  font-size: 1.5rem;
  margin: 0.5rem 0;
  color: #333;
`;

const ArtistBio = styled.p`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  line-height: 1.5;
  margin-top: 0.5rem;
`;

export const ArtistProfile: React.FC<ArtistProfileProps> = ({ artist }) => {
  return (
    <ProfileContainer className="artist-profile">
      {artist.profile_picture && (
        <ProfileImage>
          <img src={artist.profile_picture} alt={artist.name} />
        </ProfileImage>
      )}
      <ArtistName>{artist.name}</ArtistName>
      <ArtistBio>{artist.bio}</ArtistBio>
    </ProfileContainer>
  );
};

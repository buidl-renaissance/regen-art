import { DAArtist } from '@gods.work/utils';
import React from 'react';

interface ArtistProfileProps {
  artist: DAArtist;
}

export const ArtistProfile: React.FC<ArtistProfileProps> = ({ artist }) => {
  return (
    <div className="artist-profile">
      <h2>{artist.name}</h2>
      <p>{artist.bio}</p>
      {artist.profile_picture && (
        <img src={artist.profile_picture} alt={artist.name} />
      )}
    </div>
  );
};

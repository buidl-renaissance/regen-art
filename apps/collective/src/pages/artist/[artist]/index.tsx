import React from 'react';
import styled from '@emotion/styled';
import { Artist, convertDefaultToResized } from '@gods.work/utils';
import { getArtist } from '@gods.work/utils';
import { ArtworkCard } from '@gods.work/ui';
import { Metadata } from 'next';
import { BackButtonContainer, BackLink } from '../../../app/components/Styled';

interface ArtistPageProps {
  artist: Artist;
}

const ArtistPage = ({ artist }: ArtistPageProps) => {
  return (
    <PageWrapper>
      <BackButtonContainer>
        <BackLink href="/artists">← Back to Artists</BackLink>
      </BackButtonContainer>
      <ArtistHeader>
        <div className="artist-grid">
          <div className="artist-image">
            <img src={artist.profile_picture} alt={artist.name} />
          </div>
          <div className="artist-details">
            <div className="title-row">
              <h1>{artist.name}</h1>
              {/* <ButtonLink href={`/artist/${artist.slug}/edit`}>Edit</ButtonLink> */}
            </div>
            <p className="artist-bio">{artist.bio}</p>
          </div>
        </div>
      </ArtistHeader>

      <ArtistWorks>
        <h2>Works</h2>
        <div className="works-grid">
          {artist.artwork?.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </ArtistWorks>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
`;

const ArtistHeader = styled.div`
  margin: 2rem 0;

  .artist-grid {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .artist-image {
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .artist-details {
    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 2.5rem;
      margin: 0;
    }

    .artist-bio {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #333;
    }
  }
`;

const ArtistWorks = styled.section`
  margin: 4rem 0;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .works-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
`;

export const getMetadata = (artist: Artist): Metadata => {
  return {
    title: `${artist.name} | Art Night Detroit`,
    description: artist.bio,
    openGraph: {
      title: `${artist.name} | Art Night Detroit`,
      description: artist.bio,
      images: [{ url: convertDefaultToResized(artist.profile_picture) }],
      url: `https://artnightdetroit.com/artist/${artist.slug}`,
    },
  };
};

export async function getServerSideProps({
  params,
}: {
  params: { artist: string };
}) {
  const artist = await getArtist(params.artist);
  const metadata = getMetadata(artist);
  return {
    props: {
      artist: artist,
      metadata: metadata,
    },
  };
}

export default ArtistPage;

import styled from 'styled-components';
import Link from 'next/link';
import { getArtists, Artist } from '@gods.work/utils';
import { ArtistProfile } from '@gods.work/ui';
import { Metadata } from 'next';
import { Header, Subtitle, Title } from '../../app/components/Styled';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ArtistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const ArtistCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ArtistLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin: 2rem auto;
  max-width: 600px;
`;

const CreateButton = styled(Link)`
  display: inline-block;
  background-color: #96885f;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #7a6e4e;
  }
`;

export const metadata: Metadata = {
  title: 'Artists | Art Night Detroit',
  description: 'Discover talented artists in the Art Night Detroit community',
  openGraph: {
    title: 'Artists | Art Night Detroit',
    description: 'Discover talented artists in the Art Night Detroit community',
    type: 'website',
  },
};

export async function getServerSideProps() {
  const artists = await getArtists();

  return {
    props: {
      artists,
      metadata,
    },
  };
}

export default function ArtistsPage({ artists }: { artists: Artist[] }) {
  return (
    <Container>
      <Header>
        <Title>Artists</Title>
        <Subtitle>
          Discover talented creators in the Art Night Detroit community
        </Subtitle>
      </Header>

      {artists && artists.length > 0 ? (
        <ArtistsGrid>
          {artists.map((artist) => (
            <ArtistCard key={artist.id}>
              <ArtistLink href={`/artist/${artist.slug}`}>
                <ArtistProfile artist={artist} />
              </ArtistLink>
            </ArtistCard>
          ))}
        </ArtistsGrid>
      ) : (
        <EmptyState>
          <h2>No artists found</h2>
          <p>Be the first to join our creative community!</p>
          <CreateButton href="/artist/create">
            Create Artist Profile
          </CreateButton>
        </EmptyState>
      )}
    </Container>
  );
}

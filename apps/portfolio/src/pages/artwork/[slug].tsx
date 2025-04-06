import styled from 'styled-components';
import { getArtwork, Artwork } from '@gods.work/utils';
import Head from 'next/head';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface ArtworkDetailPageProps {
  artwork: Artwork;
}

export default function ArtworkDetailPage({ artwork }: ArtworkDetailPageProps) {
  return (
    <StyledPage>
      <Head>
        <title>{artwork.title} | Artwork Gallery</title>
        <meta name="description" content={artwork.description} />
      </Head>

      <Link href="/artwork" passHref>
        <BackButton>
          <FaArrowLeft /> Back to Gallery
        </BackButton>
      </Link>

      <ArtworkContainer>
        <ImageContainer>
          <img src={artwork.data.image} alt={artwork.title} />
        </ImageContainer>

        <ArtworkDetails>
          <ArtworkTitle>{artwork.title}</ArtworkTitle>
          {artwork.artist && <ArtistName>by {artwork.artist.name}</ArtistName>}
          <Description>{artwork.description}</Description>

          <MetaInfo>
            {artwork.data.category && (
              <MetaItem>
                <span>Category:</span> {artwork.data.category}
              </MetaItem>
            )}
            {artwork.collaborators && artwork.collaborators.length > 0 && (
              <MetaItem>
                <span>Collaborators:</span>
                {artwork.collaborators
                  .map((collaborator) => collaborator.name)
                  .join(', ')}
              </MetaItem>
            )}
          </MetaInfo>
        </ArtworkDetails>
      </ArtworkContainer>
    </StyledPage>
  );
}

export const getMetadata = async (artwork: Artwork) => {
  return {
    title: `${artwork.title} | ${artwork.artist?.name || 'Artwork Gallery'}`,
    description:
      artwork.description || 'View this beautiful artwork in our gallery',
    openGraph: {
      title: artwork.title,
      description:
        artwork.description || 'View this beautiful artwork in our gallery',
      images: [
        {
          url: artwork.data.image || '',
          width: 1200,
          height: 630,
          alt: artwork.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: artwork.title,
      description:
        artwork.description || 'View this beautiful artwork in our gallery',
      images: [artwork.data.image || ''],
    },
  };
};

export const getServerSideProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  const artwork = await getArtwork(slug);
  const metadata = await getMetadata(artwork);
  return { props: { artwork, metadata } };
};

const StyledPage = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackButton = styled.a`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: #96885f;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #7a6e4e;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const ArtworkContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ArtworkDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArtworkTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ArtistName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #96885f;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
`;

const MetaInfo = styled.div`
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const MetaItem = styled.div`
  margin-bottom: 1rem;

  span {
    font-weight: 500;
    color: #333;
    margin-right: 0.5rem;
  }
`;

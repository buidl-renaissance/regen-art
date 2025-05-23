import React, { Suspense } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';
import Link from 'next/link';
import { Artwork, convertDefaultToResized, getArtwork } from '@gods.work/utils';
import {
  BackLink,
  BackButtonContainer,
  Subtitle,
  Title,
} from '../../../app/components/Styled';
import { Metadata } from 'next';

export const getMetadata = (artwork: Artwork): Metadata => {
  return {
    title: `${artwork.title} | Art Night Detroit`,
    description: artwork.description,
    openGraph: {
      title: `${artwork.title} | Art Night Detroit`,
      description: artwork.description,
      images: [{ url: convertDefaultToResized(artwork.data?.image || '') }],
      url: `https://artnightdetroit.com/artwork/${artwork.slug}`,
    },
  };
};

const ArtworkPage = ({ artwork }: { artwork: Artwork }) => {
  return (
    <PageWrapper>
      <BackButtonContainer>
        <BackLink href="/artwork">← Back to Artworks</BackLink>
      </BackButtonContainer>
      <ArtworkHeader>
        <div className="artwork-grid">
          <div className="artwork-image">
            <img
              src={convertDefaultToResized(artwork.data?.image || '')}
              alt={artwork.title}
            />
          </div>
          <div className="artwork-details">
            <Title dangerouslySetInnerHTML={{ __html: artwork.title }} />
            <Subtitle className="artwork-description">
              {artwork.description}
            </Subtitle>

            <div className="credits">
              {artwork.artist && (
                <div className="artist-info">
                  <span>By</span>
                  <Link href={`/artist/${artwork.artist.slug}`}>
                    <img
                      src={artwork.artist.profile_picture}
                      alt={artwork.artist.name}
                      className="profile-pic"
                    />
                    <span className="name">{artwork.artist.name}</span>
                  </Link>
                </div>
              )}

              {artwork.collaborators && artwork.collaborators.length > 0 && (
                <div className="collaborators">
                  <span>Collaborators</span>
                  <div className="collaborator-list">
                    {artwork.collaborators.map((collaborator, i) => (
                      <div key={collaborator.id} className="collaborator">
                        <Link href={`/artists/${collaborator.slug}`}>
                          <img
                            src={collaborator.profile_picture}
                            alt={collaborator.name}
                            className="profile-pic"
                          />
                          <span className="name">{collaborator.name}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <UploadButton>
              <Link href={`/artwork/${artwork.slug}/upload`}>
                Upload Content
              </Link>
            </UploadButton>
          </div>
        </div>
      </ArtworkHeader>

      {artwork.content &&
        artwork.content.length > 0 &&
        artwork.content?.map((content, i: number) => {
          return (
            <ContentWrapper key={i}>
              <Suspense>
                <div className="timestamp">
                  {moment
                    .utc(content.timestamp)
                    .local()
                    .format('dddd MMMM Do, YYYY – h:mm a')}
                </div>
              </Suspense>
              {content.data.type === 'image/jpeg' && (
                <>
                  {content.caption && (
                    <div className="caption">{content.caption}</div>
                  )}
                  <img src={content.data.url} />
                </>
              )}
              {content.data.type === 'video/mp4' && (
                <>
                  {content.caption && (
                    <div className="caption">{content.caption}</div>
                  )}
                  <video controls preload="metadata">
                    <source
                      src={`${content.data.url}#t=0.1`}
                      type="video/mp4"
                    ></source>
                  </video>
                </>
              )}
              {content.data.type === 'youtube' && (
                <>
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${content.data.youtubeId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {content.caption && (
                    <div className="caption">{content.caption}</div>
                  )}
                </>
              )}
            </ContentWrapper>
          );
        })}
    </PageWrapper>
  );
};

const UploadButton = styled.div`
  margin: 1rem 0;

  a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #333;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.9rem;

    &:hover {
      background-color: #444;
    }
  }
`;

const ArtworkHeader = styled.div`
  margin: 2rem 1rem;

  .artwork-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0rem;

    @media (min-width: 768px) {
      gap: 2rem;
      grid-template-columns: 1fr 1.5fr;
    }
  }

  .artwork-image {
    img {
      width: 100%;
      max-height: 500px;
      object-fit: contain;
      padding: 0;
    }
  }

  .credits {
    margin: 1rem 0;
    font-size: 0.9rem;
    color: #666;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .profile-pic {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
      padding: 0;
      margin: 0 0.25rem;
      vertical-align: middle;
    }

    .name {
      margin-right: 0.5rem;
    }

    .artist-info {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;

      a {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: inherit;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .collaborators {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .collaborator-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .collaborator {
        display: flex;
        align-items: center;
        gap: 0.25rem;

        a {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          color: inherit;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .artwork-description {
    color: #333;
    line-height: 1.4;
    font-size: 0.95rem;
    max-width: 65ch;
  }
`;

const PageWrapper = styled.div`
  max-width: 900px;
  margin: auto;
  h1 {
    font-size: 2rem;
  }
  img,
  video,
  iframe {
    padding: 1rem;
    padding-top: 0.5rem;
    max-width: 100%;
  }
`;

const ContentWrapper = styled.div`
  border-left: solid 1px #333;
  margin-left: 1rem;
  max-width: 700px;
  .timestamp {
    font-size: 0.8rem;
    margin-left: 1rem;
    font-style: italic;
    margin-bottom: 0.5rem;
  }
  .caption {
    margin-left: 1rem;
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const getServerSideProps = async ({
  query,
  res,
}: {
  query: { artwork: string };
  res: any;
}) => {
  const artwork = await getArtwork(query.artwork);
  const metadata = getMetadata(artwork);

  return {
    props: {
      artwork,
      metadata,
    },
  };
};

export default ArtworkPage;

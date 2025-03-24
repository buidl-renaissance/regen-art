'use client';

import styled from 'styled-components';

import { DAArtwork, DAContent, getArtwork } from '@gods.work/utils';
import { ArtistProfile } from '@gods.work/ui';
// import { getArtwork } from "../../dpop";
import moment from 'moment';

interface ArtworkPageProps {
  artwork: DAArtwork;
}

const ArtworkPage = ({ artwork }: ArtworkPageProps) => {
  return (
    <PageWrapper>
      <HeaderWrapper>
        <HeaderTimelineLine />
        <HeaderTimelineLeft />
        <HeaderTimelineDot />
        <h1 dangerouslySetInnerHTML={{ __html: artwork.title }} />
        {/* <ArtistProfile artist={artwork.artist} /> */}
        <div className="artist-name">by {artwork.artist.name}</div>
      </HeaderWrapper>
      {artwork.content?.map((content: DAContent, i: number) => {
        return (
          <ContentWrapper key={i}>
            <TimelineDot />
            <TimelineLine />
            <div className="timestamp">
              {moment(content.timestamp).format('dddd MMMM Do, YYYY – h:mm a')}
            </div>
            {content.caption && (
              <div className="caption">{content.caption}</div>
            )}
            {content.data.type === 'youtube' && (
              <iframe
                className="media"
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${content.data.youtubeId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            {content.data.type === 'image/jpeg' && (
              <img className="media" src={content.data.url} />
            )}
            {content.data.type === 'video/mp4' && (
              <>
                <video className="media" controls preload="metadata">
                  <source
                    src={`${content.data.url}#t=0.1`}
                    type="video/mp4"
                  ></source>
                </video>
              </>
            )}
          </ContentWrapper>
        );
      })}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  /* background-color: #fafafa; */
  max-width: 700px;
  margin: auto;
  h1 {
    font-size: 2rem;
    padding: 1rem 0;
    margin-left: 1rem;
  }
  .media {
    padding: 1rem;
    padding-top: 0.5rem;
    max-width: 100%;
  }
  .caption {
    margin-left: 1rem;
  }
`;

const TimelineDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #333;
  top: 15px;
  left: -4px;
  position: relative;
  border-radius: 4px;
`;

const TimelineLine = styled.div`
  width: 12px;
  height: 1px;
  background-color: #333;
  top: 10px;
  position: relative;
`;

const HeaderWrapper = styled.div`
  /* border-left: solid 1px #333; */
  margin-left: 1rem;
  .artist-name {
    font-size: 0.8rem;
    margin-left: 1rem;
    font-style: italic;
    margin-top: -1rem;
    margin-bottom: 1rem;
  }
`;

const HeaderTimelineLine = styled.div`
  width: 14px;
  height: 2px;
  background-color: #449100;
  top: 56px;
  position: relative;
`;

const HeaderTimelineLeft = styled.div`
  width: 1px;
  height: 60px;
  margin-top: -60px;
  top: 116px;
  position: relative;
  background-color: #333;
`;

const HeaderTimelineDot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: #449100;
  top: 48px;
  left: -7px;
  position: relative;
`;

const ContentWrapper = styled.div`
  border-left: solid 1px #333;
  margin-left: 1rem;
  .timestamp {
    font-size: 0.8rem;
    margin-left: 1rem;
    font-style: italic;
  }
`;

export const getServerSideProps = async ({ query, res }: any) => {
  const artwork = await getArtwork(query.slug);

  const url = `https://gods.work/${artwork.slug}`;

  //   const image = event.image ?? event.venue?.image ?? env.image;

  return {
    props: {
      artwork,
      meta: {
        title: `${artwork.title} | Gods Work`,
        description: artwork.description,
        canonical: url,
        openGraph: {
          url: url,
          type: 'webpage',
          //   images: image
          //     ? [
          //         {
          //           url: image,
          //           alt: artwork.title,
          //         },
          //       ]
          //     : [],
          site_name: 'GODS WORK',
        },
      },
    },
  };
};

export default ArtworkPage;

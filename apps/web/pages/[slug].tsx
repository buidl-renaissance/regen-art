'use client';

import styled from 'styled-components';

import { DAArtwork, DAContent, getArtwork } from "@gods.work/utils";
// import { getArtwork } from "../../dpop";
import moment from "moment";

interface ArtworkPageProps {
    artwork: DAArtwork;
}

const ArtworkPage = ({ artwork }: ArtworkPageProps) => {
  return (
    <PageWrapper>
      <h1 dangerouslySetInnerHTML={{ __html: artwork.title }} />
      {artwork.content?.map((content: DAContent, i: number) => {
        return (
          <ContentWrapper key={i}>
            <div className="timestamp">{moment(content.timestamp).format('dddd MMMM Do, YYYY – h:mm a')}</div>
            {content.data.type === "image/jpeg" && (
              <img src={content.data.url} />
            )}
            {content.data.type === "video/mp4" && (
              <>
                <video controls preload="metadata">
                  <source src={`${content.data.url}#t=0.1`} type="video/mp4"></source>
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
  background-color: #fafafa;
  max-width: 700px;
  margin: auto;
  h1 {
    font-size: 2rem;
    padding: 1rem;
    margin-left: 1rem;
  }
  img {
    padding: 1rem;
    padding-top: 0.5rem;
    max-width: 100%;
  }
  video {
    padding: 1rem;
    padding-top: 0.5rem;
    max-width: 100%;
  }
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
        title: `${artwork.title}`,
        description: artwork.description,
        canonical: url,
        openGraph: {
          url: url,
          type: "webpage",
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

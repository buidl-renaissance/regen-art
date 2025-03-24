import { DAArtwork, getArtworks } from '@gods.work/utils';
import { Artwork, Donate } from '@gods.work/ui';
import styled from 'styled-components';

const StyledPage = styled.div`
  text-align: center;
  .about {
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1rem;
      color: #333;
      margin-bottom: 1rem;
    }
    .works {
      width: 80%;
      margin: auto;
      margin-top: 2rem;
    }
    .steps {
      margin-top: 2rem;
    }
    h2 {
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    @media only screen and (max-width: 822px) {
      h1 {
        font-size: 2rem;
      }
      p {
        font-size: 1rem;
        color: #333;
        margin-bottom: 1rem;
      }
    }
  }
`;

interface AboutPageProps {
  artworks: DAArtwork[];
}

const AboutPage = ({ artworks }: AboutPageProps) => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <div className="about wrapper">
        <div className="full-container">
          <div className="vertical-center">
            <h1>DOING GODS WORK</h1>
            <p>
              Through the collective efforts of artist communities, we will fund
              and nurture a vibrant, supportive environment where creativity
              thrives and meaningful connections are forged.              
            </p>
            {/* <p>We provide free, custom-stretched canvas frames to members,
              empowering them to create and give back. Through this initiative,
              God's Work helps build stronger, healthier relationships in the
              creative community while making a positive impact on society.
            </p> */}
            <Donate />

            <div className="steps">
              <h2>HOW</h2>
              <p>
                Artist hands are provided select paint materials in addition to
                a primed canvas for the work.
              </p>
              <p>
                Completed and ongoing works will be made available for viewing
                at community events.
              </p>
              <p>
                Monetary value from purchased works will be collected into a
                shared wallet where members will decide how funds are
                distributed.
              </p>
            </div>
            {/* <div className="button-container">
            <a href="/apply">
              <button>APPLY</button>
            </a>
          </div>*/}
          </div>
        </div>
        <div className="works">
          <h2>WORKS</h2>
          {artworks?.length > 0 &&
            artworks.map((artwork: DAArtwork, i: number) => {
              return <Artwork artwork={artwork} key={i} />;
            })}
        </div>
      </div>
    </StyledPage>
  );
};

export const getServerSideProps = async () => {
  const url = `https://gods.work/about`;

  //   const image = event.image ?? event.venue?.image ?? env.image;
  const artworks = await getArtworks();

  return {
    props: {
      artworks,
      meta: {
        title: 'Doing Gods Work',
        description:
          'Through the collective efforts of artist communities, we will fund and nurture a vibrant, supportive environment where creativity thrives and meaningful connections are forged.',
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

export default AboutPage;

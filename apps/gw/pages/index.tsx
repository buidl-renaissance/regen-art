import styled from 'styled-components';
import Parser from 'rss-parser';
import { Donate } from '@gods.work/ui';
const StyledPage = styled.div`
  text-align: center;

  #welcome {
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.2rem;
      color: #333;
    }

    @media only screen and (max-width: 822px) {
      h1 {
        font-size: 2rem;
      }
      p {
        font-size: 0.9rem;
        color: #333;
      }
    }
  }
  .video-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

interface FeedItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
  enclosure: {
    url: string;
    type: string;
    length: number;
  };
  categories: string[];
}

interface Props {
  feed: {
    items: FeedItem[];
  };
}

const Index: React.FC<Props> = ({ feed }) => {
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="full-container">
          <div id="welcome" className="vertical-center">
            <h1>GODS WORK</h1>
            <p>
              We provide free, custom-stretched canvas frames to members,
              empowering them to create and give back. Through this initiative,
              God's Work helps build stronger, healthier relationships in the
              creative community while making a positive impact on society.
            </p>
            {/* <p>
              Our mission is to empower artistic communities to create by
              providing opportunities for collaboration, growth, and financial
              sustainability.
            </p> */}
            {/* <div className="button-container">
              <a href="/about">
                <button>Learn How</button>
              </a>
            </div> */}
            <Donate />
          </div>
        </div>
        <div className="video-container">
          {feed.items.map((item: any) => {
            return (
              <iframe
                className="media"
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${item.id.replace(
                  'yt:video:',
                  ''
                )}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            );
          })}
        </div>
      </div>
    </StyledPage>
  );
};

export const getServerSideProps = async () => {
  const url = `https://gods.work/`;

  //   const image = event.image ?? event.venue?.image ?? env.image;

  const parser = new Parser();
  const feed = await parser.parseURL(
    'https://www.youtube.com/feeds/videos.xml?channel_id=UC2qSsi0v6ib9ZNWOazpjWWQ'
  );

  return {
    props: {
      feed,
      meta: {
        title: 'Gods Work',
        description:
          'Our mission is to empower artistic communities to create by providing opportunities for collaboration, growth, and financial sustainability.',
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

export default Index;

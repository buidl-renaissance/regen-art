import styled from 'styled-components';

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
`;

const Index = () => {
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="full-container">
          <div id="welcome" className="vertical-center">
            <h1>GODS WORK</h1>
            <p>
              Our mission is to empower artistic communities to create by
              providing opportunities for collaboration, growth, and financial
              sustainability.
            </p>
            <div className="button-container">
              <a href="/about">
                <button>Learn How</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </StyledPage>
  );
};

export const getServerSideProps = async () => {
  const url = `https://gods.work/`;

  //   const image = event.image ?? event.venue?.image ?? env.image;

  return {
    props: {
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

'use client';

import styled from 'styled-components';

const StyledPage = styled.div`
  text-align: center;

  .container {
    height: 100vh;
    position: relative;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  .vertical-center {
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    padding: 1rem;
    max-width: 600px;
  }

  .learn-more {
    position: absolute;
    bottom: 1rem;
  }
  .button-container {
    margin: 1rem;
  }

  button {
    margin: 0;
    padding: 1rem 2rem;
    cursor: pointer;
  }

  #welcome {
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1rem;
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

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome" className="vertical-center">
            <h1>GODS WORK</h1>
            <p>
              Our mission is to empower artistic communities to create by
              providing opportunities for collaboration, growth, and financial
              sustainability.
            </p>
            {/* <div>
              Through the collective efforts of local artists,
              we will fund and nurture a vibrant, supportive environment where
              creativity thrives and meaningful connections are forged.
            </div> */}
            <div className="button-container">
              <a href="/about">
                <button>Learn More</button>
              </a>
            </div>
          </div>
          {/* <div className="learn-more">
            <a href="/about">
              <button>Learn More</button>
            </a>
          </div> */}
        </div>
      </div>
    </StyledPage>
  );
}

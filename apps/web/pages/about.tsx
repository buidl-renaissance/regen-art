'use client';

import styled from 'styled-components';

const StyledPage = styled.div`
  text-align: center;
  #welcome {
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1rem;
      color: #333;
      margin-bottom: 1rem;
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
        font-size: 0.8rem;
        color: #333;
        margin-bottom: 0.5rem;
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
        <div className="full-container">
          <div id="welcome" className="vertical-center">
            <h1>DOING GODS WORK</h1>
            <p>
              Through the collective efforts of artist communities, we will fund
              and nurture a vibrant, supportive environment where creativity
              thrives and meaningful connections are forged.
            </p>
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
          </div> */}
          </div>
        </div>
      </div>
    </StyledPage>
  );
}

import styled from 'styled-components';
import { Artwork as DAArtwork } from '@gods.work/utils';

const ArtworkContainer = styled.div`
  /* color: pink; */
  margin-bottom: 2rem;
  .title {
    font-size: 1.4rem;
  }
`;

interface ArtworkProps {
  artwork: DAArtwork;
}

export const Artwork: React.FC<ArtworkProps> = ({ artwork }) => {
  return (
    <ArtworkContainer>
      <a href={`/${artwork.id}`}>
        <div className="title">{artwork.title}</div>
        {artwork.data?.image && (
          <img
            alt={artwork.title}
            className="image"
            src={artwork.data?.image}
            width={'100%'}
          />
        )}
      </a>
    </ArtworkContainer>
  );
};

export default Artwork;

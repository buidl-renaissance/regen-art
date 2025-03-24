import styled from 'styled-components';
import { Artwork } from '@gods.work/utils';

const ArtworkContainer = styled.div`
  /* color: pink; */
  margin-bottom: 2rem;
  .title {
    font-size: 1.4rem;
  }
`;

interface ArtworkCardProps {
  artwork: Artwork;
}

export const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
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

export default ArtworkCard;

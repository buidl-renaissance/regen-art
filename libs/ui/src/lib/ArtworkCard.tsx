import styled from 'styled-components';
import { Artwork, convertDefaultToResized } from '@gods.work/utils';

const ArtworkContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 75%;
    overflow: hidden;
  }

  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover .image {
    transform: scale(1.05);
  }

  .content {
    padding: 1.2rem;
  }

  .title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
    line-height: 1.3;
  }

  .description {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .artist {
    font-size: 0.85rem;
    color: #888;
    font-style: italic;
  }
`;

interface ArtworkCardProps {
  artwork: Artwork;
}

export const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  return (
    <ArtworkContainer>
      <div className="image-container">
        {artwork.data?.image && (
          <img
            alt={artwork.title}
            className="image"
            src={convertDefaultToResized(artwork.data.image)}
          />
        )}
      </div>
      <div className="content">
        <div className="title">{artwork.title}</div>
        {artwork.description && (
          <div className="description">{artwork.description}</div>
        )}
        {artwork.artist && (
          <div className="artist">by {artwork.artist.name}</div>
        )}
      </div>
    </ArtworkContainer>
  );
};

export const ArtworkCardClickableContainer = styled.div`
  cursor: pointer;
`;

export default ArtworkCard;

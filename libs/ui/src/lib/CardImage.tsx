import React from 'react';
import styled from 'styled-components';

interface CardImageProps {
  imageUrl?: string;
  title?: string;
  category?: string;
  alt?: string;
}

export const CardImage: React.FC<CardImageProps> = ({ imageUrl, title, category, alt }) => {
  const [imageError, setImageError] = React.useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <CardImageContainer>
      {imageUrl && !imageError ? (
        <CardImg 
          src={imageUrl} 
          alt={alt || title || 'Card image'} 
          onError={handleImageError}
        />
      ) : (
        <PlaceholderImage>
          {category && <CategoryLabel>{category}</CategoryLabel>}
        </PlaceholderImage>
      )}
    </CardImageContainer>
  );
};

export default CardImage;


const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2c3e50, #4a5568);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryLabel = styled.span`
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 1rem;
  text-transform: uppercase;
`;

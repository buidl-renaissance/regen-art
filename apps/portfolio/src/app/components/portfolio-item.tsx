import styled from 'styled-components';

interface PortfolioItemProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

const StyledPortfolioItem = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;

    @media (min-width: 768px) {
      height: 240px;
    }
  }

  &:hover img {
    transform: scale(1.05);
  }

  .item-content {
    padding: 1.5rem;

    @media (min-width: 768px) {
      padding: 2rem;
    }

    h3 {
      margin: 0 0 1rem 0;
      color: #1e293b;
      font-size: clamp(1.2rem, 4vw, 1.5rem);
      font-weight: 600;
    }

    p {
      color: #64748b;
      line-height: 1.7;
      font-size: 1rem;

      @media (min-width: 768px) {
        font-size: 1.1rem;
      }
    }
  }
`;

export function PortfolioItem({ href, imageSrc, imageAlt, title, description }: PortfolioItemProps) {
  return (
    <StyledPortfolioItem className="portfolio-item">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={imageSrc} alt={imageAlt} />
        <div className="item-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </a>
    </StyledPortfolioItem>
  );
}
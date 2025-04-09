import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from './interfaces';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
}) => {
  const truncateDescription = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <CardContainer onClick={onClick}>
      <CardImageContainer>
        {project.imageUrl ? (
          <CardImage src={project.imageUrl} alt={project.title} />
        ) : (
          <PlaceholderImage>
            <CategoryLabel>{project.category}</CategoryLabel>
          </PlaceholderImage>
        )}
      </CardImageContainer>
      <CardContent>
        <CardTitle>{project.title}</CardTitle>
        {project.location && (
          <LocationContainer>
            <FaMapMarkerAlt />
            <LocationText>{project.location}</LocationText>
          </LocationContainer>
        )}
        <CardDescription>{truncateDescription(project.description)}</CardDescription>
        <CardFooter>
          <CategoryBadge>{project.category}</CategoryBadge>
          {project.websiteUrl && (
            <WebsiteLink href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
              <FaExternalLinkAlt />
            </WebsiteLink>
          )}
          {project.slug && (
            <ViewDetailsLink href={`/projects/${project.slug}`}>
              View Details
            </ViewDetailsLink>
          )}
        </CardFooter>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  background-color: #1e1e1e;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const CardImageContainer = styled.div`
  height: 180px;
  overflow: hidden;
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2c3e50, #4a5568);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContent = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #f5f5f5;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #90caf9;
  font-size: 0.875rem;
`;

const LocationText = styled.span`
  margin-left: 0.5rem;
`;

const CardDescription = styled.p`
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: #b0b0b0;
  line-height: 1.5;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const CategoryBadge = styled.span`
  background-color: rgba(144, 202, 249, 0.2);
  color: #90caf9;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const CategoryLabel = styled.span`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const WebsiteLink = styled.a`
  color: #90caf9;
  margin-left: auto;
  margin-right: 1rem;
  font-size: 0.9rem;
  
  &:hover {
    color: #64b5f6;
  }
`;

const ViewDetailsLink = styled(Link)`
  color: #90caf9;
  font-size: 0.9rem;
  text-decoration: none;
  
  &:hover {
    color: #64b5f6;
    text-decoration: underline;
  }
`;

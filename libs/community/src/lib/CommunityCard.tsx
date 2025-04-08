import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Community, CommunityStatus } from './interface';

interface CommunityCardProps {
  community: Community;
  onClick?: () => void;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ community, onClick }) => {
  const { id, name, description, imageUrl, memberCount, tags, status } = community;

  return (
    <CardContainer onClick={onClick}>
      <CardImage style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }} />
      <CardContent>
        <StatusBadge status={status}>{status}</StatusBadge>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {memberCount !== undefined && (
          <MemberCount>{memberCount} member{memberCount !== 1 ? 's' : ''}</MemberCount>
        )}
        {tags && tags.length > 0 && (
          <TagsContainer>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}
        <CardLink href={`/communities/${id}`}>View Community →</CardLink>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #333;
  
  @media (max-width: 480px) {
    height: 180px;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  position: relative;
  
  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: #f5f5f5;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.75rem;
  }
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #cccccc;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 1.25rem;
  }
`;

const CardLink = styled(Link)`
  display: inline-block;
  color: #90caf9;
  font-size: 0.95rem;
  text-decoration: none;
  font-family: 'Courier New', monospace;
  transition: color 0.2s ease;
  
  &:hover {
    color: #bbdefb;
    text-decoration: underline;
  }
`;

const MemberCount = styled.div`
  font-size: 0.9rem;
  color: #aaaaaa;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

const Tag = styled.span`
  background-color: #333333;
  color: #cccccc;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-family: 'Courier New', monospace;
`;

const StatusBadge = styled.div<{ status: CommunityStatus }>`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  background-color: ${({ status }) => {
    switch (status) {
      case 'active':
        return '#4caf50';
      case 'inactive':
        return '#f44336';
      case 'pending':
        return '#ff9800';
      default:
        return '#757575';
    }
  }};
  color: white;
`;

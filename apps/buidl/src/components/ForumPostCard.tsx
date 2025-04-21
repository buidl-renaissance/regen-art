import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaClock, FaTag, FaThumbsUp, FaReply } from 'react-icons/fa';
import { ForumPost } from '@gods.work/forum';
// import Link from 'next/link';

interface PostHeaderProps {
  title: string;
  handle: string;
  date: string;
  category: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  handle,
  date,
  category,
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <StyledPostHeader>
      <PostTitle>{title}</PostTitle>
      <PostMeta>
        <MetaItem>
          <FaUser style={{ marginRight: '5px' }} /> {handle}
        </MetaItem>
        <MetaItem>
          <FaClock style={{ marginRight: '5px' }} /> {formattedDate}
        </MetaItem>
        <MetaItem>
          <FaTag style={{ marginRight: '5px' }} /> {category}
        </MetaItem>
      </PostMeta>
    </StyledPostHeader>
  );
};

interface PostContentProps {
  content: string;
}

const PostContent: React.FC<PostContentProps> = ({ content }) => (
  <StyledPostContent dangerouslySetInnerHTML={{ __html: content }} />
);

interface TagsListProps {
  tags: string[];
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => (
  <TagsContainer>
    {tags.map((tag) => (
      <Tag key={tag}>{tag}</Tag>
    ))}
  </TagsContainer>
);

interface PostActionsProps {
  likes: number;
  onLike: () => void;
  onReply: () => void;
}

export const PostActions: React.FC<PostActionsProps> = ({ likes, onLike, onReply }) => (
  <StyledPostActions>
    <ActionButton onClick={onLike}>
      <FaThumbsUp style={{ marginRight: '5px' }} /> Like {likes && `(${likes})`}
    </ActionButton>
    <ActionButton onClick={onReply}>
      <FaReply style={{ marginRight: '5px' }} /> Reply
    </ActionButton>
  </StyledPostActions>
);

interface ForumPostProps {
  post: ForumPost;
}

export const ForumPostCard: React.FC<ForumPostProps> = ({ post }) => {
  const [likes, setLikes] = useState(post.num_likes);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleLike = () => {
    // In a real app, you would call an API to update the like count
    setLikes(prevLikes => prevLikes + 1);
  };

  const handleReply = () => {
    setShowReplyForm(prevState => !prevState);
  };

  return (
    <PostContainer className={post.is_first_post ? 'first-post' : 'reply'}>
      {!post.is_first_post && (
        <PostHeader
          title={post.title}
          handle={post.handle}
          date={post.created_at}
          category={post.category}
        />
      )}
      <PostContent content={post.content} />
      {post.tags && post.tags.length > 0 && <TagsList tags={post.tags} />}
      <PostActions 
        likes={likes} 
        onLike={handleLike} 
        onReply={handleReply} 
      />
      {showReplyForm && (
        <ReplyFormContainer>
          <ReplyTextarea placeholder="Write your reply..." />
          <ReplyButtonContainer>
            <ActionButton onClick={() => setShowReplyForm(false)}>Cancel</ActionButton>
            <ActionButton>Submit Reply</ActionButton>
          </ReplyButtonContainer>
        </ReplyFormContainer>
      )}
    </PostContainer>
  );
};

const PostContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;

  &.first-post {
    padding: 0;
    margin-bottom: 0;
    margin-top: 1rem;
  }
`;

const StyledPostHeader = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid #333;
  padding-bottom: 1rem;
`;

const PostTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #f5f5f5;
`;

const PostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: #a0a0a0;
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPostContent = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;

  p {
    margin-bottom: 1rem;
  }

  pre {
    background-color: #2c2c2c;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1rem 0;
    font-family: monospace;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background-color: #2c2c2c;
  color: #3498db;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const StyledPostActions = styled.div`
  display: flex;
  gap: 1rem;
  border-top: 1px solid #333;
  padding-top: 1rem;
`;

export const ActionButton = styled.button<{ small?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.small ? 'transparent' : '#2c2c2c')};
  color: ${(props) => (props.small ? '#a0a0a0' : '#f5f5f5')};
  border: none;
  padding: ${(props) => (props.small ? '0.3rem 0.5rem' : '0.5rem 1rem')};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${(props) => (props.small ? '0.8rem' : '0.9rem')};

  &:hover {
    background-color: ${(props) => (props.small ? 'transparent' : '#3c3c3c')};
    color: ${(props) => (props.small ? '#f5f5f5' : '#f5f5f5')};
  }
`;

const ReplyFormContainer = styled.div`
  margin-top: 1rem;
  border-top: 1px solid #333;
  padding-top: 1rem;
`;

const ReplyTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  background-color: #2c2c2c;
  color: #f5f5f5;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ReplyButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

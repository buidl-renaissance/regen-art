import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  FaUser,
  FaClock,
  FaComments,
  FaEye,
  FaThumbtack,
  FaTag,
} from 'react-icons/fa';
import { ForumThread, ForumPost } from '@gods.work/forum';
import { ForumPostCard } from './ForumPostCard';

interface ThreadProps {
  thread: ForumThread;
  post?: ForumPost;
}

const ForumThreadPreview: React.FC<ThreadProps> = ({ thread, post }) => {
  // Format date to a readable string
  const formattedDate = new Date(thread.created_at).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <ThreadItem
      className="forum-thread-preview"
      key={thread.slug}
      isPinned={thread.is_pinned}
    >
      {thread.is_pinned && (
        <PinnedIndicator>
          <FaThumbtack />
        </PinnedIndicator>
      )}
      {post ? (
        <ThreadTitle>{thread.title}</ThreadTitle>
      ) : (
        <Link href={`/forum/threads/${thread.slug}`}>
          <ThreadTitle clickable>{thread.title}</ThreadTitle>
        </Link>
      )}
      <ThreadMeta>
        <MetaItem>
          <FaUser style={{ marginRight: '5px' }} /> {thread.handle}
        </MetaItem>
        <MetaItem>
          <FaClock style={{ marginRight: '5px' }} /> {formattedDate}
        </MetaItem>
        <MetaItem>
          <FaComments style={{ marginRight: '5px' }} />{' '}
          {thread.num_replies ?? 0} replies
        </MetaItem>
        <MetaItem>
          <FaEye style={{ marginRight: '5px' }} /> {thread.num_views ?? 0} views
        </MetaItem>
      </ThreadMeta>
      {thread.tags && thread.tags.length > 0 && (
        <TagsContainer>
          {thread.tags.map((tag, index) => (
            <Tag key={index}>
              <FaTag style={{ marginRight: '5px' }} /> {tag}
            </Tag>
          ))}
        </TagsContainer>
      )}
      {post && <ForumPostCard post={post} />}
    </ThreadItem>
  );
};

export default ForumThreadPreview;

const ThreadItem = styled.div<{ isPinned?: boolean }>`
  font-family: 'Courier New', monospace;
  padding: 1.25rem;
  border-radius: 8px;
  background-color: #1e1e1e;
  margin-bottom: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  border: 1px solid ${(props) => (props.isPinned ? '#3498db' : '#2c2c2c')};
  width: 100%;
`;

const PinnedIndicator = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  color: #3498db;
  font-size: 0.9rem;
`;

const ThreadTitle = styled.h3<{ clickable?: boolean }>`
  margin: 0 0 0.75rem 0;
  color: #f5f5f5;
  font-size: 1.2rem;

  ${props => props.clickable && `
    &:hover {
      color: #3498db;
    }
  `}
`;

const ThreadMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: #aaa;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  margin-right: 1.25rem;
  margin-bottom: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.75rem;
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  background-color: #2c3e50;
  color: #3498db;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

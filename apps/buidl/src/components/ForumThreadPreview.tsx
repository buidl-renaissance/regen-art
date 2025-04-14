import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FaUser, FaClock, FaComments, FaEye, FaThumbtack } from 'react-icons/fa';
import { ForumThread } from '@gods.work/forum';

interface ThreadProps {
    thread: ForumThread;
}

const ForumThreadPreview: React.FC<ThreadProps> = ({ thread }) => {
  // Format date to a readable string
  const formattedDate = new Date(thread.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <ThreadItem className="forum-thread-preview" key={thread.slug} isPinned={thread.is_pinned}>
      {thread.is_pinned && (
        <PinnedIndicator>
          <FaThumbtack />
        </PinnedIndicator>
      )}
      <Link href={`/forum/${thread.slug}`}>
        <ThreadTitle>{thread.title}</ThreadTitle>
      </Link>
      <ThreadMeta>
        <MetaItem>
          <FaUser style={{ marginRight: '5px' }} /> {thread.author}
        </MetaItem>
        <MetaItem>
          <FaClock style={{ marginRight: '5px' }} /> {formattedDate}
        </MetaItem>
        <MetaItem>
          <FaComments style={{ marginRight: '5px' }} /> {thread.replies} replies
        </MetaItem>
        <MetaItem>
          <FaEye style={{ marginRight: '5px' }} /> {thread.views} views
        </MetaItem>
      </ThreadMeta>
    </ThreadItem>
  );
};

export default ForumThreadPreview;

const ThreadItem = styled.div<{ isPinned?: boolean }>`
  font-family: 'Courier New', monospace;
  padding: 1.25rem;
  border-radius: 8px;
  background-color: ${props => props.isPinned ? '#1e2a3a' : '#1e1e1e'};
  margin-bottom: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  border: 1px solid ${props => props.isPinned ? '#3498db' : '#2c2c2c'};
  width: 100%;
`;

const PinnedIndicator = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  color: #3498db;
  font-size: 0.9rem;
`;

const ThreadTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  color: #f5f5f5;
  font-size: 1.2rem;
  
  &:hover {
    color: #3498db;
  }
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

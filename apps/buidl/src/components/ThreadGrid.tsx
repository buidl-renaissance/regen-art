import styled from 'styled-components';
import { ForumThread } from '@gods.work/forum';
import Link from 'next/link';
import { FaUser, FaClock, FaComments, FaEye } from 'react-icons/fa';

interface ThreadGridProps {
  threads: ForumThread[];
}

export const ThreadGrid = ({ threads }: ThreadGridProps) => {
  if (!threads?.length) return null;
  
  return (
    <ThreadGridContainer>
      {threads.map((thread) => {
        const timestamp = new Date(thread.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        
        return (
          <Link href={`/forum/threads/${thread.slug}`} key={thread.id}>
            <ThreadCard isPinned={thread.is_pinned}>
              <ThreadHeader>
                <ThreadTitle>{thread.title}</ThreadTitle>
                <ThreadMeta>
                  <MetaItem>
                    <FaUser style={{ marginRight: '5px' }} />
                    {thread.handle}
                  </MetaItem>
                  <MetaItem>
                    <FaClock style={{ marginRight: '5px' }} />
                    {timestamp}
                  </MetaItem>
                  <MetaItem>
                    <FaComments style={{ marginRight: '5px' }} />
                    {thread.num_replies ?? 0} replies
                  </MetaItem>
                  <MetaItem>
                    <FaEye style={{ marginRight: '5px' }} />
                    {thread.num_views ?? 0} views
                  </MetaItem>
                </ThreadMeta>
              </ThreadHeader>
              {thread.preview && (
                <ThreadPreview>{thread.preview}</ThreadPreview>
              )}
              {thread.tags && thread.tags.length > 0 && (
                <TagsContainer>
                  {thread.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              )}
            </ThreadCard>
          </Link>
        );
      })}
    </ThreadGridContainer>
  );
};

const ThreadGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ThreadCard = styled.div<{ isPinned?: boolean }>`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid ${(props) => (props.isPinned ? '#3498db' : 'transparent')};

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: #1c1c1c;
    h3 {
      color: #3498db;
      text-decoration: underline;
    }
  }
`;

const ThreadHeader = styled.div`
  margin: 0;
`;

const ThreadTitle = styled.h3`
  font-size: 1.3rem;
  margin-top: 0rem;
  margin-bottom: 0.5rem;
  color: #f5f5f5;
`;

const ThreadMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: #a0a0a0;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
`;

const ThreadPreview = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #c0c0c0;
  margin-bottom: 1rem;
`;

const ThreadFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ThreadCategory = styled.span`
  background-color: #2c2c2c;
  color: #3498db;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: #2c3e50;
  color: #3498db;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

import styled from 'styled-components';
import { ForumThread } from '@gods.work/forum';
import Link from 'next/link';

interface ThreadGridProps {
  threads: ForumThread[];
}

export const ThreadGrid = ({ threads }: ThreadGridProps) => {
  const timestamp = new Date(threads[0].created_at).toLocaleString();
  return (
    <ThreadGridContainer>
      {threads.map((thread) => (
        <Link href={`/forum/${thread.slug}`} key={thread.id}>
          <ThreadCard>
            <ThreadHeader>
              <ThreadTitle>{thread.title}</ThreadTitle>
              <ThreadMeta>
                <ThreadStats>
                  {thread.author && (
                    <ThreadAuthor>{thread.author}</ThreadAuthor>
                  )}
                  <ThreadDate>{timestamp}</ThreadDate>
                  |<ThreadStat>{thread.replies ?? 0} replies</ThreadStat>
                  |<ThreadStat>{thread.views ?? 0} views</ThreadStat>
                </ThreadStats>
              </ThreadMeta>
            </ThreadHeader>
            {thread.preview && (
              <ThreadPreview>{thread.preview}</ThreadPreview>
            )}
            {/* <ThreadFooter>
              {thread.category ? (
                <ThreadCategory>{thread.category}</ThreadCategory>
              ) : (
                <div />
              )}
            </ThreadFooter> */}
          </ThreadCard>
        </Link>
      ))}
    </ThreadGridContainer>
  );
};

const ThreadGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ThreadCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    /* transform: translateY(-1px); */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: #1c1c1c;
    h3 {
      color: #3498db;
      text-decoration: underline;
    }
  }
`;

const ThreadHeader = styled.div`
  margin: 0rem;
  /* margin-bottom: 1rem; */
`;

const ThreadTitle = styled.h3`
  font-size: 1.3rem;
  margin-top: 0rem;
  margin-bottom: 0.5rem;
  color: #f5f5f5;
`;

const ThreadMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #a0a0a0;
`;

const ThreadAuthor = styled.span``;

const ThreadDate = styled.span``;

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

const ThreadStats = styled.div`
  display: flex;
  gap: 1rem;
`;

const ThreadStat = styled.span`
  font-size: 0.9rem;
  color: #a0a0a0;
`;

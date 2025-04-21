import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { ForumPostCard } from '../../../components/ForumPostCard';
import { RepliesList } from '../../../components/ForumReplies';
import { ReplyForm } from '../../../components/ForumReplies';
import {
  ForumThread,
  ForumPost,
  getThreadBySlug,
  getPostsByThreadId,
  incrementThreadViews,
} from '@gods.work/forum';
import ForumThreadPreview from '../../../components/ForumThreadPreview';

interface ForumThreadPageProps {
  thread: ForumThread;
  posts: ForumPost[];
}

export const getServerSideProps = async ({
  params,
}: {
  params: { thread: string };
}) => {
  const thread = await getThreadBySlug(params.thread);
  if (!thread) {
    return {
      notFound: true,
    };
  }
  
  // Increment view count
  await incrementThreadViews(thread.id);
  
  const posts = await getPostsByThreadId(thread.id);
  
  return {
    props: { thread, posts },
  };
};

const ForumThreadPage = ({ thread, posts }: ForumThreadPageProps) => {
  return (
    <Container>
      <Head>
        <title>{thread.title} | BUIDL Detroit Forum</title>
        <meta
          name="description"
          content={`${thread.title} - Join the discussion on BUIDL Detroit Forum`}
        />
      </Head>

      <BackButton href="/forum">
        <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Forum
      </BackButton>

      <ForumThreadPreview thread={thread} />

      {posts.map((post) => (
        <>
          <ForumPostCard post={post} />
          {post.replies && post.replies.length > 0 && (
            <RepliesList replies={post.replies} />
          )}
        </>
      ))}

      <ReplyForm />
    </Container>
  );
};

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Courier New', monospace;
  color: #f5f5f5;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #3498db;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export default ForumThreadPage;

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
  
  // Serialize dates to ISO strings to make them JSON serializable
  const serializedThread = {
    ...thread,
    created_at: thread.created_at instanceof Date ? thread.created_at.toISOString() : thread.created_at,
    updated_at: thread.updated_at instanceof Date ? thread.updated_at.toISOString() : thread.updated_at
  };
  const posts = await getPostsByThreadId(thread.id);
  // Serialize dates in posts to make them JSON serializable
  const serializedPosts = posts.map((post: ForumPost) => ({
    ...post,
    created_at: (post.created_at instanceof Date) ? post.created_at.toISOString() : post.created_at,
    updated_at: (post.updated_at instanceof Date) ? post.updated_at.toISOString() : post.updated_at,
    // Also serialize dates in replies if they exist
    replies: post.replies ? post.replies.map((reply: ForumPost) => ({
      ...reply,
      created_at: reply.created_at instanceof Date ? reply.created_at.toISOString() : reply.created_at,
      updated_at: reply.updated_at instanceof Date ? reply.updated_at.toISOString() : reply.updated_at
    })) : []
  }));
  return {
    props: { thread: serializedThread, posts: serializedPosts },
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

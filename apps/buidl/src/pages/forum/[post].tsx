import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaArrowLeft, FaUser, FaClock, FaTag, FaReply, FaThumbsUp } from 'react-icons/fa';

// Mock data for a single post
const mockPost = {
  id: '1',
  title: 'Building a Community Events API',
  author: 'devDetroit',
  authorAvatar: 'https://via.placeholder.com/50',
  date: 'March 15, 2023',
  content: `
    <p>I'm working on an API to aggregate community events across Detroit. Looking for feedback on the data model and potential collaborators.</p>
    
    <p>Here's what I'm thinking for the data structure:</p>
    
    <pre>
    {
      "id": "unique-id",
      "title": "Event Title",
      "description": "Detailed description of the event",
      "startDate": "2023-03-20T18:00:00",
      "endDate": "2023-03-20T21:00:00",
      "location": {
        "name": "Venue Name",
        "address": "123 Main St",
        "city": "Detroit",
        "state": "MI",
        "zip": "48201"
      },
      "organizer": {
        "name": "Organization Name",
        "website": "https://example.org",
        "contact": "contact@example.org"
      },
      "tags": ["tech", "community", "workshop"],
      "image": "https://example.org/event-image.jpg",
      "ticketUrl": "https://example.org/tickets"
    }
    </pre>
    
    <p>The API would allow filtering by date range, location, tags, and full-text search across title and description.</p>
    
    <p>What do you think? Any fields I'm missing or improvements you'd suggest?</p>
  `,
  category: 'Project Collaboration',
  tags: ['API', 'Events', 'Community'],
  views: 87,
  likes: 15,
  replies: [
    {
      id: 'r1',
      author: 'techBuilder',
      authorAvatar: 'https://via.placeholder.com/50',
      date: 'March 15, 2023',
      content: 'This looks great! You might want to add a field for accessibility information and whether the event is free or paid.',
      likes: 5
    },
    {
      id: 'r2',
      author: 'codeDetroit',
      authorAvatar: 'https://via.placeholder.com/50',
      date: 'March 16, 2023',
      content: "I'd be interested in collaborating on this. I've worked on similar projects before. Have you considered adding support for recurring events?",
      likes: 3
    }
  ]
};

const ForumPostPage = () => {
  const router = useRouter();
  const { post } = router.query;
  
  // In a real app, you would fetch the post data based on the ID
  // For now, we'll use our mock data
  const postData = mockPost;

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Head>
        <title>{postData.title} | BUIDL Detroit Forum</title>
        <meta
          name="description"
          content={`${postData.title} - Join the discussion on BUIDL Detroit Forum`}
        />
      </Head>

      <BackButton href="/forum">
        <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Forum
      </BackButton>

      <PostContainer>
        <PostHeader>
          <PostTitle>{postData.title}</PostTitle>
          <PostMeta>
            <MetaItem>
              <FaUser style={{ marginRight: '5px' }} /> {postData.author}
            </MetaItem>
            <MetaItem>
              <FaClock style={{ marginRight: '5px' }} /> {postData.date}
            </MetaItem>
            <MetaItem>
              <FaTag style={{ marginRight: '5px' }} /> {postData.category}
            </MetaItem>
          </PostMeta>
        </PostHeader>

        <PostContent dangerouslySetInnerHTML={{ __html: postData.content }} />

        <TagsContainer>
          {postData.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsContainer>

        <PostActions>
          <ActionButton>
            <FaThumbsUp style={{ marginRight: '5px' }} /> Like ({postData.likes})
          </ActionButton>
          <ActionButton>
            <FaReply style={{ marginRight: '5px' }} /> Reply
          </ActionButton>
        </PostActions>
      </PostContainer>

      <RepliesSection>
        <RepliesHeader>
          <h3>Replies ({postData.replies.length})</h3>
        </RepliesHeader>

        {postData.replies.map(reply => (
          <ReplyCard key={reply.id}>
            <ReplyHeader>
              <ReplyAuthorInfo>
                <ReplyAuthorAvatar src={reply.authorAvatar} alt={reply.author} />
                <ReplyAuthorName>{reply.author}</ReplyAuthorName>
              </ReplyAuthorInfo>
              <ReplyDate>{reply.date}</ReplyDate>
            </ReplyHeader>
            <ReplyContent>{reply.content}</ReplyContent>
            <ReplyActions>
              <ActionButton small>
                <FaThumbsUp style={{ marginRight: '5px' }} /> ({reply.likes})
              </ActionButton>
              <ActionButton small>
                <FaReply style={{ marginRight: '5px' }} /> Reply
              </ActionButton>
            </ReplyActions>
          </ReplyCard>
        ))}
      </RepliesSection>

      <ReplyFormSection>
        <h3>Join the Discussion</h3>
        <ReplyForm>
          <ReplyTextarea placeholder="Write your reply here..." />
          <SubmitButton>Post Reply</SubmitButton>
        </ReplyForm>
      </ReplyFormSection>
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

const PostContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const PostHeader = styled.div`
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

const PostContent = styled.div`
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

const PostActions = styled.div`
  display: flex;
  gap: 1rem;
  border-top: 1px solid #333;
  padding-top: 1rem;
`;

const ActionButton = styled.button<{ small?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${props => props.small ? 'transparent' : '#2c2c2c'};
  color: ${props => props.small ? '#a0a0a0' : '#f5f5f5'};
  border: none;
  padding: ${props => props.small ? '0.3rem 0.5rem' : '0.5rem 1rem'};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${props => props.small ? '0.8rem' : '0.9rem'};
  
  &:hover {
    background-color: ${props => props.small ? 'transparent' : '#3c3c3c'};
    color: ${props => props.small ? '#f5f5f5' : '#f5f5f5'};
  }
`;

const RepliesSection = styled.div`
  margin-bottom: 2rem;
`;

const RepliesHeader = styled.div`
  margin-bottom: 1rem;
  
  h3 {
    font-size: 1.5rem;
    color: #f5f5f5;
  }
`;

const ReplyCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const ReplyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReplyAuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ReplyAuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.75rem;
`;

const ReplyAuthorName = styled.div`
  font-weight: 500;
`;

const ReplyDate = styled.div`
  font-size: 0.8rem;
  color: #a0a0a0;
`;

const ReplyContent = styled.div`
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ReplyActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ReplyFormSection = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  
  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const ReplyForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReplyTextarea = styled.textarea`
  background-color: #2c2c2c;
  border: none;
  border-radius: 4px;
  padding: 1rem;
  color: #f5f5f5;
  font-family: 'Courier New', monospace;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: 1px solid #3498db;
  }
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-end;
  
  &:hover {
    background-color: #2980b9;
  }
`;

export default ForumPostPage;

import { ForumReply } from '@gods.work/forum';
import styled from 'styled-components';
import { FaThumbsUp, FaReply } from 'react-icons/fa';
import { ActionButton } from './ForumPostCard';

interface ReplyCardProps {
  reply: ForumReply;
}

export const ReplyCard: React.FC<ReplyCardProps> = ({ reply }) => (
  <StyledReplyCard>
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
  </StyledReplyCard>
);

interface RepliesListProps {
  replies: ForumReply[];
}

export const RepliesList: React.FC<RepliesListProps> = ({ replies }) => (
  <RepliesSection>
    <RepliesHeader>
      <h3>Replies ({replies.length})</h3>
    </RepliesHeader>
    {replies.map((reply) => (
      <ReplyCard key={reply.id} reply={reply} />
    ))}
  </RepliesSection>
);

export const ReplyForm: React.FC = () => (
  <ReplyFormSection>
    <h3>Join the Discussion</h3>
    <StyledReplyForm>
      <ReplyTextarea placeholder="Write your reply here..." />
      <SubmitButton>Post Reply</SubmitButton>
    </StyledReplyForm>
  </ReplyFormSection>
);

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

const StyledReplyCard = styled.div`
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

const StyledReplyForm = styled.form`
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

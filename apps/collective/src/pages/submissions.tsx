import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaFilter, FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import { getSubmissions } from '@gods.work/utils';

interface Submission {
  id: number;
  form: string;
  email: string;
  status: string;
  data: any[];
}

const tableHeaders = [
  'Timestamp',
  'Name',
  'Email',
  'Phone number',
  'Brief Artist Bio',
  'Link to Website/Portfolio',
  'Upload 3 Artworks you\'d like to submit.',
  'Are you available 4/18/25 from 6PM-9PM, and would like to speak about your art?',
  'Any Questions?',
];

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] =
    useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchSubmissions = async () => {
      const submissions = await getSubmissions();
      setSubmissions(submissions);
    };
    fetchSubmissions();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredSubmissions(submissions);
    } else {
      setFilteredSubmissions(
        submissions.filter((sub: Submission) => sub.status === activeFilter)
      );
    }
  }, [activeFilter, submissions]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <Container>
      <Head>
        <title>Exhibition Submissions | Art Collective Detroit</title>
        <meta
          name="description"
          content="View and manage submissions for upcoming exhibitions at Art Collective Detroit."
        />
      </Head>

      <Header>
        <Title>Exhibition Submissions</Title>
        <Subtitle>
          Review and manage artwork submissions for upcoming exhibitions
        </Subtitle>
      </Header>

      <FilterBar>
        <FilterIcon>
          <FaFilter />
        </FilterIcon>
        <FilterButton
          active={activeFilter === 'all'}
          onClick={() => handleFilterChange('all')}
        >
          All
        </FilterButton>
        <FilterButton
          active={activeFilter === 'pending'}
          onClick={() => handleFilterChange('pending')}
        >
          Pending
        </FilterButton>
        <FilterButton
          active={activeFilter === 'approved'}
          onClick={() => handleFilterChange('approved')}
        >
          Approved
        </FilterButton>
        <FilterButton
          active={activeFilter === 'rejected'}
          onClick={() => handleFilterChange('rejected')}
        >
          Rejected
        </FilterButton>
      </FilterBar>

      <SubmissionsGrid>
        {filteredSubmissions.map((submission: Submission) => (
          <SubmissionCard key={submission.id}>
            <SubmissionImageContainer>
              <StatusBadge status={submission.status}>
                {submission.status.charAt(0).toUpperCase() +
                  submission.status.slice(1)}
              </StatusBadge>
            </SubmissionImageContainer>
            <SubmissionContent>
              <SubmissionTitle>{submission.data[1]}</SubmissionTitle>
              <SubmissionArtist>by {submission.data[2]}</SubmissionArtist>
              <SubmissionDetails>
                <Detail>
                  <strong>Submitted:</strong> {submission.data[0]}
                </Detail>
              </SubmissionDetails>
              {submission.data[6] && submission.data[6].length > 0 && (
                submission.data[6].map((url: string) => (
                  <GoogleImageFrame key={url} url={url} />
                ))
              )}
              <ActionButtons>
                <ViewButton href={`/submissions/${submission.id}`}>
                  <FaEye /> View Details
                </ViewButton>
                {submission.status === 'pending' && (
                  <>
                    <ApproveButton>
                      <FaCheck /> Approve
                    </ApproveButton>
                    <RejectButton>
                      <FaTimes /> Reject
                    </RejectButton>
                  </>
                )}
              </ActionButtons>
            </SubmissionContent>
          </SubmissionCard>
        ))}
      </SubmissionsGrid>
    </Container>
  );
}

const GoogleImageFrame = ({ url }: { url: string }) => {
    return <iframe src={url} width="640" height="480" allow="autoplay"></iframe>
}

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    sans-serif;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background: #f5f5f5;
  padding: 0.75rem 1rem;
  border-radius: 8px;
`;

const FilterIcon = styled.span`
  margin-right: 1rem;
  color: #666;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${(props) => (props.active ? '#90caf9' : 'transparent')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? '#90caf9' : '#e0e0e0')};
  }
`;

const SubmissionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SubmissionCard = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const SubmissionImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
`;

const SubmissionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StatusBadge = styled.div<{ status: string }>`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  background: ${(props) => {
    switch (props.status) {
      case 'approved':
        return '#4caf50';
      case 'rejected':
        return '#f44336';
      default:
        return '#ff9800';
    }
  }};
  color: white;
`;

const SubmissionContent = styled.div`
  padding: 1.5rem;
`;

const SubmissionTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const SubmissionArtist = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  font-style: italic;
`;

const SubmissionDetails = styled.div`
  margin-bottom: 1.5rem;
`;

const Detail = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ViewButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #90caf9;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s ease;

  &:hover {
    background: #64b5f6;
  }
`;

const ApproveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #4caf50;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease;

  &:hover {
    background: #43a047;
  }
`;

const RejectButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f44336;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease;

  &:hover {
    background: #e53935;
  }
`;

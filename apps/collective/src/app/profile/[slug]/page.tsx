'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getProfile } from '@gods.work/utils';
import Link from 'next/link';
import { Container } from '../../components/Styled';

export default function ProfilePage({ params }: { params: { slug: string } }) {
  const [user, setUser] = useState<any>(null);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getProfile(params.slug);
        setUser(userData);
        setRsvps(userData?.rsvps || []);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <Container>
        <CenteredContent>
          <LoadingMessage>Loading profile...</LoadingMessage>
        </CenteredContent>
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container>
        <CenteredContent>
          <ErrorDisplay>{error || 'User not found'}</ErrorDisplay>
        </CenteredContent>
      </Container>
    );
  }

  return (
    <Container>
      <CenteredContent>
        <ProfileHeader>
          <ProfileTitle>{user.name}</ProfileTitle>
        </ProfileHeader>

        <ProfileSection>
          <SectionTitle>About</SectionTitle>
          <ProfileInfo>
            <ProfileInfoItem>
              <Label>Name:</Label>
              <Value>{user.name || 'Not provided'}</Value>
            </ProfileInfoItem>
            {user.organization && (
              <ProfileInfoItem>
                <Label>Organization:</Label>
                <Value>{user.organization}</Value>
              </ProfileInfoItem>
            )}
            {user.bio && (
              <ProfileInfoItem>
                <Label>Bio:</Label>
                <Value>{user.bio}</Value>
              </ProfileInfoItem>
            )}
          </ProfileInfo>
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>Events</SectionTitle>
          {rsvps.length > 0 ? (
            <EventList>
              {rsvps.map((rsvp) => (
                <EventItem key={rsvp.id}>
                  <Link href={`/event/${rsvp.event?.slug}`} passHref>
                    <EventLink>
                      <EventTitle>{rsvp.event?.title}</EventTitle>
                      <EventDate>
                        {rsvp.event?.start_date ? new Date(rsvp.event.start_date).toLocaleDateString() : 'Date not available'}
                      </EventDate>
                    </EventLink>
                  </Link>
                </EventItem>
              ))}
            </EventList>
          ) : (
            <EmptyState>No events yet.</EmptyState>
          )}
        </ProfileSection>
      </CenteredContent>
    </Container>
  );
}

const CenteredContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 1rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

const ProfileSection = styled.section`
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #333;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-weight: 600;
  color: #666;
  margin-bottom: 0.25rem;
`;

const Value = styled.span`
  color: #333;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const EventItem = styled.li`
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const EventLink = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    h3 {
      color: #FF3366;
    }
  }
`;

const EventTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  transition: color 0.2s ease;
`;

const EventDate = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const EmptyState = styled.p`
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 1rem 0;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorDisplay = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #FF3366;
  background-color: rgba(255, 51, 102, 0.1);
  border-radius: 8px;
`;

'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRsvps, getBookmarks, isAuthorized, logout } from '@gods.work/utils';
import { Container } from '../components/Styled';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../hooks/useUser';
import Image from 'next/image';
import EventCard from '../components/EventCard';

export default function ProfilePage() {
  const { user, loading, error } = useUser();
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthorized()) {
        router.push('/login');
        return;
      }

      try {
        const rsvpsData = await getRsvps({});
        setRsvps(rsvpsData);

        const bookmarksData = await getBookmarks();
        setBookmarks(bookmarksData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <Container>
        <CenteredContent>
          <LoadingMessage>Loading profile...</LoadingMessage>
        </CenteredContent>
      </Container>
    );
  }

  return (
    <Container>
      <CenteredContent>
        <ProfileHeader>
          <ProfileImage>
            {user?.profile_picture ? (
              <Image 
                src={user.profile_picture} 
                alt={user.name || 'Profile'} 
                width={100} 
                height={100}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <ProfilePlaceholder>{user?.name ? user.name.charAt(0).toUpperCase() : '?'}</ProfilePlaceholder>
            )}
          </ProfileImage>
          <ProfileTitle>{user?.name || 'My Profile'}</ProfileTitle>
          {user?.email && <ProfileEmail>{user.email}</ProfileEmail>}
          {user?.organization && <ProfileOrganization>{user.organization}</ProfileOrganization>}
          {user?.bio && <ProfileBio>{user.bio}</ProfileBio>}
          
          <ButtonGroup>
            <EditButton onClick={() => router.push('/profile/edit')}>Edit Profile</EditButton>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </ButtonGroup>
        </ProfileHeader>

        <ProfileSection>
          <SectionTitle>My RSVPs</SectionTitle>
          {rsvps.length > 0 ? (
            <EventGrid>
              {rsvps.map((rsvp) => (
                <EventGridItem key={rsvp.id}>
                  <Link href={`/event/${rsvp.event?.slug}`} passHref>
                    <EventCard event={rsvp.event} />
                  </Link>
                </EventGridItem>
              ))}
            </EventGrid>
          ) : (
            <EmptyState>You haven&apos;t RSVPed to any events yet.</EmptyState>
          )}
        </ProfileSection>

        <ProfileSection>
          <SectionTitle>My Bookmarks</SectionTitle>
          {bookmarks.length > 0 ? (
            <EventGrid>
              {bookmarks.map((bookmark) => (
                <EventGridItem key={bookmark.id}>
                  <Link href={`/event/${bookmark.event?.slug}`} passHref>
                    <EventCard event={bookmark.event} />
                  </Link>
                </EventGridItem>
              ))}
            </EventGrid>
          ) : (
            <EmptyState>You haven&apos;t bookmarked any events yet.</EmptyState>
          )}
        </ProfileSection>
      </CenteredContent>
    </Container>
  );
}

const CenteredContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

const ProfilePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff3366;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
`;

const ProfileTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: #ffffff;
`;

const ProfileEmail = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin: 0.25rem 0;
`;

const ProfileOrganization = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin: 0.25rem 0;
`;

const ProfileBio = styled.p`
  font-size: 1rem;
  color: #dddddd;
  margin: 1rem 0;
  max-width: 600px;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const EditButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3a7bc8;
  }
`;

const LogoutButton = styled.button`
  background-color: #ff3366;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e62958;
  }
`;

const ProfileSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.5rem;
`;

const EventGridItem = styled.div`
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const EmptyState = styled.p`
  color: #aaaaaa;
  font-style: italic;
  text-align: center;
  padding: 2rem 0;
  font-size: 1.1rem;
`;

const LoadingMessage = styled.h2`
  text-align: center;
  color: #ffffff;
  margin: 3rem 0;
  font-size: 1.5rem;
`;

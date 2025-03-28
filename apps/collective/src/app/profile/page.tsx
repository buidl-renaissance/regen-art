'use client';

import { useEffect, useState } from 'react';
import { getRsvps, getBookmarks, isAuthorized, logout } from '@gods.work/utils';
import { Container } from '../components/Styled';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../hooks/useUser';
import Image from 'next/image';
import EventCard from '../components/EventCard';
import {
  CenteredContent,
  ProfileHeader,
  ProfileImage,
  ProfilePlaceholder,
  ProfileTitle,
  ProfileEmail,
  ProfileOrganization,
  ProfileBio,
  ButtonGroup,
  EditButton,
  LogoutButton,
  ProfileSection,
  SectionTitle,
  EventGrid,
  EventGridItem,
  EmptyState,
  LoadingMessage,
} from './styles';

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
              <ProfilePlaceholder>
                {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
              </ProfilePlaceholder>
            )}
          </ProfileImage>
          <ProfileTitle>{user?.name || 'My Profile'}</ProfileTitle>
          {user?.email && <ProfileEmail>{user.email}</ProfileEmail>}
          {user?.organization && (
            <ProfileOrganization>{user.organization}</ProfileOrganization>
          )}
          {user?.bio && <ProfileBio>{user.bio}</ProfileBio>}

          <ButtonGroup>
            <EditButton onClick={() => router.push('/profile/edit')}>
              Edit Profile
            </EditButton>
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

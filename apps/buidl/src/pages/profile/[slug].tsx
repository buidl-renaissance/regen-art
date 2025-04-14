'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Container,
  CenteredContent,
  ErrorDisplay,
  LoadingMessage,
  SectionTitle,
  EventGrid,
  EventGridItem,
  EmptyState,
} from '@gods.work/ui';
import { getProfile, getRsvps } from '@gods.work/utils';
import { EventCard } from '@gods.work/ui';
import {
  ProfileHeader,
  ProfileImage,
  ProfilePlaceholder,
  ProfileTitle,
  ProfileEmail,
  ProfileOrganization,
  ProfileBio,
  ProfileSection,
} from '@gods.work/ui';
import { GetServerSidePropsContext } from 'next';
import { Metadata } from 'next';

export async function generateMetadata(slug: string): Promise<Metadata> {
  // Fetch profile data
  const profile = await getProfile(slug);

  return {
    title: `${profile?.name || 'Profile'} | Art Night Detroit`,
    description: profile?.bio || 'User profile',
    openGraph: {
      title: `${profile?.name || 'Profile'} | Art Night Detroit`,
      description: profile?.bio || 'User profile',
      type: 'profile',
    },
  };
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.params?.slug as string;
  const profile = await getProfile(slug);
  const metadata = await generateMetadata(slug);

  return {
    props: { profile, metadata },
  };
}
export default function ProfilePage({ profile }: { profile: any }) {
  const [user, setUser] = useState<any>(profile);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRsvps = async () => {
      try {
        if (user && user.id) {
          const userRsvps = await getRsvps({ user_id: user.id });
          setRsvps(userRsvps || []);
        }
      } catch (err) {
        console.error('Error fetching user RSVPs:', err);
        setError('Failed to load user events');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRsvps();
  }, [user]);

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
          <ProfileImage>
            {user?.profileImage ? (
              <Image
                src={user.profileImage}
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
          <ProfileTitle>{user.name}</ProfileTitle>
          {user?.email && <ProfileEmail>{user.email}</ProfileEmail>}
          {user?.organization && (
            <ProfileOrganization>{user.organization}</ProfileOrganization>
          )}
          {user?.bio && <ProfileBio>{user.bio}</ProfileBio>}
        </ProfileHeader>

        {loading ? (
          <Container>
            <CenteredContent>
              <LoadingMessage>Loading RSVPs...</LoadingMessage>
            </CenteredContent>
          </Container>
        ) : (
          <ProfileSection>
            <SectionTitle>Events</SectionTitle>
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
              <EmptyState>No events yet.</EmptyState>
            )}
          </ProfileSection>
        )}
      </CenteredContent>
    </Container>
  );
}

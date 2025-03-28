import { Metadata, ResolvingMetadata } from 'next';
import { getProfile } from '@gods.work/utils';
import ProfilePage from './page';

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch profile data
  const slug = (await params).slug;
  const profile = await getProfile(slug);

  return {
    title: `${profile?.name || 'Profile'} | GODS.WORK`,
    description: profile?.bio || 'User profile',
    openGraph: {
      title: `${profile?.name || 'Profile'} | GODS.WORK`,
      description: profile?.bio || 'User profile',
      type: 'profile',
    },
  };
}
export default async function ProfileLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  // Load profile data server-side
  const slug = (await params).slug;
  const profile = await getProfile(slug);

  // Pass the profile data to the page component as props
  return <ProfilePage profile={profile} />;
}

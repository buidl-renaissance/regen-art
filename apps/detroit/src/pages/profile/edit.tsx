'use client';

import { FC } from 'react';
import type { Metadata } from 'next';
import ProfileEditForm from '../../app/components/ProfileEditForm';

const EditProfile: FC = () => {
  return <ProfileEditForm />;
};

export default EditProfile;

export const metadata: Metadata = {
  title: 'Edit Profile | Art Night Detroit',
  description: 'Edit your profile in the Art Night Detroit community',
};

export async function getServerSideProps() {
  return {
    props: {
      metadata,
      theme: 'dark',
    },
  };
}

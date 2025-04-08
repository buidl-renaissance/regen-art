'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Metadata } from 'next';
import {
  ProfileContainer,
  CreateProfileContainer,
  PageTitle,
  FormContainer,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  HelpText,
} from '../../../../../libs/ui/src/lib/ProfileStyles';
import { useClient } from '@gods.work/auth';
import { ProfileView } from '../../../../../libs/ui/src/lib/ProfileView';
import { ProfileData } from '@/libs/utils/src/lib/interfaces';
// import UploadProfileImage from '../../../app/components/UploadProfileImage';

export const metadata: Metadata = {
  title: 'Create Profile | Art Night Detroit',
  description: 'Create your profile to join the Art Night Detroit community',
};

export async function getServerSideProps() {
  return {
    props: {
      metadata,
      theme: 'dark',
    },
  };
}

const ProfilePage: FC = () => {
  const [handle, setHandle] = useState('');
  // const [profileImage, setProfileImage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting] = useState(false);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const router = useRouter();
  const { clientId } = useClient();

  useEffect(() => {
    // Load profile data from localStorage if it exists
    const storedHandle = localStorage.getItem('handle');
    if (storedHandle) {
      setHandle(storedHandle);
      setError(validateHandle(storedHandle));
      setHasExistingProfile(true);

      // Load all profile data from localStorage
      const storedProfileData = localStorage.getItem('profileData');
      if (storedProfileData) {
        try {
          const parsedData = JSON.parse(storedProfileData) as ProfileData;
          setProfileData(parsedData);
        } catch (e) {
          console.error('Error parsing profile data:', e);
          // Fallback to basic profile data if parsing fails
          setProfileData({ handle: storedHandle });
        }
      } else {
        // If no stored profile data, use basic profile with handle only
        setProfileData({ handle: storedHandle });
      }
    }
  }, []);

  const validateHandle = (value: string) => {
    if (!value) {
      return 'Handle is required';
    }

    if (value.length < 3) {
      return 'Handle must be at least 3 characters';
    }

    if (value.length > 30) {
      return 'Handle must be less than 30 characters';
    }

    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return 'Handle can only contain letters, numbers, and underscores';
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHandle(value);
    setError(validateHandle(value));
  };

  // const handleImageChange = (imageUrl: string) => {
  //   setProfileImage(imageUrl);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateHandle(handle);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Simulate API call with timeout
    localStorage.setItem('handle', handle);
    // if (profileImage) {
    //   localStorage.setItem('profileImage', profileImage);
    // }

    router.push('/profile/verify');
  };

  if (hasExistingProfile) {
    return (
      <ProfileContainer>
        <ProfileView
          profileData={profileData as ProfileData}
          showVerifyButton={true}
          showEditProfile={true}
        />
      </ProfileContainer>
    );
  }

  return (
    <CreateProfileContainer>
      <PageTitle>Create Your Profile</PageTitle>

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            {/* <FormGroup>
            <UploadProfileImage
              currentImage={profileImage}
              onImageChange={handleImageChange}
            />
          </FormGroup> */}

            <Label htmlFor="handle">Username / Handle</Label>
            <Input
              id="handle"
              type="text"
              value={handle}
              onChange={handleChange}
              placeholder="Enter your unique handle"
              disabled={isSubmitting}
            />
            <HelpText>
              This will be your unique DPoP identifier. Choose wisely as it
              cannot be changed later.
            </HelpText>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={!!error || !handle || isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Setup Profile'}
          </SubmitButton>
        </form>
      </FormContainer>
    </CreateProfileContainer>
  );
};

export default ProfilePage;


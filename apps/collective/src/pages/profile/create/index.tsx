'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import UploadProfileImage from '../../../app/components/UploadProfileImage';
import { Metadata } from 'next';
import {
  CreateProfileContainer,
  PageTitle,
  FormContainer,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  HelpText
} from '../../../app/components/ProfileStyles';


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


const CreateProfilePage: FC = () => {
  const [handle, setHandle] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const router = useRouter();

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

  const handleImageChange = (file: File) => {
    setProfileImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateHandle(handle);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically make an API call to create the profile
      // For example:
      // const formData = new FormData();
      // formData.append('handle', handle);
      // if (profileImage) {
      //   formData.append('profileImage', profileImage);
      // }
      // await createProfile(formData);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to the profile page or dashboard
      router.push('/profile/' + handle);
    } catch (err) {
      setError('Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CreateProfileContainer>
      <PageTitle>Create Your Profile</PageTitle>
      
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <UploadProfileImage onImageChange={handleImageChange} />
          
          <FormGroup>
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
              This will be your unique DPoP identifier.
              Choose wisely as it cannot be changed later.
            </HelpText>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FormGroup>
          
          <SubmitButton type="submit" disabled={!!error || !handle || isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Profile'}
          </SubmitButton>
        </form>
      </FormContainer>
    </CreateProfileContainer>
  );
};

export default CreateProfilePage;

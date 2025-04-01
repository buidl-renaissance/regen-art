'use client';

import { FC, useState, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import UploadProfileImage from '../../../app/components/UploadProfileImage';

const CreateProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #1a1a1a;
  color: #f5f5f5;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #f5f5f5;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const FormContainer = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 6px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.2rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  color: #f5f5f5;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #333;
  color: #f5f5f5;
  
  &:focus {
    outline: none;
    border-color: #96885f;
    box-shadow: 0 0 0 2px rgba(150, 136, 95, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #96885f;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background-color: #7a6e4e;
  }
  
  &:disabled {
    background-color: #444;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const HelpText = styled.p`
  font-size: 0.875rem;
  color: #aaa;
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

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
              This will be your unique identifier in the collective.
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

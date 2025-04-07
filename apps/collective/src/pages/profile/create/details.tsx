'use client';

import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import type { Metadata } from 'next';
import {
  CreateProfileContainer,
  PageTitle,
  SectionTitle,
  Button,
  FormContainer,
  FormGroup,
  Label,
  Input,
  SocialInputContainer,
  SocialIcon,
  SocialInput,
  ButtonContainer,
  TextArea,
} from '../../../app/components/ProfileStyles';


const ProfileDetails: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    github: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Save profile details to state or API
    console.log('Profile details:', formData);
    // Navigate to next step
    router.push('/profile/create/preferences');
  };

  return (
    <CreateProfileContainer>
      <PageTitle>Create Your Profile</PageTitle>
      
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="bio">Bio</Label>
            <TextArea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself, your interests, and your expertise"
            />
          </FormGroup>
          
          <SectionTitle>Social Media</SectionTitle>
          
          <FormGroup>
            <Label htmlFor="twitter">Twitter</Label>
            <SocialInputContainer>
              <SocialIcon>
                <FaTwitter />
              </SocialIcon>
              <SocialInput
                id="twitter"
                name="twitter"
                type="text"
                value={formData.twitter}
                onChange={handleChange}
              />
            </SocialInputContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="instagram">Instagram</Label>
            <SocialInputContainer>
              <SocialIcon>
                <FaInstagram />
              </SocialIcon>
              <SocialInput
                id="instagram"
                name="instagram"
                type="text"
                value={formData.instagram}
                onChange={handleChange}
              />
            </SocialInputContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <SocialInputContainer>
              <SocialIcon>
                <FaLinkedin />
              </SocialIcon>
              <SocialInput
                id="linkedin"
                name="linkedin"
                type="text"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </SocialInputContainer>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="github">GitHub</Label>
            <SocialInputContainer>
              <SocialIcon>
                <FaGithub />
              </SocialIcon>
              <SocialInput
                id="github"
                name="github"
                type="text"
                value={formData.github}
                onChange={handleChange}
              />
            </SocialInputContainer>
          </FormGroup>
          
          <ButtonContainer>
            <Button type="button" onClick={() => router.back()}>
              Back
            </Button>
            <Button type="submit" primary>
              Continue
            </Button>
          </ButtonContainer>
        </form>
      </FormContainer>
    </CreateProfileContainer>
  );
};

export default ProfileDetails;

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
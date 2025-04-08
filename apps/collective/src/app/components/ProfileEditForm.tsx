'use client';

import { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import {
  CreateProfileContainer,
  PageTitle,
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
} from './ProfileStyles';
import UploadProfileImage from './UploadProfileImage';
import { useProfile } from '../hooks/useProfile';

const ProfileEditForm: FC = () => {
  const router = useRouter();
  const { profileData, saveProfile } = useProfile();
  const [username, setUsername] = useState<string>('');
  const [formData, setFormData] = useState({
    profileImage: '',
    name: '',
    bio: '',
    website: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    github: '',
  });

  useEffect(() => {
    // Load existing profile data if available
    if (profileData) {
      setUsername(profileData.handle);
      setFormData({
        profileImage: profileData.profileImage || '',
        name: profileData.name || '',
        bio: profileData.bio || '',
        website: profileData.website || '',
        twitter: profileData.socialLinks?.twitter || '',
        instagram: profileData.socialLinks?.instagram || '',
        linkedin: profileData.socialLinks?.linkedin || '',
        github: profileData.socialLinks?.github || '',
      });
    } else {
      // Check if username exists in localStorage
      const storedHandle = localStorage.getItem('handle');
      if (!storedHandle) {
        // Redirect back to create profile page if username not set
        router.push('/profile/create');
        return;
      }
      setUsername(storedHandle);
    }
  }, [profileData, router]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: imageUrl,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const updatedProfile = {
      handle: username,
      name: formData.name,
      bio: formData.bio,
      profileImage: formData.profileImage,
      website: formData.website,
      socialLinks: {
        twitter: formData.twitter,
        instagram: formData.instagram,
        linkedin: formData.linkedin,
        github: formData.github,
      },
      // Preserve any existing data
      organization: profileData?.organization || '',
      artworks: profileData?.artworks || [],
    };
    
    // Use the saveProfile function from useProfile hook
    if (saveProfile) {
      saveProfile(updatedProfile);
    } else {
      localStorage.setItem('profileData', JSON.stringify(updatedProfile));
    }
    
    // Navigate back to profile page
    router.push('/profile');
  };

  return (
    <CreateProfileContainer>
      <FormContainer>
        <PageTitle>Edit Your Profile</PageTitle>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <UploadProfileImage
              currentImage={formData.profileImage}
              onImageChange={handleImageChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="handle">Username / Handle</Label>
            <Input
              id="handle"
              name="handle"
              type="text"
              value={username}
              disabled
            />
          </FormGroup>

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

          <FormGroup>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              type="text"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
            />
          </FormGroup>

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
                placeholder="username"
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
                placeholder="username"
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
                placeholder="username"
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
                placeholder="username"
              />
            </SocialInputContainer>
          </FormGroup>

          <ButtonContainer>
            <Button type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" primary>
              Save Changes
            </Button>
          </ButtonContainer>
        </form>
      </FormContainer>
    </CreateProfileContainer>
  );
};

export default ProfileEditForm;

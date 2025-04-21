'use client';

import { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaXTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa6';
import {
  CreateProfileContainer,
  PageTitle,
  ProfileFormContainer,
  ProfileFormGroup,
  ProfileLabel,
  ProfileInput,
  SocialInputContainer,
  SocialIcon,
  SocialInput,
  ProfileButtonContainer,
  ProfileButton,
  ProfileTextArea,
} from './ProfileStyles';
import UploadProfileImage from './UploadProfileImage';
import { useProfile } from '@gods.work/utils';

export const ProfileEditForm: FC = () => {
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
      <ProfileFormContainer>
        <PageTitle>Edit Your Profile</PageTitle>

        <form onSubmit={handleSubmit}>
          <ProfileFormGroup>
            <UploadProfileImage
              currentImage={formData.profileImage}
              onImageChange={handleImageChange}
            />
          </ProfileFormGroup>

          <ProfileFormGroup>
            <ProfileLabel htmlFor="handle">Username / Handle</ProfileLabel>
            <ProfileInput
              id="handle"
              name="handle"
              type="text"
              value={username}
              disabled
            />
          </ProfileFormGroup>

          <ProfileFormGroup>
            <ProfileLabel htmlFor="name">Name</ProfileLabel>
            <ProfileInput
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </ProfileFormGroup>

          <ProfileFormGroup>
            <ProfileLabel htmlFor="bio">Bio</ProfileLabel>
            <ProfileTextArea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself, your interests, and your expertise"
            />
          </ProfileFormGroup>

          <ProfileFormGroup>
            <ProfileLabel htmlFor="website">Website</ProfileLabel>
            <ProfileInput
              id="website"
              name="website"
              type="text"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
            />
          </ProfileFormGroup>

          <ProfileFormGroup>
            <ProfileLabel htmlFor="twitter">Twitter</ProfileLabel>
            <SocialInputContainer>
              <SocialIcon>
                <FaXTwitter />
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
          </ProfileFormGroup>

          <ProfileFormGroup>
            <ProfileLabel htmlFor="instagram">Instagram</ProfileLabel>
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
          </ProfileFormGroup>

          <ProfileFormGroup>
            <ProfileLabel htmlFor="linkedin">LinkedIn</ProfileLabel>
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
          </ProfileFormGroup>

          <ProfileFormGroup>
            <ProfileLabel htmlFor="github">GitHub</ProfileLabel>
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
          </ProfileFormGroup>

          <ProfileButtonContainer>
            <ProfileButton type="button" onClick={() => router.back()}>
              Cancel
            </ProfileButton>
            <ProfileButton type="submit" primary>
              Save Changes
            </ProfileButton>
          </ProfileButtonContainer>
        </form>
      </ProfileFormContainer>
    </CreateProfileContainer>
  );
};

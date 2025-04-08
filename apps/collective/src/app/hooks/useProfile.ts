import { useState, useEffect } from 'react';
import { ProfileData } from '@gods.work/utils';

export const useProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = () => {
      try {
        // Get profile data from local storage
        const storedProfile = localStorage.getItem('profileData');
        if (storedProfile) {
          const parsedProfile: ProfileData = JSON.parse(storedProfile);
          console.log('parsedProfile', parsedProfile);
          setProfileData({
            handle: parsedProfile.handle,
            bio: parsedProfile.bio || parsedProfile.bio || '',
            organization:
              parsedProfile.organization || parsedProfile.organization || '',
            website: parsedProfile.website || '',
            socialLinks: parsedProfile.socialLinks || {
              twitter: '',
              instagram: '',
              github: '',
            },
            profileImage: parsedProfile.profileImage || '',
            artworks: parsedProfile.artworks || [],
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = (updatedProfile: ProfileData) => {
    try {
      localStorage.setItem(`profileData`, JSON.stringify(updatedProfile));
      setProfileData(updatedProfile);
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to save profile data');
      return false;
    }
  };

  return { profileData, loading, error, saveProfile };
};

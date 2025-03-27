'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUser, updateUser, isAuthorized } from '@gods.work/utils';
import {
  Container,
  FormContainer,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonContainer,
  BackButton,
  NextButton,
  ErrorMessage,
  SuccessMessage,
} from '../../components/Styled';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    organization: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthorized()) {
        router.push('/login');
        return;
      }

      try {
        const userData = getUser();
        setUser(userData);
        setFormData({
          name: userData?.name || '',
          email: userData?.email || '',
          bio: userData?.bio || '',
          organization: userData?.organization || '',
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateUser(formData);

      if (!result) {
        throw new Error('Failed to update profile');
      }

      setSuccess(true);
      setUser(result);

      // Redirect after successful update
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'An error occurred while updating your profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <CenteredContent>
          <h2>Loading profile...</h2>
        </CenteredContent>
      </Container>
    );
  }

  return (
    <Container>
      <CenteredContent>
        <ProfileHeader>
          <ProfileTitle>Edit Profile</ProfileTitle>
        </ProfileHeader>

        <FormContainer onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="organization">Organization</Label>
            <Input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Your organization (optional)"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="bio">Bio</Label>
            <TextArea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={4}
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && (
            <SuccessMessage>Profile updated successfully!</SuccessMessage>
          )}

          <ButtonContainer>
            <Link href="/profile" passHref>
              <BackButton type="button">Cancel</BackButton>
            </Link>
            <NextButton type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </NextButton>
          </ButtonContainer>
        </FormContainer>
      </CenteredContent>
    </Container>
  );
}

const CenteredContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 1rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

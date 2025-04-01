import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  styled,
} from '@mui/material';
import { getArtist, updateArtist, Artist } from '@gods.work/utils';
import { UploadMedia } from '@gods.work/ui';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const FormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

interface EditArtistPageProps {
  artist: Artist;
}

const EditArtistPage = ({ artist }: EditArtistPageProps) => {
  const router = useRouter();
  const [name, setName] = useState(artist.name);
  const [handle, setHandle] = useState(artist.handle);
  const [bio, setBio] = useState(artist.bio);
  const [profilePicture, setProfilePicture] = useState(artist.profile_picture);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateArtist({
        id: artist.id,
        name,
        handle,
        bio,
        profile_picture: profilePicture,
      });
      router.push(`/artists/${artist.slug}`);
    } catch (error) {
      console.error('Error updating artist:', error);
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Edit Artist Profile
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <UploadMedia
            onUploadComplete={setProfilePicture}
            mediaUrl={artist.profile_picture}
          />

          <FormField>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>

          <FormField>
            <TextField
              label="Handle"
              variant="outlined"
              fullWidth
              required
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
          </FormField>

          <FormField>
            <TextField
              label="Bio"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </FormField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Update Artist
          </Button>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export const getMetadata = (artist: Artist) => {
  return {
    title: `${artist.name} | Edit Artist Profile`,
    description: artist.bio,
  };
};

export async function getServerSideProps({
  params,
}: {
  params: { artist: string };
}) {
  const artist = await getArtist(params.artist);
  const metadata = getMetadata(artist);
  return {
    props: {
      artist,
      metadata,
    },
  };
}

export default EditArtistPage;

import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import {
  TextField,
  Button as MuiButton,
  Typography,
  Autocomplete,
  Box,
  FormControlLabel,
  Switch,
  Chip,
} from "@mui/material";
import { Artist, createArtwork, getArtists } from "@gods.work/utils";
import { UploadMedia } from "@gods.work/ui";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Create Artwork | Art Night Detroit',
  description: 'Create a new artwork profile for Art Night Detroit',
};

export async function getServerSideProps() {
  return {
    props: {
      metadata,
    },
  };
}

const CreateArtworkPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isForSale, setIsForSale] = useState(false);
  const [price, setPrice] = useState<number | string>("");
  const [collaborators, setCollaborators] = useState<Artist[]>([]);
  const [selectedCollaborator, setSelectedCollaborator] = useState<Artist | null>(null);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const artistsData = await getArtists();
        setArtists(artistsData);
      } catch (error) {
        console.error("Error loading artists:", error);
      }
    };
    loadArtists();
  }, []);

  const generateArtworkDetails = async (imageUrl: string) => {
    if (!imageUrl) return;

    try {
      setGenerating(true);

      // Only generate if title or description is empty
      if (!title || !description) {
        const response = await fetch("/api/ai/artwork", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate artwork details");
        }

        const data = await response.json();

        // Only set values if they're currently empty
        if (!title) setTitle(data.artwork.title);
        if (!description) setDescription(data.artwork.description);
      }
    } catch (error) {
      console.error("Error generating artwork details:", error);
    } finally {
      setGenerating(false);
    }
  };

  const handleAddCollaborator = () => {
    if (selectedCollaborator && !collaborators.some(c => c.id === selectedCollaborator.id)) {
      setCollaborators([...collaborators, selectedCollaborator]);
      setSelectedCollaborator(null);
    }
  };

  const handleRemoveCollaborator = (collaboratorId: number) => {
    setCollaborators(collaborators.filter(c => c.id !== collaboratorId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image first");
      return;
    }

    if (!selectedArtist) {
      alert("Please select an artist");
      return;
    }

    try {
      const artwork = await createArtwork({
        title,
        description,
        artist_id: selectedArtist?.id,
        data: {
          image: imageUrl,
          collaborator_ids: collaborators.map(c => c.id),
          is_for_sale: isForSale,
          price: isForSale ? Number(price) : undefined,
        },
      });

      if (artwork.slug) {
        router.push(`/artwork/${artwork.slug}`);
      }
    } catch (error) {
      console.error("Error creating artwork:", error);
      alert("Failed to create artwork. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <Typography variant="h5" gutterBottom>
        Create New Artwork
      </Typography>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <UploadMedia
            onUploadComplete={(url) => setImageUrl(url)}
            label="Upload Image"
            accept="image/*"
          />
        </FormGroup>
        <MuiButton
          variant="outlined"
          type="button"
          disabled={!imageUrl || generating}
          onClick={() => generateArtworkDetails(imageUrl || "")}
          fullWidth
          sx={{ mb: 2 }}
        >
          {generating ? "Generating..." : "Generate Title & Description"}
        </MuiButton>
        {generating && (
          <UploadStatus>Generating title and description...</UploadStatus>
        )}
        <FormGroup>
          <TextField
            fullWidth
            label="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            variant="outlined"
          />
        </FormGroup>

        <FormGroup>
          <TextField
            fullWidth
            label="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            rows={4}
            variant="outlined"
          />
        </FormGroup>

        <FormGroup>
          <Autocomplete
            options={artists}
            getOptionLabel={(artist: Artist) => artist.name}
            value={selectedArtist}
            onChange={(_, newValue) => setSelectedArtist(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Artist"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FormGroup>

        <FormGroup>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Link href="/artist/create" passHref>
              <MuiButton
                variant="text"
                color="primary"
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ textDecoration: 'none' }}
              >
                Create New Artist
              </MuiButton>
            </Link>
          </Box>
        </FormGroup>

        <FormGroup>
          <Typography variant="subtitle1" gutterBottom>
            Collaborators
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Autocomplete
              options={artists.filter((artist: Artist) => !collaborators.some(c => c.id === artist.id))}
              getOptionLabel={(artist: Artist) => artist.name}
              value={selectedCollaborator}
              onChange={(_, newValue) => setSelectedCollaborator(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Collaborator"
                  variant="outlined"
                  fullWidth
                />
              )}
              sx={{ flexGrow: 1 }}
            />
            <MuiButton 
              variant="outlined" 
              onClick={handleAddCollaborator}
              disabled={!selectedCollaborator}
            >
              Add
            </MuiButton>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {collaborators.map((collaborator) => (
              <Chip
                key={collaborator.id}
                label={collaborator.name}
                onDelete={() => handleRemoveCollaborator(collaborator.id)}
              />
            ))}
          </Box>
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isForSale}
                onChange={(e) => setIsForSale(e.target.checked)}
                color="primary"
              />
            }
            label="Artwork is for sale"
          />
        </FormGroup>

        {isForSale && (
          <FormGroup>
            <TextField
              fullWidth
              label="Price ($)"
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required={isForSale}
              variant="outlined"
              InputProps={{
                startAdornment: <span>$</span>,
              }}
            />
          </FormGroup>
        )}

        <MuiButton
          variant="contained"
          type="submit"
          disabled={!imageUrl || uploading || generating}
          fullWidth
        >
          Create Artwork
        </MuiButton>
      </Form>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UploadStatus = styled.div`
  color: #666;
  margin: 0.5rem 0;
  font-style: italic;
`;

export default CreateArtworkPage;

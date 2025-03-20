'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { UploadButton } from '@gods.work/ui';
import { createArtwork, Artwork } from '@gods.work/utils';

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #444;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3d9140;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const UploadText = styled.p`
  margin-bottom: 1rem;
  color: #666;
  text-align: center;
`;

const ImagePreview = styled.div`
  margin: 1rem 0;
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 4px;
  overflow: hidden;
`;

const StatusMessage = styled.div<{ isError?: boolean }>`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  background-color: ${(props) => (props.isError ? '#ffebee' : '#e8f5e9')};
  color: ${(props) => (props.isError ? '#c62828' : '#2e7d32')};
`;

interface ArtworkFormProps {
  onSuccess?: (artwork: Artwork) => void;
}

export default function ArtworkForm({ onSuccess }: ArtworkFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [artistName, setArtistName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const handleUploadComplete = (url: string) => {
    setImageUrl(url);
    setStatus(null);
  };

  const handleUploadError = (error: string) => {
    setStatus({
      message: `Failed to upload image: ${error}`,
      isError: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) {
      setStatus({
        message: 'Please upload an image for your artwork',
        isError: true,
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const artworkData: Partial<Artwork> = {
        title: title || 'Untitled Artwork',
        description: description || 'No description provided',
        data: {
          image: imageUrl,
        },
        meta: {
          artistName: artistName || 'Anonymous',
        },
      };

      const result = await createArtwork(artworkData);

      setStatus({
        message: 'Artwork successfully created!',
        isError: false,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setArtistName('');
      setImageUrl('');

      if (onSuccess && result) {
        onSuccess(result);
      }
    } catch (error) {
      setStatus({
        message:
          error instanceof Error ? error.message : 'Failed to create artwork',
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Create New Artwork</FormTitle>

      <form onSubmit={handleSubmit}>
        <UploadContainer>
          <UploadText>Upload your artwork image</UploadText>

          <UploadButton
            endpoint="/api/upload"
            accept="image/*"
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
          >
            Select Image
          </UploadButton>

          {imageUrl && (
            <ImagePreview>
              <img
                src={imageUrl}
                alt="Artwork preview"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </ImagePreview>
          )}
        </UploadContainer>

        <FormGroup>
          <Label htmlFor="title">Artwork Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter artwork title"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your artwork..."
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="artistName">Artist Name</Label>
          <Input
            id="artistName"
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="Your name or pseudonym"
          />
        </FormGroup>

        {status && (
          <StatusMessage isError={status.isError}>
            {status.message}
          </StatusMessage>
        )}

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Artwork'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

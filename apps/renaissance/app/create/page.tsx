'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getArtworks } from '@gods.work/utils';
import { UploadButton } from '@gods.work/ui';

// Types
interface Artist {
  id: number;
  name: string;
  slug: string;
  profile_picture: string;
  bio: string;
}

interface Artwork {
  id: number;
  slug: string;
  title: string;
  description: string;
  artist: Artist;
  data: {
    image: string;
  };
  meta: any;
  selected?: boolean;
}

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ArtworkCard = styled.div<{ selected: boolean }>`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  ${({ selected }) =>
    selected &&
    `
    box-shadow: 0 0 0 3px #4CAF50, 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ArtworkImage = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`;

const ArtworkInfo = styled.div`
  padding: 1rem;
`;

const ArtworkTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ArtistName = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const SelectionIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #4caf50;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  z-index: 2;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GenerateButton = styled(Button)`
  background-color: #4caf50;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background-color: #3e8e41;
  }
`;

const ClearButton = styled(Button)`
  background-color: transparent;
  color: #666;
  border: 1px solid #ccc;

  &:hover:not(:disabled) {
    background-color: #f5f5f5;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  color: white;
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const StoryContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 1001;
  overflow-y: auto;
  padding: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
  }

  h2 {
    font-size: 1.8rem;
    margin: 1.5rem 0 1rem;
    color: #444;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    color: #555;
  }

  strong,
  em {
    color: #333;
  }

  blockquote {
    border-left: 4px solid #4caf50;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #666;
  }

  .story-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem 0;
  }

  .story-section {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem 0;
  }

  .artwork-reference {
    font-weight: bold;
    color: #4caf50;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .story-divider {
    text-align: center;
    margin: 2rem 0;
    color: #999;
    border-top: 1px solid #ccc;
    padding-top: 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #f5f5f5;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  padding: 2rem;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const UploadText = styled.p`
  margin-bottom: 1rem;
  color: #666;
  text-align: center;
`;

const ArtworkForm = styled.form`
  width: 100%;
  max-width: 500px;
  margin: 1rem auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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

const UploadedImagePreview = styled.div`
  margin: 1rem 0;
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 4px;
  overflow: hidden;
`;

export default function CreatePage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [storyHtml, setStoryHtml] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [showArtworkForm, setShowArtworkForm] = useState(false);
  const [artworkTitle, setArtworkTitle] = useState('');
  const [artworkDescription, setArtworkDescription] = useState('');
  const [artistName, setArtistName] = useState('');
  const router = useRouter();

  useEffect(() => {
    // In a real app, fetch artworks from an API
    // For now, using mock data
    const fetchArtworks = async () => {
      const requestedArtworks = await getArtworks();
      setArtworks(requestedArtworks);
    };
    fetchArtworks();
  }, []);

  const toggleArtworkSelection = (id: number) => {
    setArtworks((prevArtworks) => {
      return prevArtworks.map((artwork) => {
        if (artwork.id === id) {
          const newSelected = !artwork.selected;
          // Update selected count
          setSelectedCount((prev) => (newSelected ? prev + 1 : prev - 1));
          return { ...artwork, selected: newSelected };
        }
        return artwork;
      });
    });
  };

  const clearSelections = () => {
    setArtworks((prevArtworks) => {
      return prevArtworks.map((artwork) => ({ ...artwork, selected: false }));
    });
    setSelectedCount(0);
  };

  const closeStory = () => {
    setStoryHtml(null);
  };

  const handleUploadComplete = (url: string) => {
    setUploadedImageUrl(url);
    setShowArtworkForm(true);
    // Default values
    setArtworkTitle('My Artwork');
    setArtworkDescription('');
    setArtistName('');
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
    alert(`Failed to upload image: ${error}`);
  };

  const handleArtworkFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newArtwork: Artwork = {
      id: Date.now(), // Use timestamp as temporary ID
      slug: `uploaded-${Date.now()}`,
      title: artworkTitle || 'Untitled Artwork',
      description: artworkDescription || 'No description provided',
      artist: {
        id: 0,
        name: artistName || 'Anonymous',
        slug: 'user-artist',
        profile_picture: '',
        bio: 'Custom artwork contributor'
      },
      data: {
        image: uploadedImageUrl!
      },
      meta: {},
      selected: true
    };
    
    setArtworks(prev => [...prev, newArtwork]);
    setSelectedCount(prev => prev + 1);
    
    // Reset form
    setShowArtworkForm(false);
    setUploadedImageUrl(null);
    setArtworkTitle('');
    setArtworkDescription('');
    setArtistName('');
  };

  const generateStory = async () => {
    setLoading(true);

    try {
      const selectedArtworks = artworks.filter((artwork) => artwork.selected);

      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artworks: selectedArtworks }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate story');
      }

      // Get the HTML content
      const storyHtml = await response.text();

      // Store the story in localStorage
      localStorage.setItem('generatedStory', storyHtml);

      // Display the story immediately
      setStoryHtml(storyHtml);
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Failed to generate story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>Create Your Digital Renaissance Story</Title>
        <Subtitle>
          Select artworks to weave together a unique narrative that explores the
          intersection of art, technology, and rebellion.
        </Subtitle>
      </Header>

      {!showArtworkForm ? (
        <UploadContainer>
          <UploadText>Want to add your own artwork? Upload an image below:</UploadText>
          <UploadButton 
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            accept="image/*"
          >
            Upload Your Artwork
          </UploadButton>
        </UploadContainer>
      ) : (
        <ArtworkForm onSubmit={handleArtworkFormSubmit}>
          <h2>Configure Your Artwork</h2>
          
          {uploadedImageUrl && (
            <UploadedImagePreview>
              <Image
                src={uploadedImageUrl}
                alt="Uploaded artwork"
                fill
                style={{ objectFit: 'cover' }}
              />
            </UploadedImagePreview>
          )}
          
          <FormGroup>
            <Label htmlFor="artworkTitle">Artwork Title</Label>
            <Input
              id="artworkTitle"
              type="text"
              value={artworkTitle}
              onChange={(e) => setArtworkTitle(e.target.value)}
              placeholder="Enter a title for your artwork"
              required
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
          
          <FormGroup>
            <Label htmlFor="artworkDescription">Description</Label>
            <Textarea
              id="artworkDescription"
              value={artworkDescription}
              onChange={(e) => setArtworkDescription(e.target.value)}
              placeholder="Describe your artwork..."
            />
          </FormGroup>
          
          <ButtonContainer>
            <ClearButton 
              type="button" 
              onClick={() => {
                setShowArtworkForm(false);
                setUploadedImageUrl(null);
              }}
            >
              Cancel
            </ClearButton>
            <GenerateButton type="submit">
              Add to Collection
            </GenerateButton>
          </ButtonContainer>
        </ArtworkForm>
      )}

      <ArtworkGrid>
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            selected={!!artwork.selected}
            onClick={() => toggleArtworkSelection(artwork.id)}
          >
            {artwork.selected && <SelectionIndicator>✓</SelectionIndicator>}
            <ArtworkImage>
              <Image
                src={artwork.data.image}
                alt={artwork.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </ArtworkImage>
            <ArtworkInfo>
              <ArtworkTitle>{artwork.title}</ArtworkTitle>
              {artwork.artist && (
                <ArtistName>by {artwork.artist.name}</ArtistName>
              )}
            </ArtworkInfo>
          </ArtworkCard>
        ))}
      </ArtworkGrid>

      <ButtonContainer>
        <ClearButton onClick={clearSelections} disabled={selectedCount === 0}>
          Clear Selections
        </ClearButton>
        <GenerateButton
          onClick={generateStory}
          disabled={selectedCount < 2 || loading}
        >
          Generate Story ({selectedCount} selected)
        </GenerateButton>
      </ButtonContainer>

      {loading && (
        <LoadingOverlay>
          <Spinner />
          <p>Creating your Digital Renaissance story...</p>
        </LoadingOverlay>
      )}

      {storyHtml && (
        <StoryContainer>
          <CloseButton onClick={closeStory}>×</CloseButton>
          <div
            className="story-content"
            dangerouslySetInnerHTML={{ __html: storyHtml }}
          />
          <ButtonContainer>
            <GenerateButton onClick={() => router.push('/story')}>
              Save & View Full Story
            </GenerateButton>
          </ButtonContainer>
        </StoryContainer>
      )}
    </PageContainer>
  );
}

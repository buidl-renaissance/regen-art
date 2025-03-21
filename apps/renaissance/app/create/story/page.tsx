'use client';

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@gods.work/ui';
import { convertDefaultToResized, Artwork } from '@gods.work/utils';

interface SelectedArtwork extends Partial<Artwork> {
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

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const ImageCard = styled.div<{ selected?: boolean }>`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
  border: ${(props) => (props.selected ? '3px solid #4caf50' : 'none')};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageInfo = styled.div`
  padding: 1rem;
  background-color: white;
`;

const ImageTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: #333;
`;

const ImageDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #388e3c;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem;
`;

const StoryContainer = styled.div`
  max-width: 1200px;
  margin: 0;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 90%;
  height: 90vh;
  overflow-y: auto;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
  }
  
  h2 {
    font-size: 1.5rem;
    margin: 1.5rem 0 1rem;
    color: #444;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    color: #555;
  }
  
  strong, em {
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
  position: sticky;
  top: 0;
  right: 1rem;
  float: right;
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
  margin-bottom: 1rem;
  z-index: 10;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const LoadingContainer = styled(ModalOverlay)`
  flex-direction: column;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #fff;
  margin: 1rem 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem 2rem;
  border-radius: 8px;
`;
// Local storage key
const STORAGE_KEY = 'renaissance_story_images';

export default function StoryPage() {
  const [uploadedImages, setUploadedImages] = useState<SelectedArtwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [storyHtml, setStoryHtml] = useState<string | null>(null);
  const router = useRouter();

  // Load saved images from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedImages = localStorage.getItem(STORAGE_KEY);
      if (savedImages) {
        try {
          const parsedImages = JSON.parse(savedImages);
          setUploadedImages(parsedImages);
        } catch (error) {
          console.error('Error parsing saved images:', error);
        }
      }
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && uploadedImages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(uploadedImages));
      } catch (error) {
        console.error('Error saving images to localStorage:', error);
      }
    }
  }, [uploadedImages]);

  const handleUploadComplete = useCallback((url: string) => {
    const newArtwork: SelectedArtwork = {
      id: Date.now(),
      title: `Image ${uploadedImages.length + 1}`,
      description: '',
      data: {
        image: convertDefaultToResized(url)
      },
      selected: true,
    };
    
    setUploadedImages(prev => {
      const updatedImages = [...prev, newArtwork];
      // Ensure immediate storage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
      }
      return updatedImages;
    });
  }, [uploadedImages]);

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
    alert(`Failed to upload image: ${error}`);
  };

  const toggleImageSelection = (id: number) => {
    setUploadedImages(prev => {
      const updatedImages = prev.map(img => 
        img.id === id ? { ...img, selected: !img.selected } : img
      );
      // Ensure immediate storage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
      }
      return updatedImages;
    });
  };

  const clearImages = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      setUploadedImages([]);
    }
  };

  const generateStory = async () => {
    const selectedImages = uploadedImages.filter(img => img.selected);
    
    if (selectedImages.length === 0) {
      alert('Please select at least one image to generate a story.');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artworks: selectedImages
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate story');
      }
      
      const data = await response.text();
      setStoryHtml(data);
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Failed to generate story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeStory = () => {
    setStoryHtml(null);
  };

  return (
    <PageContainer>
      <Header>
        <Title>Create a Story from Images</Title>
        <Subtitle>
          Upload images and our AI will generate a creative story connecting them together.
        </Subtitle>
      </Header>
      
      <UploadContainer>
        <UploadText>Upload images to include in your story</UploadText>
        <UploadButton
          accept="image/*"
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
        >
          Select Image
        </UploadButton>
      </UploadContainer>
      
      {uploadedImages.length > 0 && (
        <>
          <ImagesContainer>
            {uploadedImages.map((image) => (
              <ImageCard 
                key={image.id} 
                selected={image.selected}
                onClick={() => toggleImageSelection(image.id ?? 0   )}
              >
                <ImageWrapper>
                  <StyledImage src={image.data?.image ?? ''} alt={image.title} />
                </ImageWrapper>
                <ImageInfo>
                  <ImageTitle>{image.title}</ImageTitle>
                  <ImageDescription>{image.description}</ImageDescription>
                </ImageInfo>
              </ImageCard>
            ))}
          </ImagesContainer>
          
          <ButtonContainer>
            <Button 
              onClick={clearImages}
            >
              Clear Images
            </Button>
            <Button 
              onClick={generateStory}
              disabled={loading || !uploadedImages.some(img => img.selected)}
            >
              Generate Story
            </Button>
          </ButtonContainer>
        </>
      )}
      
      {loading && (
        <LoadingContainer>
          <LoadingText>Generating your story... This may take a moment.</LoadingText>
        </LoadingContainer>
      )}
      
      {storyHtml && (
        <ModalOverlay>
          <StoryContainer>
            <CloseButton onClick={closeStory}>×</CloseButton>
            <div dangerouslySetInnerHTML={{ __html: storyHtml }} />
          </StoryContainer>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

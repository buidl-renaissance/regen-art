'use client';

import { FC, useState, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { FaCamera, FaUpload } from 'react-icons/fa';

interface UploadProfileImageProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
}

const UploadProfileImage: FC<UploadProfileImageProps> = ({
  onImageChange,
  currentImage,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    currentImage || null
  );
  const [error, setError] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log('UploadProfileImage:', currentImage, imagePreview);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    // Clear any previous errors
    setError('');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(
        'https://api.detroiter.network/api/upload-media',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      setImagePreview(data.url);
      onImageChange(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to upload image'
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ProfileImageContainer>
      <ImagePreview
        onClick={handleImageClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {imagePreview || currentImage ? (
          <Image
            src={imagePreview || currentImage || ''}
            alt="Profile preview"
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <PlaceholderContainer>
            <PlaceholderIcon>
              <FaCamera />
            </PlaceholderIcon>
            <PlaceholderText>
              Drop image here or click to upload
            </PlaceholderText>
          </PlaceholderContainer>
        )}
      </ImagePreview>

      <UploadButton onClick={handleImageClick} disabled={isUploading}>
        {isUploading ? (
          <>
            <LoadingSpinner />
            Uploading...
          </>
        ) : (
          <>
            <FaUpload />
            {imagePreview ? 'Change Photo' : 'Upload Photo'}
          </>
        )}
      </UploadButton>

      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ProfileImageContainer>
  );
};

export default UploadProfileImage;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;

const ImagePreview = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 1rem;
  border: 2px solid #444;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a3a3a;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const UploadButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #96885f;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #7a6e4e;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #bbb;
`;

const PlaceholderIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
  color: #ddd;
`;

const PlaceholderText = styled.span`
  color: #ddd;
  font-size: 0.7rem;
  text-align: center;
  padding: 0 0.6rem;
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const LoadingSpinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 2px solid white;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

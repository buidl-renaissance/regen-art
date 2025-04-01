'use client';

import { FC, useState, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface UploadProfileImageProps {
  onImageChange: (file: File) => void;
  initialImage?: string | null;
}

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ImagePreview = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 1rem;
  border: 2px solid #444;
  
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

const PlaceholderText = styled.span`
  color: #777;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const UploadProfileImage: FC<UploadProfileImageProps> = ({ onImageChange, initialImage }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage || null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  
  const handleFile = (file: File) => {
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
    
    // Pass the file to parent component
    onImageChange(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <ProfileImageContainer>
      <ImagePreview 
        onClick={handleImageClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {imagePreview ? (
          <Image 
            src={imagePreview} 
            alt="Profile preview" 
            fill 
            style={{ objectFit: 'cover' }} 
          />
        ) : (
          <PlaceholderText>Drop image here or click to upload</PlaceholderText>
        )}
      </ImagePreview>
      
      <UploadButton onClick={handleImageClick}>
        {imagePreview ? 'Change Photo' : 'Upload Photo'}
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


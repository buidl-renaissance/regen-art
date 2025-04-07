import React, { useState, useRef } from 'react';
import styled from 'styled-components';

interface UploadButtonProps {
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: string) => void;
  className?: string;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
  uploadUrl?: string;
  disabled?: boolean;
}

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const HiddenInput = styled.input`
  display: none;
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const UploadButton: React.FC<UploadButtonProps> = ({
  onUploadComplete,
  onUploadError,
  className,
  accept = 'image/*',
  multiple = false,
  children = 'Upload Image',
  disabled = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', files[0]);

      const response = await fetch('https://api.detroiter.network/api/upload-media', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      
      if (onUploadComplete) {
        onUploadComplete(data.url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (onUploadError) {
        onUploadError(error instanceof Error ? error.message : 'Unknown error occurred');
      }
    } finally {
      setIsUploading(false);
      // Reset the input value so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <StyledButton 
        onClick={handleClick} 
        disabled={disabled || isUploading}
        className={className}
        type="button"
      >
        {isUploading && <LoadingSpinner />}
        {isUploading ? 'Uploading...' : children}
      </StyledButton>
      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      />
    </>
  );
};

export default UploadButton;

import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Metadata } from 'next';
import { uploadMedia } from '@gods.work/utils';

export const metadata: Metadata = {
  title: 'Artist Intake | Gods.Work Collective',
  description: 'Submit your work to be considered for our upcoming art show.',
};

export async function getServerSideProps() {
  return {
    props: {
      metadata,
    },
  };
}

export default function ArtistIntake() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instagram: '',
    bio: '',
    isAvailable: '',
    willingToSpeak: '',
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Create preview URLs
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
      
      setIsUploading(true);

      const newImageUrls = await Promise.all(newFiles.map(async (file) => {
        const res = await uploadMedia(file);
        return res.url as string;
      }));


      setImages(prev => [...prev, ...newImageUrls]);

      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviews[index]);
    
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create the payload with form data and images
      const payload = {
        ...formData,
        imageUrls: images
      };
      
      // Send the data to your API endpoint
      const response = await fetch('/api/artist/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit artist application');
      }
      
      // Parse the response if needed
      const result = await response.json();
      
      console.log('Form submitted:', { formData, images });
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        instagram: '',
        bio: '',
        isAvailable: '',
        willingToSpeak: '',
      });
      
      // Clean up image previews
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
      setImages([]);
      setImagePreviews([]);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledPage>
      <div className="header">
        <h1>Artist Submission</h1>
      </div>
      
      <div className="form-container">
        {submitSuccess ? (
          <div className="success-message">
            <h2 className="form-title">Thank You!</h2>
            <p className="form-description">
              Your submission has been received. We'll review your work and get back to you soon.
            </p>
            <button 
              className="submit-button" 
              onClick={() => setSubmitSuccess(false)}
            >
              Submit Another Application
            </button>
            <Link href="/" className="back-link">
              Return to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="form-title">Join Our Exhibition</h2>
            <p className="form-description">
              Submit your work to be considered for our upcoming art show. We're looking for innovative and inspiring artists to showcase.
            </p>
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="instagram">Instagram Handle</label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="@yourusername"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="bio">Artist Bio *</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself and your artistic practice..."
                required
              />
            </div>
            
            <div className="form-group">
              <label>Are you available on April 18th? *</label>
              <div className="radio-group">
                <div 
                  className="radio-option" 
                  onClick={() => handleRadioChange('isAvailable', 'yes')}
                >
                  <input 
                    type="radio" 
                    id="available-yes" 
                    name="isAvailable" 
                    checked={formData.isAvailable === 'yes'} 
                    onChange={() => {}} 
                    required
                  />
                  <label htmlFor="available-yes">Yes</label>
                </div>
                <div 
                  className="radio-option" 
                  onClick={() => handleRadioChange('isAvailable', 'no')}
                >
                  <input 
                    type="radio" 
                    id="available-no" 
                    name="isAvailable" 
                    checked={formData.isAvailable === 'no'} 
                    onChange={() => {}}
                  />
                  <label htmlFor="available-no">No</label>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Are you willing to speak about your work? *</label>
              <div className="radio-group">
                <div 
                  className="radio-option" 
                  onClick={() => handleRadioChange('willingToSpeak', 'yes')}
                >
                  <input 
                    type="radio" 
                    id="speak-yes" 
                    name="willingToSpeak" 
                    checked={formData.willingToSpeak === 'yes'} 
                    onChange={() => {}} 
                    required
                  />
                  <label htmlFor="speak-yes">Yes</label>
                </div>
                <div 
                  className="radio-option" 
                  onClick={() => handleRadioChange('willingToSpeak', 'no')}
                >
                  <input 
                    type="radio" 
                    id="speak-no" 
                    name="willingToSpeak" 
                    checked={formData.willingToSpeak === 'no'} 
                    onChange={() => {}}
                  />
                  <label htmlFor="speak-no">No</label>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Example Works *</label>
              <p className="file-info">Upload 3-5 images of your work (JPG, PNG, max 5MB each)</p>
              
              <div className="file-upload">
                <label htmlFor="artwork" className="upload-button">
                  Select Images
                </label>
                <input
                  type="file"
                  id="artwork"
                  accept="image/jpeg, image/png"
                  multiple
                  onChange={handleImageUpload}
                />
              </div>
              
              {imagePreviews.length > 0 && (
                <div className="image-preview">
                  {imagePreviews.map((src, index) => (
                    <div key={index} className="preview-item">
                      <img src={src} alt={`Preview ${index + 1}`} />
                      <div 
                        className="remove-button"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isUploading && (
                <div className="upload-progress">
                  <p>Uploading...</p>
                </div>
              )}
            </div>
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting || images.length === 0 || isUploading}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
            
            <Link href="/" className="back-link">
              Return to Home
            </Link>
          </form>
        )}
      </div>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  font-family: 'Inter', sans-serif;
  background-color: #121212;
  padding: 2rem;

  .header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .form-container {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    background-color: rgba(30, 30, 30, 0.7);
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .form-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .form-description {
    margin-bottom: 2rem;
    text-align: center;
    opacity: 0.8;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #333;
    background-color: #1e1e1e;
    color: white;
    font-family: inherit;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #FF3366;
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  .upload-progress {
    margin-top: 0.5rem;
    text-align: center;
    opacity: 0.8;
  }

  .file-upload {
    margin-top: 0.5rem;
    
    input {
      display: none;
    }
    
    .upload-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #333;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: #444;
      }
    }
    
    .file-info {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }

  .image-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
    
    .preview-item {
      position: relative;
      width: 150px;
      height: 150px;
      border-radius: 4px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .remove-button {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        
        &:hover {
          background-color: rgba(255, 51, 102, 0.8);
        }
      }
    }
  }

  .radio-group {
    display: flex;
    gap: 1.5rem;
    margin-top: 0.5rem;
  }

  .radio-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s, transform 0.1s;
    
    &:hover {
      background-color: rgba(255, 51, 102, 0.1);
    }
    
    &:active {
      transform: scale(0.98);
    }
    
    input[type="radio"] {
      appearance: none;
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border: 2px solid #444;
      border-radius: 50%;
      margin: 0;
      position: relative;
      
      &:checked {
        border-color: #FF3366;
        
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background-color: #FF3366;
          border-radius: 50%;
        }
      }
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(255, 51, 102, 0.3);
      }
    }
    
    label {
      margin-bottom: 0;
      font-weight: normal;
    }
  }

  .submit-button {
    background: #FF3366;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
    width: 100%;
    margin-top: 1rem;

    &:hover {
      background: #E62E5C;
    }
    
    &:disabled {
      background: #666;
      cursor: not-allowed;
    }
  }

  .back-link {
    display: block;
    text-align: center;
    margin-top: 1.5rem;
    color: #FF3366;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

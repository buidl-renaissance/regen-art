import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { UploadMedia } from '@gods.work/ui';

const NewProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    location: '',
    contactEmail: '',
    imageUrl: '',
    websiteUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // For now, just show an alert
    alert(
      'Project submitted successfully! (This is a placeholder - actual submission functionality coming soon)'
    );
  };

  // return (
  //   <Container>
  //     <ComingSoon />
  //   </Container>
  // );

  return (
    <Container>
      <Head>
        <title>Create New Project | Renaissance City</title>
        <meta
          name="description"
          content="Launch your community project in Detroit's creative ecosystem."
        />
      </Head>

      <BackLink href="/">
        <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Home
      </BackLink>

      <PageTitle>Launch Your Project</PageTitle>
      <PageDescription>
        Share your creative initiative with Detroit&apos;s community. Fill out
        the form below to get started with your project.
      </PageDescription>

      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Project Title *</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Give your project a clear, descriptive name"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Project Description *</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const { name, value } = e.target;
              setFormData((prev) => ({ ...prev, [name]: value }));
            }}
            required
            placeholder="Describe your project, its goals, and how it benefits the community"
            rows={5}
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label htmlFor="type">Project Type *</Label>
            <Select
              id="type"
              name="type"
              value={formData.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
              }}
              required
            >
              <option value="">Select a project type</option>
              <option value="artwork">Artwork</option>
              <option value="event">Event</option>
              <option value="project">Project</option>
              <option value="workshop">Workshop</option>
              <option value="installation">Installation</option>
              <option value="performance">Performance</option>
              <option value="exhibition">Exhibition</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="location">Location in Detroit</Label>
            <Input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Neighborhood or specific location"
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="contactEmail">Contact Email *</Label>
          <Input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            placeholder="Email where people can reach you"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="imageUrl">Project Image</Label>
          <UploadMedia
            onUploadComplete={(url) =>
              setFormData((prev) => ({ ...prev, imageUrl: url }))
            }
            label="Upload an image representing your project"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="websiteUrl">Project Website</Label>
          <Input
            type="url"
            id="websiteUrl"
            name="websiteUrl"
            value={formData.websiteUrl}
            onChange={handleChange}
            placeholder="Your project's website or social media page"
          />
        </FormGroup>

        <SubmitButton type="submit">Submit Project</SubmitButton>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Courier New', monospace;
  background-color: #121212;
  color: #f5f5f5;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #90caf9;
  margin-bottom: 2rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #64b5f6;
    text-decoration: underline;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #f5f5f5;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #aaa;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #f5f5f5;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #1e1e1e;
  color: #f5f5f5;
  font-family: 'Courier New', monospace;

  &:focus {
    outline: none;
    border-color: #90caf9;
    box-shadow: 0 0 0 2px rgba(144, 202, 249, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #1e1e1e;
  color: #f5f5f5;
  font-family: 'Courier New', monospace;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #90caf9;
    box-shadow: 0 0 0 2px rgba(144, 202, 249, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #1e1e1e;
  color: #f5f5f5;
  font-family: 'Courier New', monospace;

  &:focus {
    outline: none;
    border-color: #90caf9;
    box-shadow: 0 0 0 2px rgba(144, 202, 249, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: #90caf9;
  color: #121212;
  font-weight: 600;
  padding: 0.875rem 1.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Courier New', monospace;
  margin-top: 1rem;

  &:hover {
    background-color: #64b5f6;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

export default NewProject;

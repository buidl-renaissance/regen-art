import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { Creation, CreationStatus, CreationType } from '@gods.work/create';
import { CreateClient } from '@gods.work/clients';
export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const createClient = new CreateClient();
    const creation = await createClient.getCreationBySlug(params.slug);

    if (!creation) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        creation,
      },
    };
  } catch (error) {
    console.error('Error fetching creation:', error);
    return {
      notFound: true,
    };
  }
}

export default function EditCreationPage({ creation }: { creation: Creation }) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Creation>>({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    location: '',
    url: '',
    status: CreationStatus.ACTIVE,
    type: CreationType.PROJECT,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (creation) {
      setFormData({
        title: creation.title,
        description: creation.description,
        category: creation.category,
        imageUrl: creation.imageUrl,
        location: creation.location,
        url: creation.url,
        status: creation.status,
        type: creation.type,
      });
    }
  }, [creation]);

  if (router.isFallback) {
    return <LoadingContainer>Loading project details...</LoadingContainer>;
  }

  if (!creation) {
    return (
      <Container>
        <Head>
          <title>Creation Not Found | BUIDL Detroit</title>
        </Head>
        <ErrorContainer>
          <h1>Creation Not Found</h1>
          <p>
            The creation you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <BackLink href="/projects">← Back to Projects</BackLink>
        </ErrorContainer>
      </Container>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      //   const client = new CreateClient();
      //   await client.updateCreation(creation.id, formData);
      //   router.push(`/projects/${creation.slug}`);
    } catch (err) {
      console.error('Error updating creation:', err);
      setError('Failed to update project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Head>
        <title>Edit {creation.title} | BUIDL Detroit</title>
      </Head>

      <BackButtonContainer>
        <BackLink href={`/projects/${creation.slug}`}>
          <FaArrowLeft /> Back to Project
        </BackLink>
      </BackButtonContainer>

      <FormHeader>
        <h1>Edit Project</h1>
      </FormHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              {Object.values(CreationType).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="url">Website URL</Label>
          <Input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {Object.values(CreationStatus).map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </Select>
        </FormGroup>

        <ButtonContainer>
          <SubmitButton type="submit" disabled={isLoading}>
            <FaSave /> {isLoading ? 'Saving...' : 'Save Changes'}
          </SubmitButton>
          <CancelButton href={`/projects/${creation.slug}`}>
            Cancel
          </CancelButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #f5f5f5;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: #f5f5f5;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
    color: #b0b0b0;
  }
`;

const BackButtonContainer = styled.div`
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: #f5f5f5;
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 87, 87, 0.2);
  color: #ff5757;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #222;
  color: #f5f5f5;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #222;
  color: #f5f5f5;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #222;
  color: #f5f5f5;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a7bc8;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #f5f5f5;
  border: 1px solid #444;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

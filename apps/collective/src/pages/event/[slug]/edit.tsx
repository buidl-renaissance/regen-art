import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaImage,
} from 'react-icons/fa';
import Link from 'next/link';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

import { Container, CenteredContent } from '../../../app/components/Styled';
import { Button, BackButton } from '../../../app/components/Styled';
import { ErrorMessage } from '../../../app/components/Styled';
import { useAuth } from '@gods.work/auth';
import { DPoPEvent, getEvent, updateEvent } from '@gods.work/utils';
import { UploadMedia, VenueSearch } from '@gods.work/ui';

// Dynamically import the rich text editor to avoid SSR issues
const RichTextEditor = dynamic(
  () => import('../../../app/components/RichTextEditor'),
  {
    ssr: false,
  }
);

interface EditEventPageProps {
  event: DPoPEvent;
}

export default function EditEventPage({ event }: EditEventPageProps) {
  const router = useRouter();
  const { slug } = router.query;
  const { user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (event) {
      reset({
        title: event.title,
        content: event.content,
        excerpt: event.excerpt,
        start_date: event.start_date
          ? format(new Date(event.start_date), "yyyy-MM-dd'T'HH:mm")
          : '',
        end_date: event.end_date
          ? format(new Date(event.end_date), "yyyy-MM-dd'T'HH:mm")
          : '',
        image: event.image,
        url: event.url,
        venue: event.venue,
      });
    }
  }, [event, reset]);

  // Check if user has permission to edit
  if (!user) {
    return (
      <Container>
        <CenteredContent>
          <ErrorMessage>
            You don't have permission to edit this event
          </ErrorMessage>
          <Link href={`/event/${slug}`} passHref>
            <BackButton>Back to Event</BackButton>
          </Link>
        </CenteredContent>
      </Container>
    );
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      data.id = event.id;
      data.venue_id = data.venue.id;
      console.log('update event:', data);
      await updateEvent(data);
      router.push(`/event/${slug}`);
    } catch (error) {
      console.error('Error updating event:', error);
      setSubmitError('Failed to update event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <CenteredContent>
        <PageHeader>
          <BackLink href={`/event/${slug}`}>← Back to Event</BackLink>
          <PageTitle>Edit Event</PageTitle>
        </PageHeader>

        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label htmlFor="title">Event Title</Label>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => <Input {...field} id="title" />}
            />
            {errors.title && (
              <FieldError>{errors.title.message as string}</FieldError>
            )}
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label htmlFor="start_date">
                <FaCalendarAlt /> Start Date & Time
              </Label>
              <Controller
                name="start_date"
                control={control}
                rules={{ required: 'Start date is required' }}
                render={({ field }) => (
                  <Input {...field} id="start_date" type="datetime-local" />
                )}
              />
              {errors.start_date && (
                <FieldError>{errors.start_date.message as string}</FieldError>
              )}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="end_date">
                <FaClock /> End Date & Time
              </Label>
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="end_date" type="datetime-local" />
                )}
              />
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor="venue">
              <FaMapMarkerAlt /> Venue
            </Label>
            <Controller
              name="venue"
              control={control}
              render={({ field }) => (
                <VenueSearch
                  onSelect={(venue) => field.onChange(venue)}
                  initialVenue={field.value}
                />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="image">
              <FaImage /> Image URL
            </Label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <UploadMedia
                  mediaUrl={field.value}
                  onUploadComplete={(url) => {
                    console.log('upload complete:', url);
                    field.onChange(url);
                  }}
                />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="excerpt">Short Description</Label>
            <Controller
              name="excerpt"
              control={control}
              render={({ field }) => (
                <Textarea {...field} id="excerpt" rows={3} />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="url">URL</Label>
            <Controller
              name="url"
              control={control}
              render={({ field }) => <Input {...field} id="url" />}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="content">Full Description</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => <RichTextEditor {...field} />}
            />
          </FormGroup>

          {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

          <ButtonGroup>
            <Link href={`/event/${slug}`} passHref>
              <CancelButton>Cancel</CancelButton>
            </Link>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </SubmitButton>
          </ButtonGroup>
        </FormContainer>
      </CenteredContent>
    </Container>
  );
}

export const getServerSideProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  const event = await getEvent(slug);
  return { props: { event } };
};

// Styled Components
const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
`;

const BackLink = styled.a`
  display: inline-block;
  color: #aaa;
  text-decoration: none;
  margin-bottom: 0.5rem;

  &:hover {
    color: #fff;
  }
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const SubmitButton = styled(Button)`
  background: #4a90e2;

  &:hover:not(:disabled) {
    background: #3a80d2;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(BackButton)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const LoadingMessage = styled.div`
  font-size: 1.2rem;
  color: #aaa;
  text-align: center;
  padding: 2rem;
`;

const FieldError = styled.div`
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

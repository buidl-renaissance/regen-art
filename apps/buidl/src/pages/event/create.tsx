'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createEvent } from '@gods.work/utils';
import {
  Container,
  Title,
  Subtitle,
  FormContainer,
  UploadSection,
  UploadIcon,
  UploadText,
  UploadSubtext,
  PreviewImage,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonContainer,
  BackButton,
  NextButton,
} from '@gods.work/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Event | Art Night Detroit',
  description: 'Create a new event for your community',
  openGraph: {
    title: 'Create Event | Art Night Detroit',
    description: 'Create a new event for your community',
    type: 'website',
  },
};

export async function getServerSideProps() {
  return {
    props: {
      metadata,
    },
  };
}

export default function CreateEvent() {
  const [flyerImage, setFlyerImage] = useState<string | null>(null);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFlyerImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (!eventName || !eventDate || !eventLocation || !eventDescription) {
        setError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      const eventData = {
        title: eventName,
        date: eventDate,
        time: eventTime,
        location: eventLocation,
        description: eventDescription,
        imageUrl: flyerImage || '/default-event.jpg',
      };

      const response = await createEvent(eventData);

      // Redirect to the event page or confirmation page
      window.location.href = `/event/${response.id}`;
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Create a New Event</Title>
        <Subtitle>Start by uploading your event flyer or poster</Subtitle>

        <label htmlFor="flyer-upload">
          <UploadSection>
            {flyerImage ? (
              <PreviewImage src={flyerImage} alt="Event flyer preview" />
            ) : (
              <>
                <UploadIcon />
                <UploadText>Upload your event flyer</UploadText>
                <UploadSubtext>
                  Drag and drop or click to browse (JPG, PNG, PDF)
                </UploadSubtext>
              </>
            )}
            <input
              type="file"
              id="flyer-upload"
              accept="image/*,application/pdf"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </UploadSection>
        </label>

        <FormGroup>
          <Label htmlFor="event-name">Event Name</Label>
          <Input
            type="text"
            id="event-name"
            placeholder="Enter the name of your event"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="event-date">Date</Label>
          <Input
            type="date"
            id="event-date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="event-time">Time</Label>
          <Input
            type="time"
            id="event-time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="event-location">Location</Label>
          <Input
            type="text"
            id="event-location"
            placeholder="Enter the venue or address"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="event-description">Description</Label>
          <TextArea
            id="event-description"
            placeholder="Describe your event..."
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </FormGroup>

        {error && (
          <div style={{ color: '#FF3366', marginBottom: '1rem' }}>{error}</div>
        )}

        <ButtonContainer>
          <Link href="/events">
            <BackButton>Cancel</BackButton>
          </Link>
          <NextButton onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </NextButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
}

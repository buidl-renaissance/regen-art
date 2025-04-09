import React, { useState } from 'react';
import styled from 'styled-components';
import PageLayout from '../components/PageLayout';

// Styled Components
const ContactContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
`;

const ContactTitle = styled.h1`
  font-size: 32px;
  color: #00ff99;
  margin-bottom: 20px;
  text-align: center;
`;

const ContactDescription = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  text-align: center;
`;

const ContactForm = styled.form`
  background: #0d0d0d;
  padding: 30px;
  border-radius: 5px;
  border: 1px solid #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #00ff99;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 4px;
  color: #e0e0e0;
  font-family: 'Courier New', monospace;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 4px;
  color: #e0e0e0;
  min-height: 150px;
  font-family: 'Courier New', monospace;
`;

const SubmitButton = styled.button`
  background: #00ff99;
  color: #0d0d0d;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Courier New', monospace;

  &:hover {
    background: #00cc77;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(0, 255, 153, 0.1);
  border: 1px solid #00ff99;
  color: #00ff99;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid #ff0000;
  color: #ff0000;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

const ContactInfo = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ContactMethod = styled.div`
  margin: 10px 0;
  text-align: center;
  flex: 1;
  min-width: 200px;
`;

const ContactMethodTitle = styled.h3`
  color: #00ff99;
  margin-bottom: 10px;
`;

const ContactMethodLink = styled.a`
  color: #e0e0e0;
  text-decoration: none;

  &:hover {
    color: #00ff99;
    text-decoration: underline;
  }
`;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    // In a real implementation, you would send the form data to your backend
    // For now, we'll just simulate a successful submission
    setSubmitStatus('success');

    // Reset form after successful submission
    if (submitStatus === 'success') {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }
  };

  return (
    <PageLayout
      title="Contact DPoP.tech - Get in Touch"
      description="Have questions about DPoP? Reach out to our team for support, partnership inquiries, or technical assistance."
    >
      <ContactContainer>
        <ContactTitle>Get in Touch</ContactTitle>
        <ContactDescription>
          Have questions about DPoP? Want to integrate it into your project?
          We're here to help. Fill out the form below or reach out through our
          other channels.
        </ContactDescription>

        {submitStatus === 'success' && (
          <SuccessMessage>
            Your message has been sent successfully. We&apos;ll get back to you
            soon!
          </SuccessMessage>
        )}

        {submitStatus === 'error' && (
          <ErrorMessage>
            Please fill out all required fields before submitting.
          </ErrorMessage>
        )}

        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email *</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message *</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">Send Message</SubmitButton>
        </ContactForm>

        <ContactInfo>
          <ContactMethod>
            <ContactMethodTitle>Discord</ContactMethodTitle>
            <ContactMethodLink
              href="https://discord.gg/kSuS9kdgTk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our community
            </ContactMethodLink>
          </ContactMethod>

          <ContactMethod>
            <ContactMethodTitle>GitHub</ContactMethodTitle>
            <ContactMethodLink
              href="https://github.com/buidl-renaissance/dpop"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report issues or contribute
            </ContactMethodLink>
          </ContactMethod>

          <ContactMethod>
            <ContactMethodTitle>Twitter</ContactMethodTitle>
            <ContactMethodLink
              href="https://x.com/WiredInSamurai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow for updates
            </ContactMethodLink>
          </ContactMethod>
        </ContactInfo>
      </ContactContainer>
    </PageLayout>
  );
}

'use client';

import { FC, useState, FormEvent } from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
  background-color: #f5f5f5;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const InquireContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  display: inline-block;
  padding: 0 70px;
  left: 50%;
  transform: translateX(-50%);

  &::before,
  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 2px;
    background: #96885f;
    position: absolute;
    top: 50%;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0 40px;
    margin-bottom: 1.5rem;
    
    &::before,
    &::after {
      width: 30px;
    }
  }
`;

const IntroText = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #ddd;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #96885f;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #ddd;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #96885f;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
    min-height: 120px;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #ddd;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #96885f;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background-color: transparent;
  border: 4px solid #96885f;
  color: #333;
  font-size: 1.2rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;
  margin-top: 1rem;

  &:hover {
    background-color: rgba(150, 136, 95, 0.2);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border-width: 3px;
    margin-top: 0.5rem;
  }
`;

const SuccessMessage = styled.div`
  background-color: rgba(75, 181, 67, 0.1);
  border: 2px solid #4bb543;
  padding: 1.5rem;
  text-align: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1.5rem;
    
    h3 {
      font-size: 1.2rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #d9534f;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 0.3rem;
  }
`;

const InquirePage: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'tattoo',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'tattoo',
        message: '',
      });
    } catch (error) {
      setErrors({ form: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledPage>
      <InquireContainer>
        <PageTitle>Inquire</PageTitle>

        <IntroText>
          Interested in commissioning artwork or scheduling a tattoo
          consultation? Fill out the form below, and I'll get back to you as
          soon as possible.
        </IntroText>

        {isSubmitted ? (
          <SuccessMessage>
            <h3>Thank you for your inquiry!</h3>
            <p>
              I've received your message and will respond within 2-3 business
              days.
            </p>
          </SuccessMessage>
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="inquiryType">Inquiry Type</Label>
              <Select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
              >
                <option value="tattoo">Tattoo Consultation</option>
                <option value="artwork">Artwork Commission</option>
                <option value="collaboration">Collaboration</option>
                <option value="other">Other</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please provide details about your inquiry. For tattoos, include description, size, placement, and any reference images."
              />
              {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
            </FormGroup>

            {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </SubmitButton>
          </Form>
        )}
      </InquireContainer>
    </StyledPage>
  );
};

export default InquirePage;

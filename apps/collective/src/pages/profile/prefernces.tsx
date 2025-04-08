'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useClient } from '@gods.work/auth';
import styled from 'styled-components';
import QRCode from 'react-qr-code';
import {
  CreateProfileContainer,
  PageTitle,
  FormContainer,
  FormGroup,
  Label,
  Input,
  SubmitButton,
} from '../../app/components/ProfileStyles';

const PreferencesPage: FC = () => {
  const router = useRouter();
  const [handle, setHandle] = useState<string>('');
  const [userMessage, setUserMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'bot', message: string}>>([]);
  const [preferences, setPreferences] = useState({
    notifications: true,
    publicProfile: true,
    darkMode: true,
    language: 'english',
  });
  const { clientId } = useClient();

  useEffect(() => {
    // Check if handle exists in localStorage
    const storedHandle = localStorage.getItem('handle');
    if (!storedHandle) {
      // Redirect back to create profile page if handle not set
      router.push('/profile');
      return;
    }
    setHandle(storedHandle);

    // Initialize chat with a welcome message
    setChatHistory([
      {
        type: 'bot',
        message: "Hi there! I'm your preferences assistant. I can help you customize your profile settings. What would you like to adjust today? You can ask about notifications, profile visibility, theme settings, or language preferences."
      }
    ]);
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    // Add user message to chat history
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);

    // Process the message with simple NLP
    processUserMessage(userMessage);

    // Clear input field
    setUserMessage('');
  };

  const processUserMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    let response = '';

    // Simple NLP to detect user intent
    if (lowerMessage.includes('notification') || lowerMessage.includes('alert')) {
      response = "I've updated your notification preferences. Would you like to receive notifications for messages, events, or both?";
    } else if (lowerMessage.includes('profile') || lowerMessage.includes('public') || lowerMessage.includes('private')) {
      response = "Your profile visibility has been updated. Would you like your profile to be public, private, or visible only to connections?";
      setPreferences(prev => ({ ...prev, publicProfile: lowerMessage.includes('public') }));
    } else if (lowerMessage.includes('dark') || lowerMessage.includes('light') || lowerMessage.includes('theme')) {
      response = `I've set your theme preference to ${lowerMessage.includes('dark') ? 'dark' : 'light'} mode. Is there anything else you'd like to adjust?`;
      setPreferences(prev => ({ ...prev, darkMode: lowerMessage.includes('dark') }));
    } else if (lowerMessage.includes('language') || lowerMessage.includes('speak')) {
      response = "I can help you set your preferred language. Currently, we support English, Spanish, and French. Which would you prefer?";
    } else {
      response = "I'm not sure I understand. Could you tell me more about what preferences you'd like to adjust? You can ask about notifications, profile visibility, theme settings, or language preferences.";
    }

    // Add bot response to chat history
    setTimeout(() => {
      setChatHistory(prev => [...prev, { type: 'bot', message: response }]);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save preferences to localStorage or API
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    router.push('/profile');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <CreateProfileContainer>
      <PageTitle>Profile Preferences</PageTitle>

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="handle">Your Handle</Label>
            <Input
              id="handle"
              type="text"
              value={handle}
              disabled
            />
          </FormGroup>

          <PreferencesSection>
            <SectionTitle>Customize Your Experience</SectionTitle>
            
            <FormGroup>
              <CheckboxContainer>
                <CheckboxInput
                  id="notifications"
                  name="notifications"
                  type="checkbox"
                  checked={preferences.notifications}
                  onChange={handleInputChange}
                />
                <CheckboxLabel htmlFor="notifications">Enable Notifications</CheckboxLabel>
              </CheckboxContainer>
            </FormGroup>

            <FormGroup>
              <CheckboxContainer>
                <CheckboxInput
                  id="publicProfile"
                  name="publicProfile"
                  type="checkbox"
                  checked={preferences.publicProfile}
                  onChange={handleInputChange}
                />
                <CheckboxLabel htmlFor="publicProfile">Make Profile Public</CheckboxLabel>
              </CheckboxContainer>
            </FormGroup>

            <FormGroup>
              <CheckboxContainer>
                <CheckboxInput
                  id="darkMode"
                  name="darkMode"
                  type="checkbox"
                  checked={preferences.darkMode}
                  onChange={handleInputChange}
                />
                <CheckboxLabel htmlFor="darkMode">Use Dark Mode</CheckboxLabel>
              </CheckboxContainer>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="language">Preferred Language</Label>
              <Select
                id="language"
                name="language"
                value={preferences.language}
                onChange={handleInputChange}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </Select>
            </FormGroup>
          </PreferencesSection>

          <ChatSection>
            <SectionTitle>Preference Assistant</SectionTitle>
            <ChatContainer>
              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} isUser={chat.type === 'user'}>
                  {chat.message}
                </ChatMessage>
              ))}
            </ChatContainer>
            <ChatInputContainer>
              <ChatInput
                type="text"
                value={userMessage}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your preferences..."
              />
              <SendButton type="button" onClick={handleSendMessage}>Send</SendButton>
            </ChatInputContainer>
          </ChatSection>

          <QRSection>
            <SectionTitle>Your Profile QR Code</SectionTitle>
            <QRCodeWrapper>
              <QRCode value={`${handle}:${clientId}`} size={200} />
              <QRCodeCaption>Scan to connect with me</QRCodeCaption>
            </QRCodeWrapper>
          </QRSection>

          <SubmitButton type="submit">Save Preferences</SubmitButton>
        </form>
      </FormContainer>
    </CreateProfileContainer>
  );
};

// Styled Components
const PreferencesSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #f5f5f5;
  border-bottom: 1px solid #444;
  padding-bottom: 0.5rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CheckboxInput = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  cursor: pointer;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: #333;
  color: #f5f5f5;
  border: 1px solid #444;
  font-family: monospace;
`;

const ChatSection = styled.div`
  margin-bottom: 2rem;
`;

const ChatContainer = styled.div`
  background-color: #333;
  border-radius: 8px;
  padding: 1rem;
  height: 200px;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChatMessage = styled.div<{ isUser: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 16px;
  max-width: 80%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.isUser ? '#4a5568' : '#2d3748'};
  word-break: break-word;
`;

const ChatInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: #333;
  color: #f5f5f5;
  border: 1px solid #444;
  font-family: monospace;
`;

const SendButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #4a5568;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: monospace;
  
  &:hover {
    background-color: #2d3748;
  }
`;

const QRSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QRCodeWrapper = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QRCodeCaption = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: black;
  text-align: center;
`;

export default PreferencesPage;


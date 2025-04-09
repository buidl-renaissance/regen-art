import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaGithub, FaCode, FaUsers, FaDiscord, FaBug } from 'react-icons/fa';

const ContributingPage = () => {
  return (
    <Container>
      <Head>
        <title>Contributing to BUIDL Detroit - Developer Guide</title>
        <meta
          name="description"
          content="Learn how to contribute to BUIDL Detroit's open-source projects and join our developer community."
        />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Contributing Guide</HeroTitle>
          <HeroSubtitle>Join us in building Detroit&apos;s digital future</HeroSubtitle>
          <HeroDescription>
            We welcome contributions of all sizes from developers of all skill levels. 
            This guide will help you get started with our codebase and contribution process.
          </HeroDescription>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>
          <FaCode style={{ marginRight: '12px' }} />
          Getting Started
        </SectionTitle>
        <Paragraph>
          Our projects are built with modern web technologies including Next.js, TypeScript, 
          and various backend services. Follow these steps to set up your development environment:
        </Paragraph>

        <StepContainer>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Fork the Repository</StepTitle>
              <StepDescription>
                Visit our <StepLink href="https://github.com/buidl-renaissance/regen-art/" target="_blank">GitHub repository</StepLink> and 
                fork it to your own GitHub account.
              </StepDescription>
            </StepContent>
          </Step>

          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Clone Your Fork</StepTitle>
              <StepDescription>
                <CodeBlock>
                  git clone https://github.com/YOUR-USERNAME/regen-art.git<br />
                  cd regen-art
                </CodeBlock>
              </StepDescription>
            </StepContent>
          </Step>

          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Install Dependencies</StepTitle>
              <StepDescription>
                <CodeBlock>
                  npm install<br />
                  # or<br />
                  yarn install
                </CodeBlock>
              </StepDescription>
            </StepContent>
          </Step>

          <Step>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>Start Development Server</StepTitle>
              <StepDescription>
                <CodeBlock>
                  npm run dev<br />
                  # or<br />
                  yarn dev
                </CodeBlock>
              </StepDescription>
            </StepContent>
          </Step>
        </StepContainer>
      </Section>

      <Section>
        <SectionTitle>
          <FaUsers style={{ marginRight: '12px' }} />
          Contribution Workflow
        </SectionTitle>
        
        <Paragraph>
          We follow a standard GitHub workflow for contributions. Here's how to contribute:
        </Paragraph>

        <WorkflowContainer>
          <WorkflowStep>
            <WorkflowTitle>1. Find an Issue</WorkflowTitle>
            <WorkflowDescription>
              Browse our <WorkflowLink href="https://github.com/buidl-renaissance/regen-art/issues" target="_blank">GitHub Issues</WorkflowLink> to 
              find something to work on, or create a new issue to discuss your ideas.
            </WorkflowDescription>
          </WorkflowStep>

          <WorkflowStep>
            <WorkflowTitle>2. Create a Branch</WorkflowTitle>
            <WorkflowDescription>
              Create a new branch for your work:
              <CodeBlock>
                git checkout -b feature/your-feature-name
              </CodeBlock>
            </WorkflowDescription>
          </WorkflowStep>

          <WorkflowStep>
            <WorkflowTitle>3. Make Your Changes</WorkflowTitle>
            <WorkflowDescription>
              Implement your changes, following our code style guidelines. Make sure to write tests for new features.
            </WorkflowDescription>
          </WorkflowStep>

          <WorkflowStep>
            <WorkflowTitle>4. Submit a Pull Request</WorkflowTitle>
            <WorkflowDescription>
              Push your changes and create a pull request. Provide a clear description of your changes and reference any related issues.
            </WorkflowDescription>
          </WorkflowStep>
        </WorkflowContainer>
      </Section>

      <Section>
        <SectionTitle>
          <FaBug style={{ marginRight: '12px' }} />
          Code Standards
        </SectionTitle>
        
        <StandardsGrid>
          <StandardCard>
            <StandardTitle>Code Formatting</StandardTitle>
            <StandardDescription>
              We use ESLint and Prettier to maintain consistent code style. Run <code>npm run lint</code> before submitting your PR.
            </StandardDescription>
          </StandardCard>

          <StandardCard>
            <StandardTitle>Testing</StandardTitle>
            <StandardDescription>
              Write tests for new features using Jest and React Testing Library. Run <code>npm test</code> to ensure all tests pass.
            </StandardDescription>
          </StandardCard>

          <StandardCard>
            <StandardTitle>Commit Messages</StandardTitle>
            <StandardDescription>
              Follow conventional commits format: <code>type(scope): message</code> (e.g., <code>feat(auth): add login page</code>)
            </StandardDescription>
          </StandardCard>

          <StandardCard>
            <StandardTitle>Documentation</StandardTitle>
            <StandardDescription>
              Update documentation for any new features or changes to existing functionality.
            </StandardDescription>
          </StandardCard>
        </StandardsGrid>
      </Section>

      <Section>
        <SectionTitle>Get Help</SectionTitle>
        <Paragraph>
          Need help with your contribution? We're here to support you!
        </Paragraph>
        
        <HelpGrid>
          <HelpCard>
            <HelpIcon>
              <FaDiscord />
            </HelpIcon>
            <HelpTitle>Join Our Discord</HelpTitle>
            <HelpDescription>
              Connect with our community on Discord for real-time help and discussions.
            </HelpDescription>
            <HelpLink href="https://discord.gg/kSuS9kdgTk" target="_blank">
              Join Discord
            </HelpLink>
          </HelpCard>

          <HelpCard>
            <HelpIcon>
              <FaGithub />
            </HelpIcon>
            <HelpTitle>GitHub Discussions</HelpTitle>
            <HelpDescription>
              Ask questions and share ideas in our GitHub Discussions forum.
            </HelpDescription>
            <HelpLink href="https://github.com/buidl-renaissance/regen-art/discussions" target="_blank">
              View Discussions
            </HelpLink>
          </HelpCard>
        </HelpGrid>
      </Section>
    </Container>
  );
};

export default ContributingPage;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  color: #f5f5f5;
  background-color: #121212;
  min-height: 100vh;
`;

const Hero = styled.div`
  padding: 6rem 0 4rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 4rem 0 3rem;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: #a0a0a0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #d0d0d0;
`;

const Section = styled.section`
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  color: #00ff99;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #d0d0d0;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Step = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
`;

const StepNumber = styled.div`
  background-color: #00ff99;
  color: #121212;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const StepDescription = styled.div`
  font-size: 1rem;
  color: #d0d0d0;
  line-height: 1.5;
`;

const StepLink = styled.a`
  color: #00ff99;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CodeBlock = styled.pre`
  background-color: #1a1a1a;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1rem 0;
  font-family: 'Courier New', monospace;
  border-left: 3px solid #00ff99;
`;

const WorkflowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const WorkflowStep = styled.div`
  background-color: #1a1a1a;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #00ff99;
`;

const WorkflowTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const WorkflowDescription = styled.div`
  font-size: 1rem;
  color: #d0d0d0;
  line-height: 1.5;
`;

const WorkflowLink = styled.a`
  color: #00ff99;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StandardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const StandardCard = styled.div`
  background-color: #1a1a1a;
  padding: 1.5rem;
  border-radius: 8px;
  border-top: 3px solid #00ff99;
`;

const StandardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const StandardDescription = styled.p`
  font-size: 0.95rem;
  color: #d0d0d0;
  line-height: 1.5;
  
  code {
    background-color: #2a2a2a;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
`;

const HelpGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const HelpCard = styled.div`
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const HelpIcon = styled.div`
  font-size: 2.5rem;
  color: #00ff99;
  margin-bottom: 1rem;
`;

const HelpTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const HelpDescription = styled.p`
  font-size: 1rem;
  color: #d0d0d0;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const HelpLink = styled.a`
  display: inline-block;
  background-color: #00ff99;
  color: #121212;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #00cc7a;
  }
`;

import React from 'react';
import Head from 'next/head';
import {
  FaTicketAlt,
  FaExchangeAlt,
  FaChartLine,
  FaUsers,
  FaLock,
  FaCode,
} from 'react-icons/fa';
import {
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  Container,
  Section,
  SectionTitle,
  VisionText,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  ProcessSteps,
  ProcessStep,
  StepNumber,
  StepContent,
  StepTitle,
  StepDescription,
  TechDescription,
  TechStack,
  TechItem,
  TechIcon,
  TechName,
  TechDetail,
  CallToAction,
  CTAContent,
  CTATitle,
  CTAText,
  CTAButtons,
  CTAButton,
  SectionContainer,
} from '../components/Styles';

export default function TicketingPage() {
  return (
    <Container>
      <Head>
        <title>Transparent Ticketing | Detroit Renaissance</title>
        <meta
          name="description"
          content="Transparent ticketing protocols with automated revenue sharing for artists, organizers, and venues in Detroit."
        />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Transparent Ticketing</HeroTitle>
          <HeroSubtitle>
            Reimagining event ticketing for Detroit&apos;s creative community
          </HeroSubtitle>
        </HeroContent>
      </Hero>

      <Section>
        <SectionContainer size="large">
          <SectionTitle>Our Vision</SectionTitle>
          <VisionText>
            We&apos;re building a transparent, community-owned ticketing
            platform that ensures fair revenue distribution among artists,
            venues, and organizers. By leveraging blockchain technology,
            we&apos;re creating a system that eliminates middlemen, reduces
            fees, and puts more money directly into the hands of creators.
          </VisionText>

          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>
                <FaExchangeAlt />
              </FeatureIcon>
              <FeatureTitle>Automated Revenue Sharing</FeatureTitle>
              <FeatureDescription>
                Smart contracts automatically distribute ticket revenue to
                artists, venues, and organizers based on pre-agreed terms,
                ensuring everyone gets paid fairly and promptly.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaLock />
              </FeatureIcon>
              <FeatureTitle>Secure & Verifiable</FeatureTitle>
              <FeatureDescription>
                Blockchain-based tickets prevent counterfeiting and scalping
                while providing a transparent record of all transactions and
                revenue distribution.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <FaUsers />
              </FeatureIcon>
              <FeatureTitle>Community Governance</FeatureTitle>
              <FeatureDescription>
                Platform policies and fee structures are determined by community
                vote, ensuring the system evolves to meet the needs of
                Detroit&apos;s creative ecosystem.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </SectionContainer>
      </Section>

      <Section>
        <SectionContainer size="large">
          <SectionTitle>How It Works</SectionTitle>

          <ProcessSteps>
            <ProcessStep>
              <StepNumber>1</StepNumber>
              <StepContent>
                <StepTitle>Event Creation</StepTitle>
                <StepDescription>
                  Organizers create events and set revenue sharing agreements
                  with artists and venues. All terms are encoded in smart
                  contracts for transparency.
                </StepDescription>
              </StepContent>
            </ProcessStep>

            <ProcessStep>
              <StepNumber>2</StepNumber>
              <StepContent>
                <StepTitle>Ticket Sales</StepTitle>
                <StepDescription>
                  Attendees purchase tickets through our platform using
                  traditional payment methods or cryptocurrency. Each ticket is
                  minted as a unique digital asset.
                </StepDescription>
              </StepContent>
            </ProcessStep>

            <ProcessStep>
              <StepNumber>3</StepNumber>
              <StepContent>
                <StepTitle>Automated Distribution</StepTitle>
                <StepDescription>
                  As tickets are sold, revenue is automatically distributed
                  according to the pre-set agreements, with minimal platform
                  fees.
                </StepDescription>
              </StepContent>
            </ProcessStep>

            <ProcessStep>
              <StepNumber>4</StepNumber>
              <StepContent>
                <StepTitle>Event Check-in</StepTitle>
                <StepDescription>
                  Attendees present their digital tickets for verification at
                  the event, with options for both online and offline
                  validation.
                </StepDescription>
              </StepContent>
            </ProcessStep>
          </ProcessSteps>
        </SectionContainer>
      </Section>

      <Section>
        <SectionContainer size="large">
          <SectionTitle>Technical Implementation</SectionTitle>
          <TechDescription>
            Our ticketing platform is being built with a hybrid approach that
            combines the best of web3 technology with traditional web
            development to ensure accessibility for all users.
          </TechDescription>

          <TechStack>
            <TechItem>
              <TechIcon>
                <FaCode />
              </TechIcon>
              <TechName>Smart Contracts</TechName>
              <TechDetail>
                Ethereum-based contracts for ticket issuance and revenue
                distribution
              </TechDetail>
            </TechItem>

            <TechItem>
              <TechIcon>
                <FaChartLine />
              </TechIcon>
              <TechName>Analytics Dashboard</TechName>
              <TechDetail>
                Real-time sales data and revenue tracking for event organizers
              </TechDetail>
            </TechItem>

            <TechItem>
              <TechIcon>
                <FaTicketAlt />
              </TechIcon>
              <TechName>Mobile Ticketing</TechName>
              <TechDetail>
                Progressive web app for ticket management and event check-in
              </TechDetail>
            </TechItem>
          </TechStack>
        </SectionContainer>
      </Section>

      <CallToAction>
        <CTAContent>
          <CTATitle>Join Us in Building the Future of Ticketing</CTATitle>
          <CTAText>
            We&apos;re looking for developers, designers, and event organizers
            to help shape this platform. Whether you&apos;re interested in smart
            contract development, UI/UX design, or testing the platform at your
            events, we want to collaborate with you.
          </CTAText>
          <CTAButtons>
            <CTAButton
              href="https://github.com/buidl-renaissance"
              target="_blank"
            >
              Contribute on GitHub
            </CTAButton>
            <CTAButton href="https://discord.gg/kSuS9kdgTk" target="_blank">
              Join Our Discord
            </CTAButton>
          </CTAButtons>
        </CTAContent>
      </CallToAction>
    </Container>
  );
}

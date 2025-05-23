import React from 'react';
import styled from 'styled-components';
import PageLayout from '../components/PageLayout';

const Hero = styled.section`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(180deg, #1a1a1a, #0d0d0d);

  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

const HeroTitle = styled.h2`
  font-size: 36px;
  color: #fff;
  text-shadow: 0 0 10px #00ff99;
  /* max-width: 900px; */
  margin: auto;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const HeroDescription = styled.p`
  font-size: 18px;
  max-width: 600px;
  margin: 20px auto;

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 15px auto;
  }
`;

const PrimaryButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background: #00ff99;
  color: #0d0d0d;
  font-weight: bold;
  margin: 1rem auto;
  border-radius: 5px;
  text-decoration: none;
  margin-right: 1rem;
`;

const SecondaryButton = styled(PrimaryButton)`
  background: none;
  border: 2px solid #00ff99;
  color: #00ff99;
`;

const Section = styled.section`
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 28px;
  color: #ff00ff;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

const SectionText = styled.p`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  margin: 10px 0;
  color: #00ff99;

  @media (max-width: 768px) {
    margin: 8px 0;
  }
`;

export default function DPoPInfo() {
  return (
    <PageLayout
      title="DPoP.tech - Proof of Possession"
      description="An OAuth extension that puts you in charge. No more trusting middlemen with your keys—prove possession, not promises."
    >
      {/* Hero */}
      <Hero>
        <HeroTitle>DPoP: Demonstrating Proof of Possession</HeroTitle>
        <HeroDescription>
          An OAuth extension that puts you in charge. No more trusting middlemen
          with your keys—prove possession, not promises.
        </HeroDescription>
        <PrimaryButton href="/profile">Get Started with DPoP</PrimaryButton>
        <SecondaryButton href="/whitepaper">
          Read the Whitepaper
        </SecondaryButton>
      </Hero>

      {/* Problem Statement */}
      <Section>
        <SectionTitle>The OAuth Dilemma</SectionTitle>
        <SectionText>
          Traditional OAuth leaves your tokens vulnerable to interception and
          misuse. Centralized systems hoard your data, while you&apos;re left
          exposed. Cypher-punks demand better.
        </SectionText>
      </Section>

      {/* Solution */}
      <Section>
        <SectionTitle>DPoP: The Cypher-Punk Answer</SectionTitle>
        <SectionText>
          Demonstration of Proof of Possession binds your tokens to your keys.
          No trust required—just cryptographic proof. Secure, simple, and built
          for the future.
        </SectionText>
        <FeatureList>
          <FeatureItem>Mitigates token replay attacks</FeatureItem>
          <FeatureItem>Empowers users with key ownership</FeatureItem>
          <FeatureItem>Integrates seamlessly with OAuth 2.0</FeatureItem>
        </FeatureList>
      </Section>

      {/* How It Works */}
      <Section>
        <SectionTitle>Under the Hood</SectionTitle>
        <SectionText>
          DPoP adds a possession check to OAuth flows. Your client signs
          requests with a private key, and servers verify it with your public
          key. No leaks, no compromises.
        </SectionText>
        <SecondaryButton href="/docs">Dive into the Specs</SecondaryButton>
      </Section>

      {/* Why DPoP Matters */}
      <Section>
        <SectionTitle>For the Rebels, By the Rebels</SectionTitle>
        <SectionText>
          Built on cypher-punk principles: privacy, autonomy, and resistance to
          surveillance. DPoP isn&apos;t just tech—it&apos;s a movement.
        </SectionText>
      </Section>

      {/* Community Call */}
      <Section>
        <SectionTitle>Join the Resistance</SectionTitle>
        <SectionText>
          Developers, cryptographers, and freedom fighters—DPoP is open-source
          and ready for you. Fork it, break it, build it better.
        </SectionText>
        <PrimaryButton
          href="https://github.com/buidl-renaissance/dpop"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute on GitHub
        </PrimaryButton>
        <SecondaryButton
          href="https://discord.gg/kSuS9kdgTk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the Discord
        </SecondaryButton>
      </Section>
    </PageLayout>
  );
}

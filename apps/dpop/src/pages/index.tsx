import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
// import Link from 'next/link';

// Styled Components
const Container = styled.div`
  margin: 0;
  padding: 0;
  font-family: 'Courier New', monospace;
  background: #1a1a1a;
  color: #e0e0e0;
  line-height: 1.6;
`;

const Header = styled.header`
  background: #0d0d0d;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #00ff99;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px;
  }
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #00ff99;
  
  /* @media (max-width: 768px) {
    margin-bottom: 15px;
  } */
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
`;

const NavLink = styled.a`
  margin-left: 20px;
  font-size: 14px;
  color: #00ff99;
  text-decoration: none;
  
  @media (max-width: 768px) {
    margin: 5px;
    font-size: 12px;
  }
`;

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
  margin: 10px;
  border-radius: 5px;
  text-decoration: none;
  
  @media (max-width: 768px) {
    margin: 15px auto;
  }
`;

const SecondaryButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background: none;
  border: 2px solid #00ff99;
  color: #00ff99;
  font-weight: bold;
  margin: 10px;
  border-radius: 5px;
  text-decoration: none;
  
  @media (max-width: 768px) {
    margin: 15px auto;
  }
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

const Footer = styled.footer`
  background: #0d0d0d;
  padding: 20px;
  text-align: center;
  border-top: 2px solid #00ff99;
  font-size: 14px;
  
  @media (max-width: 768px) {
    padding: 15px;
    font-size: 12px;
  }
`;

const FooterLinks = styled.p`
  a {
    margin: 0 10px;
    color: #00ff99;
    text-decoration: none;
    
    @media (max-width: 768px) {
      margin: 0 5px;
      display: inline-block;
      padding: 5px 0;
    }
  }
`;

const Copyright = styled.p``;

export default function DPoPInfo() {
  return (
    <>
      <Head>
        <title>DPoP.tech - Proof of Possession</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <Container>
        {/* Header */}
        <Header>
          <Logo>DPoP.tech</Logo>
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/docs">Docs</NavLink>
            <NavLink href="/why">Why DPoP</NavLink>
            <NavLink href="/community">Community</NavLink>
            <NavLink href="https://github.com/buidl-renaissance/dpop" target="_blank" rel="noopener noreferrer">GitHub</NavLink>
          </Nav>
        </Header>

        {/* Hero */}
        <Hero>
          <HeroTitle>DPoP: Demonstrating Proof of Possession</HeroTitle>
          <HeroDescription>An OAuth extension that puts you in charge. No more trusting middlemen with your keys—prove possession, not promises.</HeroDescription>
          <PrimaryButton href="/profile">Get Started with DPoP</PrimaryButton>
          <SecondaryButton href="/dpop/whitepaper">Read the Whitepaper</SecondaryButton>
        </Hero>

        {/* Problem Statement */}
        <Section>
          <SectionTitle>The OAuth Dilemma</SectionTitle>
          <SectionText>Traditional OAuth leaves your tokens vulnerable to interception and misuse. Centralized systems hoard your data, while you&apos;re left exposed. Cypher-punks demand better.</SectionText>
        </Section>

        {/* Solution */}
        <Section>
          <SectionTitle>DPoP: The Cypher-Punk Answer</SectionTitle>
          <SectionText>Demonstration of Proof of Possession binds your tokens to your keys. No trust required—just cryptographic proof. Secure, simple, and built for the future.</SectionText>
          <FeatureList>
            <FeatureItem>Mitigates token replay attacks</FeatureItem>
            <FeatureItem>Empowers users with key ownership</FeatureItem>
            <FeatureItem>Integrates seamlessly with OAuth 2.0</FeatureItem>
          </FeatureList>
        </Section>

        {/* How It Works */}
        <Section>
          <SectionTitle>Under the Hood</SectionTitle>
          <SectionText>DPoP adds a possession check to OAuth flows. Your client signs requests with a private key, and servers verify it with your public key. No leaks, no compromises.</SectionText>
          <SecondaryButton href="#">Dive into the Specs</SecondaryButton>
        </Section>

        {/* Why DPoP Matters */}
        <Section>
          <SectionTitle>For the Rebels, By the Rebels</SectionTitle>
          <SectionText>Built on cypher-punk principles: privacy, autonomy, and resistance to surveillance. DPoP isn&apos;t just tech—it&apos;s a movement.</SectionText>
        </Section>

        {/* Community Call */}
        <Section>
          <SectionTitle>Join the Resistance</SectionTitle>
          <SectionText>Developers, cryptographers, and freedom fighters—DPoP is open-source and ready for you. Fork it, break it, build it better.</SectionText>
          <PrimaryButton href="#">Contribute on GitHub</PrimaryButton>
          <SecondaryButton href="#">Join the Discord</SecondaryButton>
        </Section>

        {/* Footer */}
        <Footer>
          <FooterLinks>
            <a href="#">Docs</a> | 
            <a href="#">Blog</a> | 
            <a href="#">Contact</a> | 
            <a href="#">Privacy Policy</a>
          </FooterLinks>
          <FooterLinks>
            <a href="#">X</a> | 
            <a href="#">GitHub</a> | 
            <a href="#">Discord</a> | 
            <a href="#">PGP Key</a>
          </FooterLinks>
          <Copyright>DPoP.tech – Possession is Power. Licensed under MIT.</Copyright>
        </Footer>
      </Container>
    </>
  );
}

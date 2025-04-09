import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  margin: 0;
  padding: 0;
  font-family: 'Courier New', monospace;
  background: #1a1a1a;
  color: #e0e0e0;
  line-height: 1.6;
  min-height: 100vh;
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

const PageTitle = styled.h1`
  text-align: center;
  font-size: 36px;
  color: #00ff99;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin: 30px 0;
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

const SectionTitle = styled.h2`
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
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ComingSoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  text-align: center;
`;

const ComingSoonText = styled.h2`
  font-size: 36px;
  color: #00ff99;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(0, 255, 153, 0.5);
`;

const ComingSoonDescription = styled.p`
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto 30px;
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

export default function WhyDPoP() {
  return (
    <>
      <Head>
        <title>Why DPoP - The Case for Proof of Possession</title>
        <meta name="description" content="Learn why Demonstration of Proof of Possession (DPoP) is essential for modern authentication and how it enhances security and user sovereignty." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <Container>
        {/* Header */}
        <NavBar />

        <ComingSoonContainer>
          <ComingSoonText>Coming Soon</ComingSoonText>
          <ComingSoonDescription>
            We're currently building a comprehensive explanation of why DPoP matters and how it transforms authentication security. Check back soon for in-depth analysis, comparisons, and use cases.
          </ComingSoonDescription>
        </ComingSoonContainer>
        
        {/* Footer */}
        <Footer>
          <FooterLinks>
            <a href="/docs">Docs</a> | 
            <a href="/blog">Blog</a> | 
            <a href="/contact">Contact</a> | 
            <a href="https://github.com/buidl-renaissance/dpop" target="_blank" rel="noopener noreferrer">GitHub</a>
          </FooterLinks>
          <Copyright>© {new Date().getFullYear()} DPoP.tech - All rights reserved</Copyright>
        </Footer>
      </Container>
    </>
  );
}

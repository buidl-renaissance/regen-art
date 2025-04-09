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
  color: #00ff99;
  margin: 40px 0;
  font-size: 36px;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin: 30px 0;
  }
`;

const ComingSoonContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const ComingSoonText = styled.h2`
  font-size: 32px;
  color: #ff00ff;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ComingSoonDescription = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Footer = styled.footer`
  background: #0d0d0d;
  padding: 20px;
  text-align: center;
  border-top: 2px solid #00ff99;
  font-size: 14px;
  margin-top: auto;
  
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

export default function DocsPage() {
  return (
    <>
      <Head>
        <title>DPoP Documentation - Proof of Possession</title>
        <meta name="description" content="Comprehensive documentation for implementing and understanding DPoP (Demonstration of Proof of Possession) for enhanced OAuth security." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <Container>
        {/* Header */}
        <Header>
          <Logo>DPoP.tech</Logo>
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/docs">Docs</NavLink>
            <NavLink href="/why-dpop">Why DPoP</NavLink>
            <NavLink href="/community">Community</NavLink>
            <NavLink href="https://github.com/buidl-renaissance/dpop" target="_blank" rel="noopener noreferrer">GitHub</NavLink>
          </Nav>
        </Header>

        <PageTitle>DPoP Documentation</PageTitle>
        
        <ComingSoonContainer>
          <ComingSoonText>Coming Soon</ComingSoonText>
          <ComingSoonDescription>
            We're currently working on comprehensive documentation for DPoP implementation.
            Check back soon for detailed guides, API references, and examples.
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

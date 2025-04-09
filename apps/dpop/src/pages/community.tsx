import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import NavBar from './components/NavBar';
import { ComingSoon } from '@gods.work/ui';

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
  color: #ff00ff;
  margin: 40px 0;
  font-size: 36px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin: 30px 0;
  }
`;

const CommunityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 15px 40px;
  }
`;

const CommunityCard = styled.div`
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #333;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 255, 153, 0.2);
  }
`;

const CardImage = styled.div<{ bgImage: string }>`
  height: 160px;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h3`
  color: #00ff99;
  margin: 0 0 10px;
  font-size: 20px;
`;

const CardDescription = styled.p`
  margin: 0 0 15px;
  font-size: 14px;
  color: #ccc;
`;

const CardLink = styled.a`
  display: inline-block;
  padding: 8px 16px;
  background: #00ff99;
  color: #0d0d0d;
  font-weight: bold;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background: #00cc7a;
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

const Copyright = styled.p`
  color: #888;
  margin-top: 10px;
`;

export default function Community() {
  const communities = [
    {
      id: 1,
      name: 'OAuth Working Group',
      description:
        'The official IETF OAuth Working Group that developed and maintains the DPoP specification.',
      image: '/images/oauth-wg.jpg',
      url: 'https://oauth.net/',
    },
    {
      id: 2,
      name: 'Cypherpunk Alliance',
      description:
        'A collective of privacy advocates implementing DPoP in open-source projects to enhance user sovereignty.',
      image: '/images/cypherpunk.jpg',
      url: 'https://example.com/cypherpunk',
    },
    {
      id: 3,
      name: 'Web3 Identity Consortium',
      description:
        'Bridging traditional OAuth with Web3 identity systems using DPoP as a foundation for cross-chain authentication.',
      image: '/images/web3-identity.jpg',
      url: 'https://example.com/web3-identity',
    },
    {
      id: 4,
      name: 'Zero Knowledge Builders',
      description:
        'Extending DPoP with zero-knowledge proofs for enhanced privacy in authentication flows.',
      image: '/images/zk-builders.jpg',
      url: 'https://example.com/zk-builders',
    },
    {
      id: 5,
      name: 'Self-Sovereign Identity Foundation',
      description:
        'Incorporating DPoP into SSI frameworks to strengthen verifiable credential exchanges.',
      image: '/images/ssi-foundation.jpg',
      url: 'https://example.com/ssi-foundation',
    },
    {
      id: 6,
      name: 'Enterprise Security Alliance',
      description:
        'Fortune 500 companies implementing DPoP to secure their API ecosystems against token theft.',
      image: '/images/enterprise-security.jpg',
      url: 'https://example.com/enterprise-security',
    },
    {
      id: 7,
      name: 'DPoP Developers Community',
      description:
        'An open community of developers building libraries and tools to simplify DPoP implementation across platforms.',
      image: '/images/dpop-devs.jpg',
      url: 'https://github.com/buidl-renaissance/dpop',
    },
    {
      id: 8,
      name: 'Financial API Security Group',
      description:
        'Financial institutions standardizing on DPoP for secure open banking APIs and customer data protection.',
      image: '/images/financial-api.jpg',
      url: 'https://example.com/financial-api',
    },
  ];

  return (
    <>
      <Head>
        <title>DPoP Community - Organizations Using Proof of Possession</title>
        <meta
          name="description"
          content="Discover the growing ecosystem of organizations and communities implementing DPoP for enhanced security and user sovereignty."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <NavBar />

      <Container>
        <ComingSoon />
      </Container>
    </>
  );

  return (
    <>
      <Head>
        <title>DPoP Community - Organizations Using Proof of Possession</title>
        <meta
          name="description"
          content="Discover the growing ecosystem of organizations and communities implementing DPoP for enhanced security and user sovereignty."
        />
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
            <NavLink
              href="https://github.com/buidl-renaissance/dpop"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </NavLink>
          </Nav>
        </Header>

        <PageTitle>Communities Using DPoP</PageTitle>

        <CommunityGrid>
          {communities.map((community) => (
            <CommunityCard key={community.id}>
              <CardImage bgImage={community.image} />
              <CardContent>
                <CardTitle>{community.name}</CardTitle>
                <CardDescription>{community.description}</CardDescription>
                <CardLink
                  href={community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </CardLink>
              </CardContent>
            </CommunityCard>
          ))}
        </CommunityGrid>

        {/* Footer */}
        <Footer>
          <FooterLinks>
            <a href="/docs">Docs</a> |<a href="/blog">Blog</a> |
            <a href="/contact">Contact</a> |
            <a
              href="https://github.com/buidl-renaissance/dpop"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </FooterLinks>
          <Copyright>
            © {new Date().getFullYear()} DPoP.tech - All rights reserved
          </Copyright>
        </Footer>
      </Container>
    </>
  );
}

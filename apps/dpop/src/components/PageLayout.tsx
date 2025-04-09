import React, { ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import NavBar from './NavBar';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  font-family: 'Courier New', monospace;
  background: #1a1a1a;
  color: #e0e0e0;
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
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

const Copyright = styled.p`
  color: #888;
  margin-top: 10px;
`;

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Container>
        <NavBar />

        <Content>{children}</Content>

        {/* Footer */}
        <Footer>
          <FooterLinks>
            <a href="/docs">Docs</a> |<a href="/blog">Blog</a> |<a href="/contact">Contact</a>{' '}
            |<a href="/privacy">Privacy Policy</a>
          </FooterLinks>
          <FooterLinks>
            <a
              href="https://x.com/WiredInSamurai"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>{' '}
            |
            <a
              href="https://github.com/buidl-renaissance/dpop"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{' '}
            |
            <a
              href="https://discord.gg/kSuS9kdgTk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>{' '}
            |<a href="#">PGP Key</a>
          </FooterLinks>
          <Copyright>
            DPoP.tech – Possession is Power. Licensed under MIT.
          </Copyright>
        </Footer>
      </Container>
    </>
  );
};

export default PageLayout;

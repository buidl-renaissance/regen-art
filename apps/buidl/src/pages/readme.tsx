import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>
          Renaissance City: Community Software for Local Creative Empowerment
        </title>
        <meta
          name="description"
          content="Open-source platform built to serve Detroit's creative communities"
        />
      </Head>

      <Header>
        <Title>Renaissance City</Title>
        <Subtitle>Community Software for Local Creative Empowerment</Subtitle>
      </Header>

      <Section>
        <SectionTitle>Project Description</SectionTitle>
        <Paragraph>
          Renaissance City is an open-source platform built to serve
          Detroit&apos;s creative communities. It hosts events, artists, and
          artwork, while also functioning as a digital gallery and incentive
          layer for local engagement. Community members can:
        </Paragraph>
        <List>
          <ListItem>Check in at events to earn credits.</ListItem>
          <ListItem>Use credits to promote their own projects.</ListItem>
          <ListItem>
            Earn badges and POAPs that unlock exclusive experiences.
          </ListItem>
          <ListItem>
            Create posts, vote, and grow reputation based on real-world
            participation.
          </ListItem>
        </List>
        <Paragraph>
          This software is deployed live in Detroit and currently used to
          organize events like Art Night, a nonprofit event series supporting
          local creators through blockchain-based tools, collaborative
          documentation, and reinvestment in community projects.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Key Impact Areas</SectionTitle>
        <List>
          <ListItem>
            <strong>Local Public Good:</strong> Provides transparent community
            tools for event coordination, artist visibility, and creator
            compensation.
          </ListItem>
          <ListItem>
            <strong>Open Source:</strong> Licensed under an OSI-approved license
            with all contributions public on GitHub.
          </ListItem>
          <ListItem>
            <strong>Active Development:</strong> Recent commits show
            improvements in artist onboarding, POAP integration, and a voting
            system for events and projects.
          </ListItem>
          <ListItem>
            <strong>Live Adoption:</strong> Already being used for real events
            at Russell Industrial Center and other Detroit locations.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Links</SectionTitle>
        <LinkSection>
          <List>
            <ListItem>
              <strong>GitHub Repository:</strong>{' '}
              <a
                href="http://github.com/buidl-renaissance"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/buidl-renaissance
              </a>
            </ListItem>
            {/* <ListItem>
              <strong>Live App:</strong> [Renaissance City App URL or demo]
            </ListItem> */}
            <ListItem>
              <strong>Community Examples:</strong>
              <List>
                <ListItem><a href="https://artnightdetroit.com" target="_blank" rel="noopener noreferrer">Art Night Detroit</a></ListItem>
                <ListItem><a href="https://artnightdetroit.com/gallery" target="_blank" rel="noopener noreferrer">Art Night Detroit Gallery</a></ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Open-Source License:</strong> [MIT / AGPL / Custom license
              details]
            </ListItem>
          </List>
        </LinkSection>
      </Section>

      <Section>
        <SectionTitle>Value to the Neighborhood</SectionTitle>
        <Paragraph>
          This project helps Detroit communities self-organize and elevate local
          talent. It documents and funds artistic projects, tracks participation
          with on-chain incentives, and reinvests in cultural output through a
          nonprofit ecosystem.
        </Paragraph>
        <Paragraph>
          The work supports underfunded artists, community organizers, and
          creators—bridging digital tools with tangible community outcomes.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>How the Grant Will Be Used (Retroactively)</SectionTitle>
        <Paragraph>Funds will support:</Paragraph>
        <List>
          <ListItem>
            Continued software maintenance and community onboarding.
          </ListItem>
          <ListItem>
            Paying contributors who helped develop the platform.
          </ListItem>
          <ListItem>
            Infrastructure costs (hosting, POAP issuance, etc.)
          </ListItem>
          <ListItem>
            Fund creator sessions (aka &quot;Detroit style pizzas&quot;) to bring together local artists and developers.
          </ListItem>
          <ListItem>Nonprofit documentation and storytelling efforts.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Grants We&apos;re Pursuing</SectionTitle>
        <Paragraph>
          We&apos;re actively seeking support from these grant programs to help scale our impact:
        </Paragraph>
        <List>
          <ListItem>
            <strong><a href="https://cabin-fellowship.notion.site/Neighborhood-Open-Source-Software-Grant-Round-1b9a95639b9980d28fcbe05ab936d8d4" target="_blank" rel="noopener noreferrer">Cabin Fellowship - Neighborhood Open Source Software Grant</a></strong> <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>(Closing April 16th!)</span>
            <Paragraph>
              Supporting software that helps neighborhoods and local communities thrive through digital tools.
            </Paragraph>
          </ListItem>
          <ListItem>
            <strong><a href="https://explorer.gitcoin.co/#/round/42161/867" target="_blank" rel="noopener noreferrer">Gitcoin GG23 OSS - dApps and Apps</a></strong> <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>(Closing April 16th!)</span>
            <Paragraph>
              A quadratic funding round on Arbitrum One with a 200,000 USDC matching pool to accelerate open source dApps and apps that enhance Web3 accessibility, usability, and contribute to financial inclusion, education, and social impact.
            </Paragraph>
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Get Involved</SectionTitle>
        <CTALink href="http://github.com/buidl-renaissance" target="_blank">
          <FaGithub /><span>CONTRIBUTE ON GITHUB</span>
        </CTALink>
        <CTALink href="https://discord.gg/kSuS9kdgTk" target="_blank">
          <FaDiscord /><span>JOIN OUR DISCORD</span>
        </CTALink>
        <CTALink href="https://twitter.com/builddetroit" target="_blank">
          <FaXTwitter /><span>FOLLOW ON X</span>
        </CTALink>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Courier New', monospace;
  background-color: #121212;
  color: #f5f5f5;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 2px solid #444;
  padding-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #f5f5f5;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  letter-spacing: -1px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #cccccc;
  font-weight: normal;
  font-family: 'Courier New', monospace;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
  border-left: 3px solid #444;
  padding-left: 1.5rem;
  
  @media (max-width: 480px) {
    padding-left: 1rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  color: #90caf9;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  font-family: 'Courier New', monospace;
  letter-spacing: -0.5px;

  &:before {
    content: '>';
    margin-right: 0.5rem;
    color: #90caf9;
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #f5f5f5;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const List = styled.ul`
  margin-left: 0rem;
  margin-bottom: 1.5rem;
  list-style-type: square;
  
  @media (max-width: 480px) {
    margin-left: 0rem;
  }
`;

const ListItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #f5f5f5;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  
  &::marker {
    color: #90caf9;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const LinkSection = styled.div`
  background-color: #1e1e1e;
  color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  
  a {
    color: #90caf9;
    text-decoration: none;
    border-bottom: 1px dashed #90caf9;
    
    &:hover {
      background-color: #333;
    }
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const CTALink = styled(Link)`
  display: inline-flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #f5f5f5;
  text-decoration: none;
  transition: all 0.3s ease;
  background-color: #1e1e1e;
  padding: 0.8rem 1.5rem;
  border-radius: 0;
  border: 2px solid #90caf9;
  margin: 0.5rem;
  font-family: 'Courier New', monospace;

  span {
    margin-left: 0.5rem;
  }

  &:hover {
    color: #121212;
    background-color: #90caf9;
    transform: translateY(-2px);
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.8);
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.7rem 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 0.5rem 0;
  }
`;

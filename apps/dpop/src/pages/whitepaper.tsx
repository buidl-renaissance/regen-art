import React from 'react';
import styled from 'styled-components';
// import Link from 'next/link';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  color: #000000;
  text-align: left;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); */
  /* border-radius: 8px; */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #000000;
  font-weight: bold;
`;

const ExternalLink = styled.a`
  color: #0066cc;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ContentStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: stretch;
`;

const Paragraph = styled.p`
  line-height: 1.6;
  color: #000000;
  font-size: 1.1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #000000;
  border-bottom: 1px solid #cccccc;
  padding-bottom: 0.5rem;
`;

const LinkList = styled.ul`
  list-style-type: disc;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ListItem = styled.li`
  color: #000000;
`;

const WhitePaperWrapper = styled.div`
  background-color: #ffffff;
  padding: 3rem;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default function DPoPWhitepaper() {
  return (
    <WhitePaperWrapper>
      <Container>
        <Title>
          RFC 9449: OAuth 2.0 Demonstrating Proof-of-Possession (DPoP)
        </Title>

        <ExternalLink
          href="https://datatracker.ietf.org/doc/html/rfc9449"
          target="_blank"
          rel="noopener noreferrer"
        >
          datatracker.ietf.org/doc/html/rfc9449
        </ExternalLink>

        <ContentStack>
          <Paragraph>
            DPoP, or Demonstrating Proof of Possession, is an extension that
            describes a technique to cryptographically bind access tokens to a
            particular client when they are issued. This is one of many attempts
            at improving the security of Bearer Tokens by requiring the
            application using the token to prove possession of the same private
            key that was used to obtain the token.
          </Paragraph>

          <div>
            <SectionTitle>See Also:</SectionTitle>
            <LinkList>
              <ListItem>
                <ExternalLink
                  href="https://datatracker.ietf.org/doc/html/rfc8705"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RFC 8705: Mutual TLS
                </ExternalLink>
              </ListItem>
              <ListItem>
                <ExternalLink
                  href="https://datatracker.ietf.org/doc/draft-ietf-httpbis-message-signatures/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Draft: HTTP Signatures
                </ExternalLink>
              </ListItem>
            </LinkList>
          </div>
        </ContentStack>
        <SectionTitle>
          Source:{' '}
          <ExternalLink
            rel="noopener noreferrer"
            target="_blank"
            href="https://oauth.net/2/dpop/"
          >
            https://oauth.net/2/dpop/
          </ExternalLink>
        </SectionTitle>
      </Container>
    </WhitePaperWrapper>
  );
}

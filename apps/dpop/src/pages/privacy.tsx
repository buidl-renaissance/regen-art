import React from 'react';
import styled from 'styled-components';
import PageLayout from '../components/PageLayout';

const PrivacyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  color: #00ff99;
  margin-bottom: 30px;
  font-size: 32px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #ff00ff;
  margin-bottom: 15px;
  font-size: 24px;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  line-height: 1.6;
`;

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 15px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const LastUpdated = styled.p`
  font-style: italic;
  color: #888;
  margin-top: 40px;
`;

export default function PrivacyPolicy() {
  return (
    <PageLayout
      title="Privacy Policy | DPoP.tech"
      description="Privacy Policy for DPoP.tech - Learn how we protect your data and respect your privacy"
    >
      <PrivacyContainer>
        <Title>Privacy Policy</Title>
        
        <Section>
          <Paragraph>
            At DPoP.tech, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>Information We Collect</SectionTitle>
          <Paragraph>
            We collect information in the following ways:
          </Paragraph>
          <List>
            <ListItem>
              <strong>Information you provide:</strong> When you create a profile, we collect your handle and any other information you choose to provide.
            </ListItem>
            <ListItem>
              <strong>Cryptographic keys:</strong> We store public keys associated with your profile, but private keys remain solely in your possession and are never transmitted to our servers.
            </ListItem>
            <ListItem>
              <strong>Usage data:</strong> We collect anonymous data about how you interact with our site to improve our services.
            </ListItem>
          </List>
        </Section>
        
        <Section>
          <SectionTitle>How We Use Your Information</SectionTitle>
          <Paragraph>
            We use the information we collect to:
          </Paragraph>
          <List>
            <ListItem>Provide, maintain, and improve our services</ListItem>
            <ListItem>Authenticate you using DPoP protocols</ListItem>
            <ListItem>Respond to your comments and questions</ListItem>
            <ListItem>Analyze usage patterns to enhance user experience</ListItem>
          </List>
        </Section>
        
        <Section>
          <SectionTitle>Data Security</SectionTitle>
          <Paragraph>
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </Paragraph>
          <Paragraph>
            Our implementation of DPoP is specifically designed to enhance security by ensuring that access tokens cannot be used without proof of possession of the corresponding private key.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>Third-Party Services</SectionTitle>
          <Paragraph>
            We may use third-party services that collect information about you when you visit our site. These services may use cookies or similar technologies. We do not control these third parties' tracking technologies or how they may be used.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>Your Rights</SectionTitle>
          <Paragraph>
            Depending on your location, you may have rights regarding your personal information, including:
          </Paragraph>
          <List>
            <ListItem>Access to your personal information</ListItem>
            <ListItem>Correction of inaccurate information</ListItem>
            <ListItem>Deletion of your personal information</ListItem>
            <ListItem>Objection to processing of your personal information</ListItem>
            <ListItem>Data portability</ListItem>
          </List>
          <Paragraph>
            To exercise these rights, please contact us using the information provided below.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>Changes to This Privacy Policy</SectionTitle>
          <Paragraph>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>Contact Us</SectionTitle>
          <Paragraph>
            If you have questions about this Privacy Policy, please contact us at privacy@dpop.tech.
          </Paragraph>
        </Section>
        
        <LastUpdated>Last Updated: May 15, 2023</LastUpdated>
      </PrivacyContainer>
    </PageLayout>
  );
}

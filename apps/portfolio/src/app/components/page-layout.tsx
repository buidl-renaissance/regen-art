'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  backLink?: {
    href: string;
    text: string;
  };
}

const StyledPage = styled.div`
  background-color: #fff;
`;

export const PageContainer = styled.div<{
  accent?: boolean;
  fullWidth?: boolean;
}>`
  padding: 2rem;
  max-width: ${(props) => (props.fullWidth ? '100%' : '1200px')};
  margin: 0 auto;
  background-color: ${(props) => (props.accent ? '#f8f8f8' : '#fff')};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  padding: 0 70px;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 2px;
    background: #96885f;
    position: absolute;
    top: 50%;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 0 40px;

    &::before,
    &::after {
      width: 30px;
    }
  }
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  color: #96885f;
  text-decoration: none;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  backLink,
}) => {
  return (
    <StyledPage>
      <PageContainer>
        {backLink && (
          <BackButton href={backLink.href}>
            <FaArrowLeft /> {backLink.text}
          </BackButton>
        )}
      </PageContainer>

      {(title || description) && (
        <PageHeader>
          {title && <PageTitle>{title}</PageTitle>}
          {description && <PageDescription>{description}</PageDescription>}
        </PageHeader>
      )}

      {children}
    </StyledPage>
  );
};

export default PageLayout;

import Link from 'next/link';
import styled from 'styled-components';

export const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
    `;

export const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: #2980b9;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3498db;
  }
`;


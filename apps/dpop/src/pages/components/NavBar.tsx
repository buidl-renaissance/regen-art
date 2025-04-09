import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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

interface HeaderProps {
  currentPath?: string;
}

const NavBar: React.FC<HeaderProps> = ({ currentPath }) => {
  return (
    <Header>
      <Logo>DPoP.tech</Logo>
      <Nav>
        <Link href="/" passHref>
          <NavLink>Home</NavLink>
        </Link>
        <Link href="/docs" passHref>
          <NavLink>Docs</NavLink>
        </Link>
        <Link href="/why" passHref>
          <NavLink>Why DPoP</NavLink>
        </Link>
        <Link href="/community" passHref>
          <NavLink>Community</NavLink>
        </Link>
        <NavLink 
          href="https://github.com/buidl-renaissance/dpop" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          GitHub
        </NavLink>
      </Nav>
    </Header>
  );
};

export default NavBar;

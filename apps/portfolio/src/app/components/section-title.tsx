import styled from 'styled-components';

interface SectionTitleProps {
  children: React.ReactNode;
  light?: boolean;
}

const StyledSectionTitle = styled.h2<{ light?: boolean }>`
  text-align: center;
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 700;
  margin-bottom: 3rem;
  color: ${(props) => (props.light ? 'white' : '#1e293b')};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(45deg, #60a5fa, #a78bfa);
    border-radius: 2px;
  }
`;

export function SectionTitle({ children, light }: SectionTitleProps) {
  return (
    <StyledSectionTitle className={`section-title ${light ? 'light' : ''}`} light={light}>
      {children}
    </StyledSectionTitle>
  );
}


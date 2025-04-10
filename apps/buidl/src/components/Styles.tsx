import styled from 'styled-components';
import Link from 'next/link';

// Styled Components

export const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  font-family: 'Courier New', monospace;
`;

export const Hero = styled.section`
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: #fff;
  padding: 5rem 2rem;

  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

export const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

export const HeroSubtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #b6e0ff;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Section = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 5rem 2rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const VisionText = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 800px;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FeatureCard = styled.div`
  background: #222222;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #3a97e8;
  margin-bottom: 1.5rem;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #d0d0d0;
`;

export const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StepCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const StepHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const StepNumber = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 1rem;
`;

export const ProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

export const ProcessStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`;

export const StepContent = styled.div`
  flex: 1;
  h3 {
    margin-top: 0;
  }
`;

export const StepTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const StepDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #d0d0d0;
`;

export const StepLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #2980b9;
  }
`;

export const StepAction = styled.div`
  margin-top: auto;
`;

export const StepLinkArrow = styled.span`
  margin-left: 0.5rem;
  transition: transform 0.2s;

  ${StepLink}:hover & {
    transform: translateX(3px);
  }
`;

export const TechDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 800px;
`;

export const TechStack = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const TechItem = styled.div`
  background: #222222;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`;

export const TechIcon = styled.div`
  font-size: 2.5rem;
  color: #3a97e8;
  margin-bottom: 1rem;
`;

export const TechName = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

export const TechDetail = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #d0d0d0;
`;

export const CallToAction = styled.section`
  background: linear-gradient(135deg, #0f0f0f 0%, #222 100%);
  color: #fff;
  padding: 5rem 2rem;
`;
export const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

export const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const CTAText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #d0d0d0;
`;

export const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const CTAButton = styled(Link)`
  display: inline-block;
  background: #3a97e8;
  color: #ffffff;
  text-align: center;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  width: auto;
  margin: 0 auto;

  &:hover {
    background: #2a87d8;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    gap: 1.25rem;
    margin-top: 0.5rem;
  }
`;

export const SocialLink = styled.a`
  color: #f5f5f5;
  font-size: 1.5rem;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: #90caf9;
    transform: translateY(-3px);
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const CTASection = styled.section`
  background-color: #1e1e1e;
  padding: 4rem 2rem;
  margin: 5rem 0;
  border-radius: 8px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    margin: 4rem 0;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 1.25rem;
    margin: 3rem 0;
  }
`;

export const CTADescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #cccccc;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { 
  Container, 
  SectionContainer, 
  Hero, 
  HeroContent, 
  HeroTitle, 
  HeroSubtitle, 
  Section, 
  SectionTitle 
} from '../components/Styles';

interface RoadmapItem {
  id: string;
  phase: string;
  title: string;
  description: string;
  timeline: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  tasks: {
    name: string;
    completed: boolean;
  }[];
}

const roadmapData: RoadmapItem[] = [
  {
    id: '1',
    phase: 'Phase 1',
    title: 'Communication Tools',
    description: 'Building essential communication infrastructure for creators and communities',
    timeline: 'Q2 2025',
    status: 'in-progress',
    tasks: [
      { name: 'Forum for project discussions', completed: false },
      { name: 'Decentralized identity tools', completed: false },
      { name: 'Creator portfolios', completed: false },
      { name: 'Collective community showcase', completed: false },
    ]
  },
  {
    id: '2',
    phase: 'Phase 2',
    title: 'Community Engagement',
    description: 'Enhancing tools for collectives to grow and market their communities',
    timeline: 'Q3 2025',
    status: 'upcoming',
    tasks: [
      { name: 'Launch community marketing dashboard', completed: false },
      { name: 'Develop event promotion system', completed: false },
      { name: 'Create collective membership management', completed: false },
      { name: 'Implement community analytics', completed: false }
    ]
  },
  {
    id: '3',
    phase: 'Phase 3',
    title: 'Collaboration Platform',
    description: 'Enabling seamless collaboration between creators and communities',
    timeline: 'Q4 2025',
    status: 'upcoming',
    tasks: [
      { name: 'Build project management tools', completed: false },
      { name: 'Develop resource sharing system', completed: false },
      { name: 'Create collaborative workspace', completed: false },
      { name: 'Implement feedback mechanisms', completed: false }
    ]
  },
  {
    id: '4',
    phase: 'Phase 4',
    title: 'Ecosystem Expansion',
    description: 'Growing the platform into a sustainable ecosystem for Detroit\'s creative community',
    timeline: 'Q1 2026',
    status: 'upcoming',
    tasks: [
      { name: 'Launch marketplace for creative services', completed: false },
      { name: 'Implement funding and grant discovery', completed: false },
      { name: 'Develop cross-community collaboration features', completed: false },
      { name: 'Create mobile application', completed: false }
    ]
  }
];

export default function Roadmap() {
  return (
    <Container>
      <Head>
        <title>Project Roadmap | Detroit Renaissance</title>
        <meta
          name="description"
          content="Explore our development roadmap and upcoming features for Detroit's creative platform."
        />
      </Head>

      <Hero>
        <HeroContent>
          <HeroTitle>Project Roadmap</HeroTitle>
          <HeroSubtitle>
            Our vision and development timeline for building Detroit&apos;s creative platform
          </HeroSubtitle>
        </HeroContent>
      </Hero>

      <Section>
        <SectionContainer size="large">
          <SectionTitle>Development Timeline</SectionTitle>
          <RoadmapContainer>
            {roadmapData.map((item, index) => (
              <RoadmapCard key={item.id} status={item.status}>
                <PhaseLabel status={item.status}>{item.phase}</PhaseLabel>
                <StatusBadge status={item.status}>
                  {item.status === 'completed' ? 'Completed' : 
                   item.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                </StatusBadge>
                <CardTitle>{item.title}</CardTitle>
                {/* <Timeline>{item.timeline}</Timeline> */}
                <CardDescription>{item.description}</CardDescription>
                <TaskList>
                  {item.tasks.map((task, taskIndex) => (
                    <TaskItem key={taskIndex} completed={task.completed}>
                      <TaskCheckbox completed={task.completed}>
                        {task.completed && '✓'}
                      </TaskCheckbox>
                      <TaskName completed={task.completed}>{task.name}</TaskName>
                    </TaskItem>
                  ))}
                </TaskList>
              </RoadmapCard>
            ))}
          </RoadmapContainer>
        </SectionContainer>
      </Section>

      <Section>
        <SectionContainer size="large">
          <FeedbackContainer>
            <FeedbackTitle>Help Shape Our Roadmap</FeedbackTitle>
            <FeedbackText>
              We&apos;re building this platform for Detroit&apos;s creative community. Have ideas or suggestions for features you&apos;d like to see? We&apos;d love to hear from you!
            </FeedbackText>
            <FeedbackButton href="/contact">Share Your Feedback</FeedbackButton>
          </FeedbackContainer>
        </SectionContainer>
      </Section>
    </Container>
  );
}

// Styled Components
const RoadmapContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const RoadmapCard = styled.div<{ status: string }>`
  background-color: #1a1a1a;
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  border-left: 4px solid ${({ status }) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'in-progress':
        return '#ff9800';
      case 'upcoming':
        return '#2196f3';
      default:
        return '#757575';
    }
  }};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const PhaseLabel = styled.div<{ status: string }>`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ status }) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'in-progress':
        return '#ff9800';
      case 'upcoming':
        return '#2196f3';
      default:
        return '#757575';
    }
  }};
  font-family: 'Courier New', monospace;
`;

const StatusBadge = styled.div<{ status: string }>`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  text-transform: uppercase;
  font-family: 'Courier New', monospace;
  background-color: ${({ status }) => {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'in-progress':
        return '#ff9800';
      case 'upcoming':
        return '#2196f3';
      default:
        return '#757575';
    }
  }};
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0.5rem 0;
  color: #ffffff;
`;

const Timeline = styled.div`
  font-size: 0.9rem;
  color: #aaaaaa;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #cccccc;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TaskItem = styled.li<{ completed: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  opacity: ${({ completed }) => (completed ? 1 : 0.7)};
`;

const TaskCheckbox = styled.div<{ completed: boolean }>`
  min-width: 20px;
  min-height: 20px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${({ completed }) => (completed ? '#4caf50' : '#757575')};
  background-color: ${({ completed }) => (completed ? '#4caf50' : 'transparent')};
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
`;

const TaskName = styled.span<{ completed: boolean }>`
  font-size: 0.95rem;
  color: ${({ completed }) => (completed ? '#cccccc' : '#aaaaaa')};
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  font-family: 'Courier New', monospace;
`;

const FeedbackContainer = styled.div`
  background-color: #1a1a1a;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin: 3rem auto;
  max-width: 800px;
`;

const FeedbackTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const FeedbackText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #cccccc;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;
`;

const FeedbackButton = styled.a`
  display: inline-block;
  background: #0078d4;
  color: #ffffff;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;

  &:hover {
    background: #005ea2;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

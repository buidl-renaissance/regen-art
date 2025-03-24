'use client';

import { FC } from 'react';
import styled from 'styled-components';

const StyledPage = styled.div`
  background-color: #f5f5f5;
`;

const AboutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  display: inline-block;
  padding: 0 70px;
  left: 50%;
  transform: translateX(-50%);

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
`;

const ArtistSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ArtistImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  align-self: flex-start;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const ArtistBio = styled.div`
  flex: 1;
`;

const BioHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const BioParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: #444;
`;

const SkillsSection = styled.section`
  margin-bottom: 4rem;
`;

const SkillsHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const SkillsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
`;

const SkillItem = styled.li`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #96885f;
`;

const SkillDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

const ExperienceSection = styled.section`
  margin-bottom: 4rem;
`;

const ExperienceHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::after {
    content: '';
    position: absolute;
    width: 2px;
    background-color: #96885f;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -1px;

    @media (max-width: 767px) {
      left: 31px;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  box-sizing: border-box;

  &:nth-child(odd) {
    left: 0;
  }

  &:nth-child(even) {
    left: 50%;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;

    &:nth-child(odd),
    &:nth-child(even) {
      left: 0;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 20px;
  background-color: white;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TimelineDate = styled.div`
  font-weight: bold;
  color: #96885f;
  margin-bottom: 0.5rem;
`;

const TimelineTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
`;

const TimelineText = styled.p`
  margin: 0;
  line-height: 1.6;
  color: #555;
`;

const ContactSection = styled.section`
  text-align: center;
`;

const ContactHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const ContactText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: transparent;
  border: 4px solid #96885f;
  color: #333;
  font-size: 1.2rem;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(150, 136, 95, 0.2);
    transform: translateY(-2px);
  }
`;

const AboutPage: FC = () => {
  return (
    <StyledPage>
      <AboutContainer>
        <PageTitle>About Me</PageTitle>

        <ArtistSection>
          <ArtistImage
            src="https://i0.wp.com/andreaburg.com/wp-content/uploads/2025/02/artist-portrait.jpg?fit=800%2C1000&ssl=1"
            alt="Andrea Burg - Artist Portrait"
          />
          <ArtistBio>
            <BioHeading>Andrea Burg</BioHeading>
            <BioParagraph>
              I am a multidisciplinary artist based in Portland, Oregon, with over 10 years of experience in various artistic mediums. My work explores the intersection of traditional craftsmanship and contemporary expression, often drawing inspiration from natural forms, cultural narratives, and the human experience.
            </BioParagraph>
            <BioParagraph>
              After completing my BFA at the Pacific Northwest College of Art in 2013, I've dedicated my practice to pushing boundaries between different art forms. My background in sculpture informs my approach to tattoo art, while my experience in performance art influences how I think about the body as a canvas and medium.
            </BioParagraph>
            <BioParagraph>
              Whether creating sculptural installations, performance pieces, or permanent body art, I strive to create work that resonates on both aesthetic and emotional levels. I believe in art as a transformative experience and a powerful form of communication that transcends conventional language.
            </BioParagraph>
          </ArtistBio>
        </ArtistSection>

        <SkillsSection>
          <SkillsHeading>Specialties</SkillsHeading>
          <SkillsList>
            <SkillItem>
              <SkillTitle>Tattoo Art</SkillTitle>
              <SkillDescription>
                Specializing in fine line work, blackwork, and botanical designs with a focus on custom, personalized pieces that honor the individual's story and body.
              </SkillDescription>
            </SkillItem>
            <SkillItem>
              <SkillTitle>Sculptural Performance</SkillTitle>
              <SkillDescription>
                Creating immersive experiences that combine sculptural elements with movement, exploring themes of transformation and embodiment.
              </SkillDescription>
            </SkillItem>
            <SkillItem>
              <SkillTitle>Mixed Media Installation</SkillTitle>
              <SkillDescription>
                Developing site-specific installations that incorporate found objects, textiles, and organic materials to create contemplative environments.
              </SkillDescription>
            </SkillItem>
            <SkillItem>
              <SkillTitle>Traditional Illustration</SkillTitle>
              <SkillDescription>
                Working with ink, watercolor, and graphite to create detailed illustrations that blend technical precision with expressive mark-making.
              </SkillDescription>
            </SkillItem>
          </SkillsList>
        </SkillsSection>

        <ExperienceSection>
          <ExperienceHeading>Experience & Education</ExperienceHeading>
          <Timeline>
            <TimelineItem>
              <TimelineContent>
                <TimelineDate>2020 - Present</TimelineDate>
                <TimelineTitle>Independent Studio Practice</TimelineTitle>
                <TimelineText>
                  Operating a private tattoo and art studio, creating commissioned works and developing personal projects.
                </TimelineText>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineContent>
                <TimelineDate>2017 - 2020</TimelineDate>
                <TimelineTitle>Resident Artist - Ink Collective</TimelineTitle>
                <TimelineText>
                  Worked as a resident artist at a renowned tattoo studio, developing technical skills and building clientele.
                </TimelineText>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineContent>
                <TimelineDate>2015 - 2017</TimelineDate>
                <TimelineTitle>Tattoo Apprenticeship</TimelineTitle>
                <TimelineText>
                  Completed a formal apprenticeship under master tattoo artist James Chen, learning traditional and contemporary techniques.
                </TimelineText>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineContent>
                <TimelineDate>2013 - 2015</TimelineDate>
                <TimelineTitle>Gallery Assistant - Modern Art Space</TimelineTitle>
                <TimelineText>
                  Assisted with exhibition installations, artist coordination, and public programming while developing personal art practice.
                </TimelineText>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineContent>
                <TimelineDate>2009 - 2013</TimelineDate>
                <TimelineTitle>BFA, Pacific Northwest College of Art</TimelineTitle>
                <TimelineText>
                  Graduated with honors, focusing on sculpture and interdisciplinary practices with a minor in art history.
                </TimelineText>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </ExperienceSection>

        <ContactSection>
          <ContactHeading>Work With Me</ContactHeading>
          <ContactText>
            I'm always open to new collaborations, commissions, and tattoo projects. Whether you have a specific vision or are looking for creative guidance, I'd love to hear from you and discuss how we can bring your ideas to life.
          </ContactText>
          <ContactButton href="/inquire">Get In Touch</ContactButton>
        </ContactSection>
      </AboutContainer>
    </StyledPage>
  );
};

export default AboutPage;

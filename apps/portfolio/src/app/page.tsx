'use client';

import styled from 'styled-components';
import { PortfolioItem } from './components/portfolio-item';
import { ExperienceItem } from './components/experience-item';
import { Contact } from './components/contact';
import { SectionTitle } from './components/section-title';
import { Hero } from './components/hero';

const StyledPage = styled.div`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .portfolio-section,
  .experience-section,
  .contact-section {
    padding: 4rem 1rem;

    @media (min-width: 768px) {
      padding: 6rem 2rem;
    }
  }

  .portfolio-section {
    background: #f8fafc;
  }

  .experience-section {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    color: white;
  }

  .contact-section {
    background: #fff;
  }

  .portfolio-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default function Index() {
  const scrollToPortfolio = () => {
    document
      .querySelector('.portfolio-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <StyledPage>
      <Hero onExploreClick={scrollToPortfolio} />

      <section className="portfolio-section">
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="portfolio-grid">
          <PortfolioItem
            href="https://github.com/buidl-renaissance"
            imageSrc="/digital-renaissance-hands.jpeg"
            imageAlt="Buidl Renaissance"
            title="Buidl Renaissance"
            description="A collaborative platform empowering developers to create and share impactful open source projects."
          />
          <PortfolioItem
            href="https://art.gods.work"
            imageSrc="/regen-art.jpeg"
            imageAlt="Regenerative Art Gallery"
            title="Regenerative Art Gallery"
            description="A collaborative art gallery by Detroit artists leveraging the power of web3."
          />
          <PortfolioItem
            href="https://artnightdetroit.com"
            imageSrc="/artnight-cover.jpeg"
            imageAlt="Art Night Detroit"
            title="Art Night Detroit"
            description="An immersive monthly event fostering connections between artists, collectors, and art enthusiasts."
          />
          <PortfolioItem
            href="https://pizza.builddetroit.xyz"
            imageSrc="/pizza-party.jpg"
            imageAlt="Detroit Bitcoin Pizza Party"
            title="Detroit Bitcoin Pizza Party"
            description="The Detroit edition of PizzaDAO’s Global Bitcoin Pizza Party joins forces with Art Night for an unforgettable evening of pizza, music, and interactive art!"
          />
          <PortfolioItem
            href="https://builddetroit.xyz"
            imageSrc="/penobscot.jpeg"
            imageAlt="Build Detroit"
            title="Build Detroit"
            description="A platform to connect Detroiter's at local events."
          />
          <PortfolioItem
            href="https://stu.gods.work"
            imageSrc="/studio-202.jpeg"
            imageAlt="Studio 202"
            title="Studio 202"
            description="A studio space for Detroit artists to connect, collaborate, and create."
          />
          <PortfolioItem
            href="https://gods.work"
            imageSrc="/gods-work.jpeg"
            imageAlt="Gods"
            title="Gods Work"
            description="Empowering Detroit artists to give back with free, custom-stretched canvas frames to make a positive impact on society."
          />
        </div>
      </section>

      <section className="experience-section">
        <SectionTitle light>Work Experience</SectionTitle>

        <ExperienceItem
          companyName="DPoP Labs"
          companyUrl="https://www.linkedin.com/company/dpop-labs/"
          companyLogo="/dpop_labs_logo.jpeg"
          roles={[
            {
              title: 'Founder',
              duration: 'Jun 2023 - Present',
              description:
                'Leading innovative technology solutions for community-driven projects in Detroit.',
            },
          ]}
        />

        <ExperienceItem
          companyName="Benzinga"
          companyUrl="https://www.linkedin.com/company/benzinga/"
          companyLogo="/benzinga_logo.jpeg"
          roles={[
            {
              title: 'Product Development Manager',
              duration: 'Jan 2020 - May 2024',
              description:
                'Led product development initiatives and engineering teams, managing critical projects and implementing scalable solutions for financial technology platforms. Drove technical strategy and architecture decisions while mentoring team members.',
            },
            {
              title: 'Full Stack Engineer',
              duration: 'Feb 2019 - Jan 2020',
              description:
                'Developed and maintained full-stack applications for financial market data and news delivery. Built robust APIs, real-time data processing systems, and responsive web interfaces serving millions of users.',
            },
          ]}
        />

        <ExperienceItem
          companyName="MyFab5 (BestFoodFeed)"
          companyUrl="https://www.instagram.com/bestfooddetroit"
          companyLogo="/myfab5.jpeg"
          roles={[
            {
              title: 'Co-founder & Lead Developer',
              duration: 'Dec 2012 - Aug 2018',
              description:
                'Built and scaled a community-powered media company reaching 2M+ food enthusiasts across 35 local publications. Developed CMS applications, marketing automation tools, and data processing pipelines to drive growth and engagement.',
            },
          ]}
        />
      </section>

      <Contact />
    </StyledPage>
  );
}

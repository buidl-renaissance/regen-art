'use client';

import styled from 'styled-components';

const StyledPage = styled.div`
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(135deg, #0f172a, #1e293b);
    color: white;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%);
      animation: rotate 20s linear infinite;
    }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .hero-content {
    max-width: 900px;
    padding: 3rem;
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 4.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  .subtitle {
    font-size: 1.8rem;
    margin-bottom: 2.5rem;
    color: #e2e8f0;
    font-weight: 300;
    letter-spacing: 0.5px;
  }

  .cta-button {
    padding: 1.2rem 2.5rem;
    font-size: 1.3rem;
    background: linear-gradient(45deg, #60a5fa, #a78bfa);
    border: none;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(96,165,250,0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(96,165,250,0.4);
    }
  }

  .profile-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 2rem;
    object-fit: cover;
    border: 4px solid rgba(255,255,255,0.1);
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  }

  .portfolio-section, .experience-section, .contact-section {
    padding: 6rem 2rem;
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

  .section-title {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 4rem;
    color: #1e293b;
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
  }

  .section-title.light {
    color: white;
  }

  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.5rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .portfolio-item {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.1);
    }

    img {
      width: 100%;
      height: 240px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }

    .item-content {
      padding: 2rem;

      h3 {
        margin: 0 0 1rem 0;
        color: #1e293b;
        font-size: 1.5rem;
        font-weight: 600;
      }

      p {
        color: #64748b;
        line-height: 1.7;
        font-size: 1.1rem;
      }
    }
  }

  .experience-item {
    max-width: 1000px;
    margin: 0 auto 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
      transform: translateY(-4px);
      background: rgba(255, 255, 255, 0.08);
    }

    .company {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      
      a {
        display: flex;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
        color: #60a5fa;
        font-size: 1.5rem;
        font-weight: 600;
        transition: all 0.3s ease;
        
        &:hover { 
          color: #a78bfa;
          transform: translateX(4px);
        }
        
        img.company-logo {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
      }
    }

    .roles {
      > div {
        padding: 0 0 1rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        &:last-child {
          border-bottom: none;
        }
      }
    }

    h3 {
      color: #fff;
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-align: left;
      letter-spacing: -0.02em;
    }

    .duration {
      color: #94a3b8;
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 1rem;
      text-align: left;
    }

    .description { 
      color: #e2e8f0;
      line-height: 1.8;
      font-size: 1.1rem;
      
      &:hover {
        color: #f8fafc;
      }
    }
  }

  .contact-content {
    max-width: 620px;
    margin: 0 auto;
    text-align: center;

    p {
      color: #1e293b;
      font-size: 1.2rem;
      margin-bottom: 2rem;
      line-height: 1.7;
    }

    .contact-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 3rem;

      a {
        color: #3b82f6;
        font-size: 1.1rem;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #6366f1;
        }
      }
    }
  }
`;

export default function Index() {
  const scrollToPortfolio = () => {
    document.querySelector('.portfolio-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <StyledPage>
      <section className="hero">
        <div className="hero-content">
          <img src="/WiredInSamurai.jpeg" alt="WiredInSamurai" className="profile-image" />
          <h1>WiredInSamurai</h1>
          <p className="subtitle">Technology Builder for Communities</p>
          <button className="cta-button" onClick={scrollToPortfolio}>Explore Work</button>
        </div>
      </section>

      <section className="portfolio-section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="portfolio-grid">
          <div className="portfolio-item">
            <a href="https://art.gods.work" target="_blank" rel="noopener noreferrer">
              <img src="/digital-renaissance-hands.jpeg" alt="Regenerative Art Gallery" />
              <div className="item-content">
                <h3>Regenerative Art Gallery</h3>
                <p>
                  A collaborative art gallery by Detroit artists leveraging the power of web3.
                </p>
              </div>
            </a>
          </div>

          <div className="portfolio-item">
            <a href="https://artnightdetroit.com" target="_blank" rel="noopener noreferrer">
              <img src="/artnight-cover.jpeg" alt="Art Night Detroit" />
              <div className="item-content">
                <h3>Art Night Detroit</h3>
                <p>
                  An immersive monthly event fostering connections between artists, collectors, and art enthusiasts.
                </p>
              </div>
            </a>
          </div>

          <div className="portfolio-item">
            <a href="https://builddetroit.xyz" target="_blank" rel="noopener noreferrer">
              <img src="/penobscot.jpeg" alt="Build Detroit" />
              <div className="item-content">
                <h3>Build Detroit</h3>
                <p>
                  A collaborative platform empowering developers to create and share impactful open source projects.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="experience-section">
        <h2 className="section-title light">Work Experience</h2>
        
        <div className="experience-item">
          <div className="company">
            <a href="https://www.linkedin.com/company/dpop-labs/" target="_blank" rel="noopener noreferrer">
              <img src="/dpop_labs_logo.jpeg" alt="DPoP Labs" className="company-logo" />
              DPoP Labs
            </a>
          </div>
          <h3>Founder</h3>
          <div className="duration">Jun 2023 - Present</div>
          <p className="description">
            Leading innovative technology solutions for community-driven projects in Detroit.
          </p>
        </div>

        <div className="experience-item">
          <div className="company">
            <a href="https://www.linkedin.com/company/benzinga/" target="_blank" rel="noopener noreferrer">
              <img src="/benzinga_logo.jpeg" alt="Benzinga" className="company-logo" />
              Benzinga
            </a>
          </div>
          <div className="roles">
            <div>
              <h3>Product Development Manager</h3>
              <div className="duration">Jan 2020 - May 2024</div>
              <p className="description">
                Led product development initiatives and engineering teams, managing critical projects and implementing scalable solutions for financial technology platforms. Drove technical strategy and architecture decisions while mentoring team members.
              </p>
            </div>
            <div>
              <h3>Full Stack Engineer</h3>
              <div className="duration">Feb 2019 - Jan 2020</div>
              <p className="description">
                Developed and maintained full-stack applications for financial market data and news delivery. Built robust APIs, real-time data processing systems, and responsive web interfaces serving millions of users.
              </p>
            </div>
          </div>
        </div>

        <div className="experience-item">
          <div className="company">
            <a href="https://www.instagram.com/bestfooddetroit" target="_blank" rel="noopener noreferrer">
              <img src="/myfab5.jpeg" alt="BestFoodFeed" className="company-logo" />
              MyFab5 (BestFoodFeed)
            </a>
          </div>
          <h3>Co-founder & Lead Developer</h3>
          <div className="duration">Dec 2012 - Aug 2018</div>
          <p className="description">
            Built and scaled a community-powered media company reaching 2M+ food enthusiasts across 35 local publications. Developed CMS applications, marketing automation tools, and data processing pipelines to drive growth and engagement.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-content">
          <p>
            I&apos;m always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          <div className="contact-links">
            <a href="mailto:john@dpop.tech">Email</a>
            <a href="https://www.linkedin.com/in/john-gulbronson-a285285b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/johngulb" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </section>
    </StyledPage>
  );
}

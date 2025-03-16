import styled from 'styled-components';

interface ExperienceItemProps {
  companyName: string;
  companyUrl: string;
  companyLogo: string;
  roles: {
    title: string;
    duration: string;
    description: string;
  }[];
}

const StyledExperienceItem = styled.div`
  max-width: 1000px;
  margin: 0 auto 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 768px) {
    padding: 2rem;
    margin-bottom: 3rem;
  }

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
      font-size: clamp(1.2rem, 4vw, 1.5rem);
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        color: #a78bfa;
        transform: translateX(4px);
      }

      img.company-logo {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        object-fit: cover;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

        @media (min-width: 768px) {
          width: 48px;
          height: 48px;
        }
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
    font-size: clamp(1.3rem, 4vw, 1.6rem);
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-align: left;
    letter-spacing: -0.02em;
  }

  .duration {
    color: #94a3b8;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
    text-align: left;

    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }

  .description {
    color: #e2e8f0;
    line-height: 1.8;
    font-size: 1rem;

    @media (min-width: 768px) {
      font-size: 1.1rem;
    }

    &:hover {
      color: #f8fafc;
    }
  }
`;

export function ExperienceItem({ companyName, companyUrl, companyLogo, roles }: ExperienceItemProps) {
  return (
    <StyledExperienceItem className="experience-item">
      <div className="company">
        <a href={companyUrl} target="_blank" rel="noopener noreferrer">
          <img src={companyLogo} alt={companyName} className="company-logo" />
          {companyName}
        </a>
      </div>
      <div className="roles">
        {roles.map((role, index) => (
          <div key={index}>
            <h3>{role.title}</h3>
            <div className="duration">{role.duration}</div>
            <div className="description">{role.description}</div>
          </div>
        ))}
      </div>
    </StyledExperienceItem>
  );
}

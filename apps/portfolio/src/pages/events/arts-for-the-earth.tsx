'use client';

import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Tickets from '../../app/components/tickets';
import { getEvent, TicketedEvent, TicketType } from '@gods.work/ticketing';

export const getServerSideProps = async () => {
  const event = await getEvent(1);
  return {
    props: { event, ticketTypes: event?.ticketTypes },
  };
};

const ArtsForTheEarthPage: FC<{
  event: TicketedEvent;
  ticketTypes: TicketType[];
}> = ({ event, ticketTypes }) => {
  return (
    <StyledPage>
      <EventContainer>
        <EventHeader>
          <EventTitle>Arts For The Earth</EventTitle>
          <EventSubtitle>Burg Ink Production</EventSubtitle>
          <EventDescription>
            <p>
              Life is a precious gift, and our source of endless beauty,
              abundance, and diversity is all created from our Mother Earth. As
              a community, we have the power to come together in celebration,
              expressing gratitude, sharing creativity, and deepening our
              connection to the Earth and one another. This gathering is a
              heartfelt offering, a space to experience the joy of creation,
              strengthen our bonds, and support organizations dedicated to
              protecting and restoring the planet. Through art, music, and
              collective energy, we uplift and inspire, fostering a deeper
              commitment to the well-being of our world for generations to come.
              Let&apos;s dance, create, and celebrate the magic of being alive
              together.
            </p>
            <p>
              Our planet needs us to Share Love! By protecting our waters and
              being Guardians of the land, we are protecting the source of All
              life.
            </p>
          </EventDescription>
        </EventHeader>

        <Section>
          <SectionTitle>Event Schedule</SectionTitle>
          <ScheduleContainer>
            <ScheduleItem>
              <ScheduleTime>11:45 AM</ScheduleTime>
              <ScheduleDescription>
                <strong>Opening Ceremony</strong>
                <p>Acknowledgements and prep talk</p>
              </ScheduleDescription>
            </ScheduleItem>
            <ScheduleItem>
              <ScheduleTime>12:00 - 5:00 PM</ScheduleTime>
              <ScheduleDescription>
                <strong>Main Activities</strong>
                <p>Crafts, Tattoos, Music and Open Floor</p>
              </ScheduleDescription>
            </ScheduleItem>
            <ScheduleItem>
              <ScheduleTime>2:00 - 2:30 PM</ScheduleTime>
              <ScheduleDescription>
                <strong>Community Education</strong>
                <p>Non-profit Info- on mic</p>
              </ScheduleDescription>
            </ScheduleItem>
            <ScheduleItem>
              <ScheduleTime>5:00 - 7:00 PM</ScheduleTime>
              <ScheduleDescription>
                <strong>Evening Entertainment</strong>
                <p>Live Music</p>
              </ScheduleDescription>
            </ScheduleItem>
            <ScheduleItem>
              <ScheduleTime>8:00 PM - 2:00 AM</ScheduleTime>
              <ScheduleDescription>
                <strong>Night Session</strong>
                <p>Art Night Collaboration</p>
              </ScheduleDescription>
            </ScheduleItem>
            <ScheduleItem>
              <ScheduleTime>10:00 PM</ScheduleTime>
              <ScheduleDescription>
                <strong>Fundraising Highlight</strong>
                <p>Live Raffle Draw</p>
              </ScheduleDescription>
            </ScheduleItem>
          </ScheduleContainer>
          <div
            style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              fontStyle: 'italic',
              padding: '0.75rem',
              backgroundColor: 'rgba(150, 136, 95, 0.1)',
              borderRadius: '4px',
            }}
          >
            <p>Bar open after last tattoo completed</p>
          </div>
        </Section>

        <Section>
          <SectionTitle>Community Contributions & Experiences</SectionTitle>
          <ExperiencesGrid>
            <ExperienceCard>
              <ExperienceHeader>
                <ExperienceTitle>Creative Expression & Art</ExperienceTitle>
              </ExperienceHeader>
              <ExperienceContent>
                <ExperienceList>
                  <ExperienceItem>
                    Tattoo Art – Artists offering tattooing, with proceeds
                    supporting the cause.
                  </ExperienceItem>
                  <ExperienceItem>
                    Gallery Exhibition – A breathtaking and inspiring collection
                    of artwork honoring nature.
                  </ExperienceItem>
                  <ExperienceItem>
                    Live Painting – Artists creating in real time, sharing their
                    creative process.
                  </ExperienceItem>
                  <ExperienceItem>
                    Kids&apos; & Adult Crafts – Dedicated craft stations for all
                    ages to engage in hands-on creativity.
                  </ExperienceItem>
                  <ExperienceItem>
                    Community Canvas – A collaborative art piece where everyone
                    can contribute.
                  </ExperienceItem>
                  <ExperienceItem>
                    Mural Painting – A large-scale artwork created during the
                    event to honor the planet.
                  </ExperienceItem>
                </ExperienceList>
              </ExperienceContent>
            </ExperienceCard>

            <ExperienceCard>
              <ExperienceHeader>
                <ExperienceTitle>Music & Movement</ExperienceTitle>
              </ExperienceHeader>
              <ExperienceContent>
                <ExperienceList>
                  <ExperienceItem>
                    Live DJs & Musical Performances – A fusion of live music and
                    DJ sets to uplift and inspire.
                  </ExperienceItem>
                </ExperienceList>
              </ExperienceContent>
            </ExperienceCard>

            <ExperienceCard>
              <ExperienceHeader>
                <ExperienceTitle>Food & Drink</ExperienceTitle>
              </ExperienceHeader>
              <ExperienceContent>
                <ExperienceList>
                  <ExperienceItem>
                    Local Vendors & Refreshments – A variety of delicious food
                    and drinks available to nourish the community providing
                    support for local small businesses.
                  </ExperienceItem>
                </ExperienceList>
              </ExperienceContent>
            </ExperienceCard>

            <ExperienceCard>
              <ExperienceHeader>
                <ExperienceTitle>Community Engagement</ExperienceTitle>
              </ExperienceHeader>
              <ExperienceContent>
                <ExperienceList>
                  <ExperienceItem>
                    Raffles – Exciting prizes and giveaways, with proceeds
                    supporting environmental organizations.
                  </ExperienceItem>
                  <ExperienceItem>
                    Community Networking Board – A space to connect with local
                    groups, opportunities, and like-minded individuals.
                  </ExperienceItem>
                  <ExperienceItem>
                    Vendor Marketplace – Featuring artists, jewelry makers,
                    handcrafted clothing, and eco-conscious projects.
                  </ExperienceItem>
                </ExperienceList>
              </ExperienceContent>
            </ExperienceCard>
          </ExperiencesGrid>
        </Section>

        <Section>
          <SectionTitle>Youth & Family Activities</SectionTitle>
          <ExperiencesGrid>
            <ExperienceCard>
              <ExperienceHeader>
                <ExperienceTitle>Creative Activities</ExperienceTitle>
              </ExperienceHeader>
              <ExperienceContent>
                <ExperienceList>
                  <ExperienceItem>
                    Temporary Tattoos – A fun way to showcase artwork on our
                    skin without the needles or pain.
                  </ExperienceItem>
                  <ExperienceItem>
                    Community Coloring Book – Featuring artwork from
                    participating artists, encouraging creativity and sharing
                    insight relating to nature.
                  </ExperienceItem>
                  <ExperienceItem>
                    Sidewalk Chalk Art – Open space for kids to decorate the
                    parking lot with colorful art.
                  </ExperienceItem>
                </ExperienceList>
              </ExperienceContent>
            </ExperienceCard>

            <ExperienceCard>
              <ExperienceHeader>
                <ExperienceTitle>Educational Experiences</ExperienceTitle>
              </ExperienceHeader>
              <ExperienceContent>
                <ExperienceList>
                  <ExperienceItem>
                    Environmental Education – Interactive displays and
                    information on how to keep the planet clean.
                  </ExperienceItem>
                  <ExperienceItem>
                    Arts & Scraps Craft Demo – Hands-on workshop by Arts &
                    Scraps, promoting sustainable creativity.
                  </ExperienceItem>
                  <ExperienceItem>
                    Nature Scavenger Hunt – An engaging activity to help
                    children connect with and learn about the natural world.
                  </ExperienceItem>
                </ExperienceList>
              </ExperienceContent>
            </ExperienceCard>
          </ExperiencesGrid>
        </Section>

        <TicketSection>
          <TicketTitle>Ticket Information</TicketTitle>
          <TicketOptions>
            <TicketCard>
              <TicketName>General Admission</TicketName>
              <TicketPrice>
                $20 <span style={{ fontSize: '1rem' }}>(pre-sale)</span>
              </TicketPrice>
              <TicketDescription>
                $25 at the door
                <br />
                Includes two raffle tickets
              </TicketDescription>
              <Button href="/inquire">Purchase Tickets</Button>
            </TicketCard>

            <TicketCard>
              <TicketName>VIP Tattoo Ticket</TicketName>
              <TicketPrice>$250</TicketPrice>
              <TicketDescription>
                $50 automatically donated to the cause
                <br />
                Remaining amount distributed at the artist&apos;s discretion
              </TicketDescription>
              <Button href="/inquire">Purchase Tickets</Button>
            </TicketCard>

            <TicketCard>
              <TicketName>Kids</TicketName>
              <TicketPrice>FREE</TicketPrice>
              <TicketDescription>
                Children are welcome to attend free of charge
              </TicketDescription>
              <Button href="/inquire">Learn More</Button>
            </TicketCard>
          </TicketOptions>

          <div style={{ marginTop: '2rem' }}>
            <SectionTitle>Raffle Information</SectionTitle>
            <TicketCard style={{ margin: '2rem auto', maxWidth: '600px' }}>
              <TicketDescription>
                <strong>Ticket Pricing:</strong>
                <br />
                $10 for one ticket
                <br />
                $15 for two tickets
                <br />
                <br />
                <strong>Raffle Prizes Include:</strong>
                <br />
                • Tattoo flash art
                <br />
                • Artist prints & original artwork
                <br />
                • Donations from local businesses
                <br />• Other community-beneficial prizes
              </TicketDescription>
            </TicketCard>
          </div>
        </TicketSection>

        <Section>
          <SectionTitle>Fundraising Beneficiaries</SectionTitle>
          <BeneficiariesSection>
            <BeneficiaryCard>
              <BeneficiaryTitle>
                Water Protection & Conservation - 80%
              </BeneficiaryTitle>
              <BeneficiaryDescription>
                <strong>Water Protectors Network</strong> – Advocating for clean
                water, Indigenous water rights, and environmental justice.
              </BeneficiaryDescription>
              <BeneficiaryPercentage>60% of total funds</BeneficiaryPercentage>
              <BeneficiaryDescription>
                <strong>Friends of the Rouge</strong> – Dedicated to restoring,
                protecting, and enhancing the Rouge River watershed, engaging
                the community in conservation efforts.
              </BeneficiaryDescription>
              <BeneficiaryPercentage>20% of total funds</BeneficiaryPercentage>
            </BeneficiaryCard>

            <BeneficiaryCard>
              <BeneficiaryTitle>
                Tree Planting & Conservation - 20%
              </BeneficiaryTitle>
              <BeneficiaryDescription>
                <strong>Greening of Detroit</strong> – Focused on planting
                trees, educating communities, and providing hands-on
                opportunities for people to contribute to a greener city.
              </BeneficiaryDescription>
              <BeneficiaryPercentage>20% of total funds</BeneficiaryPercentage>
            </BeneficiaryCard>
          </BeneficiariesSection>
        </Section>

        <Section>
          <SectionTitle>Get Involved</SectionTitle>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              Join us in celebrating and protecting our planet through art,
              music, and community connection.
            </p>
            <Button as={Link} href="/inquire">
              Contact Us To Participate
            </Button>
          </div>
        </Section>

        <Section>
          <SectionTitle>Ticket Information</SectionTitle>
          <Tickets event={event} ticketTypes={ticketTypes} />
        </Section>
      </EventContainer>
    </StyledPage>
  );
};

export default ArtsForTheEarthPage;

const StyledPage = styled.div`
  background-color: #f5f5f5;
`;

const EventContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const EventHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const EventTitle = styled.h1`
  font-size: 3.5rem;
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
`;

const EventSubtitle = styled.h2`
  font-size: 1.8rem;
  color: #96885f;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

const EventDescription = styled.div`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h3`
  font-size: 2.2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background: #96885f;
    margin: 1rem auto 0;
  }
`;

const ScheduleContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ScheduleItem = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ScheduleTime = styled.div`
  min-width: 120px;
  font-weight: bold;
  color: #96885f;
`;

const ScheduleDescription = styled.div`
  flex: 1;
`;

const ExperiencesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ExperienceCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ExperienceHeader = styled.div`
  background-color: #96885f;
  color: #fff;
  padding: 1.5rem;
  text-align: center;
`;

const ExperienceTitle = styled.h4`
  font-size: 1.5rem;
  margin: 0;
  text-transform: uppercase;
`;

const ExperienceContent = styled.div`
  padding: 1.5rem;
`;

const ExperienceList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ExperienceItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  &:before {
    content: '•';
    color: #96885f;
    font-weight: bold;
    display: inline-block;
    width: 1.5rem;
  }
`;

const TicketSection = styled.div`
  background-color: #f8f8f8;
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 3rem;
`;

const TicketTitle = styled.h4`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

const TicketOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const TicketCard = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const TicketName = styled.h5`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #96885f;
`;

const TicketPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const TicketDescription = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const Button = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #96885f;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  text-transform: uppercase;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #7a6e4e;
    transform: translateY(-2px);
  }
`;

const BeneficiariesSection = styled.div`
  margin-top: 3rem;
`;

const BeneficiaryCard = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const BeneficiaryTitle = styled.h5`
  font-size: 1.5rem;
  color: #96885f;
  margin-bottom: 1rem;
`;

const BeneficiaryDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const BeneficiaryPercentage = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 1rem;
  color: #96885f;
`;

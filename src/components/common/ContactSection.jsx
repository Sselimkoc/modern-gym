import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import InfoCard from "../ui/InfoCard";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m22 6-10 7L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 7v5l3 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Section = styled.section`
  padding: ${({ theme }) => `${theme.space.xl} 0`};
  background: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.dark};
`;

const ContentRow = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: ${({ theme }) => theme.space.xl};
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const MapWrapper = styled(motion.div)`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-height: 420px;

  iframe {
    width: 100%;
    height: 100%;
    min-height: 420px;
    border: 0;
    display: block;
  }
`;

const MapLink = styled.a`
  position: absolute;
  bottom: ${({ theme }) => theme.space.sm};
  left: ${({ theme }) => theme.space.sm};
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-decoration: none;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const HoursCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const HoursTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.dark};

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HoursList = styled.div`
  display: flex;
  flex-direction: column;
`;

const HourItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

  &:last-child {
    border-bottom: none;
  }
`;

const Day = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.dark};
`;

const Time = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ContactSection = ({ email, phone, address, hours }) => {
  const mapSrc = address
    ? `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
    : null;
  const directionsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : null;

  return (
    <Section>
      <Container>
        <Title
          as={motion.h2}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Get In Touch
        </Title>

        <ContentRow>
          {mapSrc && (
            <MapWrapper
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <iframe
                src={mapSrc}
                title="Gym location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <MapLink
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LocationIcon />
                Open in Google Maps
              </MapLink>
            </MapWrapper>
          )}

          <InfoColumn>
            {phone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0 }}
                viewport={{ once: true }}
              >
                <InfoCard
                  icon={<PhoneIcon />}
                  title="Phone"
                  value={phone}
                  link={{ href: `tel:${phone}` }}
                  color="primary"
                />
              </motion.div>
            )}

            {email && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <InfoCard
                  icon={<MailIcon />}
                  title="Email"
                  value={email}
                  link={{ href: `mailto:${email}` }}
                  color="primary"
                />
              </motion.div>
            )}

            {address && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <InfoCard
                  icon={<LocationIcon />}
                  title="Location"
                  value={address}
                  link={directionsUrl ? { href: directionsUrl } : undefined}
                  color="primary"
                />
              </motion.div>
            )}

            {hours && (
              <HoursCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <HoursTitle>
                  <ClockIcon />
                  Working Hours
                </HoursTitle>
                <HoursList>
                  {Object.entries(hours).map(([day, time]) => (
                    <HourItem key={day}>
                      <Day>{day.charAt(0).toUpperCase() + day.slice(1)}</Day>
                      <Time>{time}</Time>
                    </HourItem>
                  ))}
                </HoursList>
              </HoursCard>
            )}
          </InfoColumn>
        </ContentRow>
      </Container>
    </Section>
  );
};

export default ContactSection;

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import InfoCard from "../ui/InfoCard";

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
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.dark};
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
                  icon="📞"
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
                  icon="📧"
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
                <InfoCard icon="📍" title="Location" value={address} color="primary" />
              </motion.div>
            )}

            {hours && (
              <HoursCard
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <HoursTitle>📅 Working Hours</HoursTitle>
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

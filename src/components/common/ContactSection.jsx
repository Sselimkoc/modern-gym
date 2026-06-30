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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const HoursSection = styled(motion.div)`
  background: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.space.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  grid-column: 1 / -1;
`;

const HoursTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.dark};
`;

const HoursList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.space.md};
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
  return (
    <Section>
      <Container>
        <Title>Get In Touch</Title>

        <Grid>
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
              <InfoCard
                icon="📍"
                title="Location"
                value={address}
                color="primary"
              />
            </motion.div>
          )}

          {hours && (
            <HoursSection
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
            </HoursSection>
          )}
        </Grid>
      </Container>
    </Section>
  );
};

export default ContactSection;

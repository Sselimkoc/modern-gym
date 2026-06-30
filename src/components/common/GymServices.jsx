import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Container from "../ui/Container";

const Section = styled.section`
  padding: ${({ theme }) => `${theme.space.xl} 0`};
  background: ${({ theme }) => theme.colors.light};
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.dark};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.space.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: ${({ theme }) => theme.space.md};
  }
`;

const ServiceItem = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.space.lg};
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-8px);
  }
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.space.md};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
`;

const ServiceName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0;
`;

const serviceIcons = {
  "Weight Training": "🏋️",
  "Cardio Equipment": "🚴",
  "Yoga Classes": "🧘",
  "Personal Training": "👨‍🏫",
  Pilates: "🤸",
  Boxing: "🥊",
  CrossFit: "⚡",
  "Nutrition Consulting": "🥗",
  "Group Classes": "👥",
  "Swimming Pool": "🏊",
  "Sauna & Steam Room": "🧖",
  "Spinning Classes": "🚲",
  Zumba: "💃",
  "Kids Fitness": "🧒",
  "Strength Training": "💪",
  "Membership Programs": "🎫",
};

const GymServices = ({ services = [] }) => {
  return (
    <Section>
      <Container>
        <Title>Our Services</Title>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <ServiceIcon>{serviceIcons[service] || "✨"}</ServiceIcon>
              <ServiceName>{service}</ServiceName>
            </ServiceItem>
          ))}
        </ServicesGrid>
      </Container>
    </Section>
  );
};

export default GymServices;
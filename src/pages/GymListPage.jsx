import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import gymsData from "../data/gyms.json";

const HeroSection = styled.section`
  background: linear-gradient(135deg, #ff3c5f 0%, #1e2a38 100%);
  color: white;
  padding: ${({ theme }) => `${theme.space.xl} 0`};
  text-align: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(255, 107, 139, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 230, 184, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  color: white;
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
`;

const GridSection = styled.section`
  padding: ${({ theme }) => `${theme.space.xl} 0`};
  background: ${({ theme }) => theme.colors.light};
`;

const GymGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: ${({ theme }) => theme.space.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.space.md};
  }
`;

const GymCard = styled(motion.div)`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    transform: translateY(-12px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: ${({ theme }) => theme.transitions.default};
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.space.lg};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.space.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space.md};
  line-height: 1.6;
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
  padding-bottom: ${({ theme }) => theme.space.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const Services = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const ServiceBadge = styled.span`
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.primary};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ViewButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #ff3c5f 0%, #ff6b8b 100%);
  color: white;
  border: none;
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ theme }) => theme.shadows.primary};

  &:hover {
    box-shadow: 0 8px 20px rgba(255, 60, 95, 0.35);
    transform: translateY(-2px);
  }
`;

const GymListPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      <Navbar />

      <HeroSection>
        <Container>
          <HeroContent
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <HeroTitle>Find Your Perfect Gym</HeroTitle>
            <HeroSubtitle>
              Discover premium fitness facilities with world-class equipment and expert trainers
            </HeroSubtitle>
          </HeroContent>
        </Container>
      </HeroSection>

      <GridSection>
        <Container>
          <GymGrid
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {gymsData.map((gym, index) => (
              <GymCard
                key={gym.id}
                variants={itemVariants}
                onClick={() => navigate(`/gym/${gym.slug}`)}
              >
                <CardImage
                  src={gym.heroImage}
                  alt={gym.name}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />

                <CardContent>
                  <CardTitle>{gym.name}</CardTitle>
                  <CardDescription>{gym.description}</CardDescription>

                  <Services>
                    {gym.services.slice(0, 4).map((service) => (
                      <ServiceBadge key={service}>{service}</ServiceBadge>
                    ))}
                  </Services>

                  <CardMeta>
                    <MetaItem>
                      <span>📍</span>
                      <span>{gym.address}</span>
                    </MetaItem>
                    <MetaItem>
                      <span>📞</span>
                      <span>{gym.phone}</span>
                    </MetaItem>
                  </CardMeta>

                  <ViewButton
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/gym/${gym.slug}`)}
                  >
                    View Details →
                  </ViewButton>
                </CardContent>
              </GymCard>
            ))}
          </GymGrid>
        </Container>
      </GridSection>

      <Footer />
    </div>
  );
};

export default GymListPage;
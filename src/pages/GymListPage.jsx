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
`;

const HeroTitle = styled.h1`
  color: white;
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: clamp(2rem, 5vw, 3.5rem);
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

const GymGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.space.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.space.md};
  }
`;

const GymCard = styled(motion.div)`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-8px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.space.lg};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space.md};
  line-height: 1.6;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray};
`;

const ViewButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const GymListPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <HeroSection>
        <Container>
          <HeroTitle>Find Your Perfect Gym</HeroTitle>
          <HeroSubtitle>
            Discover premium fitness facilities across the city
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <GridSection>
        <Container>
          <GymGrid>
            {gymsData.map((gym, index) => (
              <GymCard
                key={gym.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/gym/${gym.slug}`)}
              >
                <CardImage src={gym.heroImage} alt={gym.name} />
                <CardContent>
                  <CardTitle>{gym.name}</CardTitle>
                  <CardDescription>{gym.description}</CardDescription>

                  <CardMeta>
                    <span>📍 {gym.address.split(",").slice(0, 1)[0]}</span>
                    <span>📞 {gym.phone}</span>
                  </CardMeta>

                  <ViewButton onClick={() => navigate(`/gym/${gym.slug}`)}>
                    View Details
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

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import FeaturesSection from "../components/sections/FeaturesSection";
import ProgramsSection from "../components/sections/ProgramsSection";
import WellnessSection from "../components/sections/WellnessSection";
import VirtualClassesSection from "../components/sections/VirtualClassesSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import MobileAppSection from "../components/sections/MobileAppSection";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";

const CTASection = styled.section`
  background: linear-gradient(135deg, #ff3c5f 0%, #1e2a38 100%);
  padding: ${({ theme }) => `${theme.space.xl} 0`};
  text-align: center;
  color: white;
`;

const CTATitle = styled.h2`
  color: white;
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: clamp(1.5rem, 4vw, 2.5rem);
`;

const CTAText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.lg};
  color: rgba(255, 255, 255, 0.9);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <ProgramsSection />
      <WellnessSection />
      <VirtualClassesSection />
      <TestimonialsSection />
      <MobileAppSection />

      {/* Yeni: Gym Selection CTA */}
      <CTASection>
        <Container>
          <CTATitle>Ready to Transform?</CTATitle>
          <CTAText>
            Explore our state-of-the-art facilities and start your fitness
            journey today
          </CTAText>
          <ButtonGroup>
            <Button size="lg" onClick={() => navigate("/gyms")}>
              Browse Our Gyms
            </Button>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </ButtonGroup>
        </Container>
      </CTASection>

      <Footer />
    </div>
  );
};

export default HomePage;

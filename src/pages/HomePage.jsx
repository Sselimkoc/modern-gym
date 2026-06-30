import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
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
import ImageGallery from "../components/ui/ImageGallery";
import gymsData from "../data/gyms.json";
import useSEO from "../hooks/useSEO";

const HighlightedGymsSection = styled.section`
  padding: ${({ theme }) => `${theme.space.xl} 0`};
  background: linear-gradient(135deg, #f7f7f7 0%, #ffffff 100%);
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.dark};
  font-size: clamp(2rem, 5vw, 3rem);
  position: relative;
  padding-bottom: ${({ theme }) => theme.space.lg};

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ff3c5f, #00e6b8);
    border-radius: 2px;
  }
`;

const GymsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const GymShowcase = styled(motion.div)`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    box-shadow: 0 20px 40px rgba(255, 60, 95, 0.15);
    transform: translateY(-8px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dark};
`;

const GymImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${({ theme }) => theme.transitions.default};

  ${GymShowcase}:hover & {
    transform: scale(1.08);
  }
`;

const GymBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space.md};
  right: ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  z-index: 2;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const GymContent = styled.div`
  padding: ${({ theme }) => theme.space.lg};
`;

const GymName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const GymDesc = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space.md};
  line-height: 1.6;
`;

const GymServices = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const ServiceTag = styled.span`
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
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

  &:active {
    transform: translateY(0);
  }
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, #ff3c5f 0%, #1e2a38 100%);
  padding: ${({ theme }) => `${theme.space.xl} 0`};
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>')
      repeat;
    opacity: 0.1;
  }
`;

const CTATitle = styled(motion.h2)`
  color: white;
  margin-bottom: ${({ theme }) => theme.space.md};
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  position: relative;
  z-index: 1;
`;

const CTAText = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.lg};
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  z-index: 1;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();

  useSEO({
    title: "Modern Gym - Your Fitness Journey",
    description:
      "Discover premium gym facilities with world-class equipment, expert trainers, and programs for all fitness levels.",
    keywords: "gym, fitness, training, health, wellness",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    url: "https://modern-gym.com",
  });

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
      transition: { duration: 0.6 },
    },
  };

  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <ProgramsSection />

      {/* New: Gym Showcase */}
      <HighlightedGymsSection>
        <Container>
          <SectionTitle>Featured Gyms</SectionTitle>
          <GymsGrid
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {gymsData.slice(0, 2).map((gym, index) => (
              <GymShowcase
                key={gym.id}
                variants={itemVariants}
                onClick={() => navigate(`/gym/${gym.slug}`)}
              >
                <ImageWrapper>
                  <GymImage
                    src={gym.heroImage}
                    alt={gym.name}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                  <GymBadge>Featured</GymBadge>
                </ImageWrapper>

                <GymContent>
                  <GymName>{gym.name}</GymName>
                  <GymDesc>{gym.description}</GymDesc>

                  <GymServices>
                    {gym.services.slice(0, 3).map((service) => (
                      <ServiceTag key={service}>{service}</ServiceTag>
                    ))}
                    {gym.services.length > 3 && (
                      <ServiceTag>+{gym.services.length - 3} more</ServiceTag>
                    )}
                  </GymServices>

                  <ViewButton
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/gym/${gym.slug}`)}
                  >
                    View Details →
                  </ViewButton>
                </GymContent>
              </GymShowcase>
            ))}
          </GymsGrid>

          <motion.div
            style={{ textAlign: "center" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Button size="lg" onClick={() => navigate("/gyms")}>
              Browse All Gyms
            </Button>
          </motion.div>
        </Container>
      </HighlightedGymsSection>

      <WellnessSection />
      <VirtualClassesSection />
      <TestimonialsSection />
      <MobileAppSection />

      {/* CTA Section */}
      <CTASection>
        <Container>
          <CTATitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Fitness Journey?
          </CTATitle>
          <CTAText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of members achieving their fitness goals at our
            world-class facilities
          </CTAText>
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button size="lg" onClick={() => navigate("/gyms")}>
              Explore Gyms
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/gyms")}
            >
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

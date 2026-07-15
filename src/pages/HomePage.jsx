import React from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import SectionWave from "../components/ui/SectionWave";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import FeaturesSection from "../components/sections/FeaturesSection";
import ProgramsSection from "../components/sections/ProgramsSection";
import TrainersSection from "../components/sections/TrainersSection";
import MembershipSection from "../components/sections/MembershipSection";
import WellnessSection from "../components/sections/WellnessSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import MobileAppSection from "../components/sections/MobileAppSection";
import ContactSection from "../components/common/ContactSection";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import ImageGallery from "../components/ui/ImageGallery";
import MarqueeTicker from "../components/ui/MarqueeTicker";
import siteConfig from "../data/siteConfig";
import useSEO from "../hooks/useSEO";
import { useJoinModal } from "../context/JoinModalContext";
import { barbellPattern } from "../utils/patterns";

const GallerySection = styled.section`
  padding: ${({ theme }) => `${theme.space.xl} 0`};
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.colors.light} 0%, #ffffff 100%)`};
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
    background: ${({ theme }) => theme.colors.gradientPrimary};
    border-radius: 2px;
  }
`;

const CTASection = styled.section`
  background: ${({ theme }) => theme.colors.gradientDark};
  padding: ${({ theme }) => `${theme.space.xl} 0`};
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    ${barbellPattern("%2339FF14", 0.07)}
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

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const HomePage = () => {
  const theme = useTheme();
  const { openJoinModal } = useJoinModal();

  useSEO({
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    keywords: "gym, fitness, training, health, wellness",
    image: siteConfig.heroImage,
    url: "https://modern-gym.com",
  });

  return (
    <div>
      <Navbar />
      <Hero />
      <MarqueeTicker />
      <SectionWave bgColor={theme.colors.secondary} fillColor={theme.colors.light} variant={0} />
      <FeaturesSection />
      <SectionWave bgColor={theme.colors.light} fillColor={theme.colors.white} variant={1} />
      <ProgramsSection />
      <SectionWave bgColor={theme.colors.white} fillColor={theme.colors.light} variant={1} />
      <TrainersSection />
      <SectionWave bgColor={theme.colors.light} fillColor={theme.colors.secondary} variant={0} />
      <MembershipSection />
      <SectionWave bgColor={theme.colors.secondary} fillColor={theme.colors.light} variant={1} />
      <WellnessSection />
      <TestimonialsSection />
      <SectionWave bgColor={theme.colors.light} fillColor={theme.colors.secondary} variant={0} />
      <MobileAppSection />
      <SectionWave bgColor={theme.colors.secondary} fillColor={theme.colors.light} variant={1} />

      {/* Facility Gallery */}
      <GallerySection id="gallery">
        <Container>
          <SectionTitle
            as={motion.h2}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Our Facility
          </SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ImageGallery images={siteConfig.images} />
          </motion.div>
        </Container>
      </GallerySection>
      <SectionWave bgColor={theme.colors.light} fillColor={theme.colors.secondary} variant={0} />

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
            Join our community and start achieving your fitness goals with
            expert support every step of the way
          </CTAText>
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button size="lg" onClick={openJoinModal}>
              Join Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
            >
              Contact Us
            </Button>
          </ButtonGroup>
        </Container>
      </CTASection>
      <SectionWave bgColor={theme.colors.secondary} fillColor={theme.colors.light} variant={1} />

      {/* Contact */}
      <div id="contact">
        <ContactSection
          phone={siteConfig.phone}
          email={siteConfig.email}
          address={siteConfig.address}
          hours={siteConfig.hours}
        />
      </div>
      <SectionWave bgColor={theme.colors.light} fillColor={theme.colors.secondary} variant={0} />

      <Footer />
    </div>
  );
};

export default HomePage;

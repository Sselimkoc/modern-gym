import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import FeaturesSection from "../components/sections/FeaturesSection";
import ProgramsSection from "../components/sections/ProgramsSection";
import MembershipSection from "../components/sections/MembershipSection";
import WellnessSection from "../components/sections/WellnessSection";
import VirtualClassesSection from "../components/sections/VirtualClassesSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import MobileAppSection from "../components/sections/MobileAppSection";
import ContactSection from "../components/common/ContactSection";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import ImageGallery from "../components/ui/ImageGallery";
import siteConfig from "../data/siteConfig";
import useSEO from "../hooks/useSEO";

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

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const HomePage = () => {
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
      <FeaturesSection />
      <ProgramsSection />
      <MembershipSection />
      <WellnessSection />
      <VirtualClassesSection />
      <TestimonialsSection />
      <MobileAppSection />

      {/* Facility Gallery */}
      <GallerySection id="gallery">
        <Container>
          <SectionTitle>Our Facility</SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ImageGallery images={siteConfig.images} alt={siteConfig.name} />
          </motion.div>
        </Container>
      </GallerySection>

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
            world-class facility
          </CTAText>
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button size="lg" onClick={() => scrollToSection("hero")}>
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

      {/* Contact */}
      <div id="contact">
        <ContactSection
          phone={siteConfig.phone}
          email={siteConfig.email}
          address={siteConfig.address}
          hours={siteConfig.hours}
        />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import SectionWave from "../components/ui/SectionWave";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import FeaturesSection from "../components/sections/FeaturesSection";
import ProgramsSection from "../components/sections/ProgramsSection";
import TrainersSection from "../components/sections/TrainersSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";

const HomePage = () => {
  const theme = useTheme();
  const { openJoinModal } = useJoinModal();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace("#", "");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

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
      <SectionWave
        bgColor={theme.colors.secondary}
        fillColor={theme.colors.light}
        variant={0}
      />
      <FeaturesSection />
      <SectionWave
        bgColor={theme.colors.light}
        fillColor={theme.colors.white}
        variant={1}
      />
      <ProgramsSection />
      <TrainersSection />
      <TestimonialsSection />
    </>
  );
};

export default HomePage;

import React from "react";
import Hero from "../components/layout/Hero";

// Home page sections
import FeaturesSection from "../components/sections/FeaturesSection";
import ProgramsSection from "../components/sections/ProgramsSection";
import WellnessSection from "../components/sections/WellnessSection";
import VirtualClassesSection from "../components/sections/VirtualClassesSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import MobileAppSection from "../components/sections/MobileAppSection";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <ProgramsSection />
      <WellnessSection />
      <VirtualClassesSection />
      <TestimonialsSection />
      <MobileAppSection />
    </>
  );
};

export default HomePage;

import React from "react";
import Hero from "../components/layout/Hero";

// Home page sections
import FeaturesSection from "../components/sections/FeaturesSection";
import ProgramsSection from "../components/sections/ProgramsSection";
import TrainersSection from "../components/sections/TrainersSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <ProgramsSection />
      <TrainersSection />
      <TestimonialsSection />
    </>
  );
};

export default HomePage;

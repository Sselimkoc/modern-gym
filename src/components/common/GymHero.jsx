import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 400px;
  background: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 300px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 250px;
  }
`;

const BackgroundImage = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme, bgColor }) =>
    bgColor ||
    `linear-gradient(135deg, rgba(30, 42, 56, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%)`};
  z-index: 2;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
  max-width: 600px;
  padding: ${({ theme }) => theme.space.lg};
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 4rem);
  margin-bottom: ${({ theme }) => theme.space.md};
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: ${({ theme }) => theme.colors.light};
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const GymHero = ({ image, title, subtitle, gymColor }) => {
  return (
    <HeroSection>
      {image && (
        <BackgroundImage
          src={image}
          alt={title}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}

      <Overlay
        bgColor={gymColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Content>
    </HeroSection>
  );
};

export default GymHero;

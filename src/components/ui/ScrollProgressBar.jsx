import React from "react";
import styled from "styled-components";
import { motion, useScroll, useSpring } from "framer-motion";

const Bar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.accent}99;
  transform-origin: 0%;
  pointer-events: none;
`;

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return <Bar style={{ scaleX }} />;
};

export default ScrollProgressBar;

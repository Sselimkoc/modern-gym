import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const FloatingButton = styled(motion.button)`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.gradientPrimary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0.9rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.primary};

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    justify-content: center;
    width: calc(100% - 2rem);
  }
`;

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const StickyJoinButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <FloatingButton
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => scrollToSection("membership")}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 6v12M7 9v6M17 9v6M20 6v12M7 12h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Free Trial
        </FloatingButton>
      )}
    </AnimatePresence>
  );
};

export default StickyJoinButton;

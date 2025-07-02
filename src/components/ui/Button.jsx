import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledButton = styled(motion.button)`
  background: ${({ theme, variant }) =>
    variant === "outline"
      ? "transparent"
      : variant === "secondary"
      ? theme.colors.secondary
      : theme.colors.primary};
  color: ${({ theme, variant }) =>
    variant === "outline" ? theme.colors.primary : theme.colors.white};
  border: ${({ theme, variant }) =>
    variant === "outline" ? `2px solid ${theme.colors.primary}` : "none"};
  padding: ${({ size }) =>
    size === "sm"
      ? "0.6rem 1.2rem"
      : size === "lg"
      ? "1.2rem 2.8rem"
      : "0.9rem 2.2rem"};
  font-size: ${({ size }) =>
    size === "sm" ? "0.9rem" : size === "lg" ? "1.2rem" : "1.1rem"};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  display: inline-block;
  text-align: center;
  box-shadow: ${({ theme, variant }) =>
    variant === "outline" ? "none" : theme.shadows.primary};
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  z-index: 1;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
    z-index: -1;
  }

  &:hover {
    background: ${({ theme, variant }) =>
      variant === "outline"
        ? "rgba(255,60,95,0.1)"
        : variant === "secondary"
        ? theme.colors.secondary
        : theme.colors.primaryDark};
    transform: translateY(-3px);
    box-shadow: ${({ theme, variant }) =>
      variant === "outline" ? "none" : `0 8px 20px rgba(255,60,95,0.35)`};
  }

  &:hover::after {
    width: 300px;
    height: 300px;
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: ${({ theme, variant }) =>
      variant === "outline" ? "none" : `0 4px 10px rgba(255,60,95,0.25)`};
  }
`;

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  whileHover = { scale: 1.03 },
  whileTap = { scale: 0.98 },
  fullWidth = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      whileHover={whileHover}
      whileTap={whileTap}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

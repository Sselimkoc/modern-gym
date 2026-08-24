import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const StyledButton = styled(motion.button)`
  background: ${({ theme, variant }) => {
    if (variant === "outline") return "transparent";
    if (variant === "text") return "transparent";
    return theme.colors.accent;
  }};

  color: ${({ theme, variant }) => {
    if (variant === "outline" || variant === "text") return theme.colors.text;
    return theme.colors.onAccent;
  }};

  border: ${({ theme, variant }) =>
    variant === "outline" ? `2px solid ${theme.colors.borderStrong}` : "none"};

  padding: ${({ size, variant }) => {
    if (variant === "text") return "0.5rem 0";
    if (size === "sm") return "0.7rem 1.4rem";
    if (size === "lg") return "1.1rem 2.75rem";
    return "0.9rem 2.25rem";
  }};

  font-size: ${({ size }) => {
    if (size === "sm") return "0.85rem";
    if (size === "lg") return "1rem";
    return "0.9rem";
  }};

  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: ${({ theme, variant }) =>
    variant === "text" ? "0" : theme.borderRadius.md};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, variant }) => {
      if (variant === "outline") return theme.colors.accent;
      if (variant === "text") return "transparent";
      return theme.colors.accentDim;
    }};
    border-color: ${({ theme, variant }) =>
      variant === "outline" ? theme.colors.accent : "transparent"};
    color: ${({ theme, variant }) =>
      variant === "text" ? theme.colors.accent : theme.colors.onAccent};
  }

  &:active {
    transform: ${({ variant }) => (variant === "text" ? "none" : "scale(0.98)")};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  whileTap = { scale: 0.98 },
  fullWidth = false,
  icon,
  iconPosition = "left",
  disabled = false,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      whileTap={disabled ? undefined : whileTap}
      $fullWidth={fullWidth}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && <IconWrapper>{icon}</IconWrapper>}
      {children}
      {icon && iconPosition === "right" && <IconWrapper>{icon}</IconWrapper>}
    </StyledButton>
  );
};

export default Button;

import styled from "styled-components";
import { motion } from "framer-motion";

const StyledCard = styled(motion.div)`
  background: ${({ theme, bgColor }) =>
    bgColor === "primary"
      ? theme.colors.primary
      : bgColor === "secondary"
      ? theme.colors.secondary
      : bgColor === "dark"
      ? theme.colors.dark
      : theme.colors.white};
  color: ${({ theme, bgColor }) =>
    bgColor === "primary" || bgColor === "secondary" || bgColor === "dark"
      ? theme.colors.white
      : theme.colors.dark};
  border-radius: ${({ theme, rounded }) =>
    rounded === "sm"
      ? theme.borderRadius.sm
      : rounded === "lg"
      ? theme.borderRadius.xl
      : theme.borderRadius.lg};
  box-shadow: ${({ theme, elevation }) =>
    elevation === "sm"
      ? theme.shadows.sm
      : elevation === "lg"
      ? theme.shadows.lg
      : theme.shadows.md};
  padding: ${({ padding }) => padding || "1.5rem"};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: ${({ theme, hover }) =>
      hover ? "0 15px 30px rgba(0, 0, 0, 0.1)" : "inherit"};
    transform: ${({ hover }) => (hover ? "translateY(-8px)" : "none")};
    border-color: ${({ hover, theme }) =>
      hover ? "rgba(255, 60, 95, 0.2)" : "rgba(0, 0, 0, 0.05)"};
  }
`;

const Card = ({
  children,
  bgColor,
  rounded = "md",
  elevation = "md",
  padding,
  hover = false,
  ...props
}) => {
  return (
    <StyledCard
      bgColor={bgColor}
      rounded={rounded}
      elevation={elevation}
      padding={padding}
      hover={hover}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Card;

import styled from "styled-components";
import { motion } from "framer-motion";

const StyledCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme, rounded }) =>
    rounded === "sm"
      ? theme.borderRadius.sm
      : rounded === "lg"
      ? theme.borderRadius.xl
      : theme.borderRadius.lg};
  padding: ${({ padding }) => padding || "1.5rem"};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    border-color: ${({ hover, theme }) =>
      hover ? theme.colors.accent : theme.colors.border};
    transform: ${({ hover }) => (hover ? "translateY(-6px)" : "none")};
    box-shadow: ${({ hover, theme }) => (hover ? theme.shadows.lg : "none")};
  }
`;

const Card = ({
  children,
  rounded = "md",
  padding,
  hover = false,
  ...props
}) => {
  return (
    <StyledCard rounded={rounded} padding={padding} hover={hover} {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;

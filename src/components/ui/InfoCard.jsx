import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: ${({ theme, color }) =>
    color === "primary" ? theme.colors.primary : theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  flex-shrink: 0;
  font-size: 1.5rem;
  color: ${({ theme, color }) =>
    color === "primary" ? theme.colors.white : theme.colors.secondary};

  svg {
    width: 26px;
    height: 26px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.dark};
`;

const Value = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 0;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const InfoCard = ({ icon, title, value, link, color = "primary" }) => {
  const content = (
    <Container
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <IconWrapper color={color}>{icon}</IconWrapper>
      <Content>
        <Title>{title}</Title>
        {link ? (
          <Value>
            <a href={link.href} target={link.target || "_blank"} rel="noopener noreferrer">
              {value}
            </a>
          </Value>
        ) : (
          <Value>{value}</Value>
        )}
      </Content>
    </Container>
  );

  return content;
};

export default InfoCard;
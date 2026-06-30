import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.space.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.lightGray};
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.dark};
`;

const AuthorRole = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray};
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Star = styled.span`
  color: ${({ theme, filled }) =>
    filled ? theme.colors.primary : theme.colors.lightGray};
  font-size: 1rem;
`;

const Text = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.dark};
  line-height: 1.7;
`;

const ReviewCard = ({ name, role, text, rating = 5, avatar }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <Container whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Header>
        {avatar && <Avatar src={avatar} alt={name} />}
        <AuthorInfo>
          <AuthorName>{name}</AuthorName>
          <AuthorRole>{role}</AuthorRole>
        </AuthorInfo>
      </Header>

      <Stars>
        {stars.map((filled, i) => (
          <Star key={i} filled={filled}>
            ★
          </Star>
        ))}
      </Stars>

      <Text>"{text}"</Text>
    </Container>
  );
};

export default ReviewCard;

import styled from "styled-components";

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const Star = styled.svg`
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.accent};
  flex-shrink: 0;
`;

const Score = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 0.9rem;
`;

const Reviews = styled.span`
  color: ${({ theme }) => theme.colors.textFaint};
  font-size: 0.8rem;
`;

const RatingBadge = ({ rating, reviews, className }) => (
  <Badge className={className}>
    <Star viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.8 8.6L22 9.3L16.6 14.1L18.2 21.2L12 17.5L5.8 21.2L7.4 14.1L2 9.3L9.2 8.6L12 2Z" />
    </Star>
    <Score>{rating}</Score>
    <Reviews>· {reviews} Google yorumu</Reviews>
  </Badge>
);

export default RatingBadge;

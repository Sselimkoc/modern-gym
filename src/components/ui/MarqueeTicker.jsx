import styled from "styled-components";

const items = [
  "NO PAIN NO GAIN",
  "TRAIN INSANE",
  "UNLEASH THE BEAST",
  "STRONGER EVERY DAY",
  "SWEAT NOW SHINE LATER",
  "OWN YOUR POWER",
];

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  border-top: 1px solid rgba(57, 255, 20, 0.15);
  border-bottom: 1px solid rgba(57, 255, 20, 0.15);
  overflow: hidden;
  padding: 0.9rem 0;
  position: relative;

  @media (prefers-reduced-motion: reduce) {
    overflow-x: auto;
  }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  color: ${({ theme }) => theme.colors.neon};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  font-size: 1.1rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 0 1.5rem;
  text-shadow: 0 0 14px rgba(57, 255, 20, 0.45);

  &::after {
    content: "\\2726";
    color: rgba(255, 255, 255, 0.3);
    margin-left: 1.5rem;
    text-shadow: none;
  }
`;

const MarqueeTicker = () => {
  const doubled = [...items, ...items];

  return (
    <Wrapper aria-hidden="true">
      <Track>
        {doubled.map((text, index) => (
          <Item key={`${text}-${index}`}>{text}</Item>
        ))}
      </Track>
    </Wrapper>
  );
};

export default MarqueeTicker;

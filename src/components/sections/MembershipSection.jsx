import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import siteConfig from "../../data/siteConfig";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const SectionWrapper = styled.section`
  padding: 6rem 0;
  background: ${({ theme }) => theme.colors.gradientDark};
  position: relative;
  overflow: hidden;
`;

const Blob = styled(motion.div)`
  position: absolute;
  top: -20%;
  right: -10%;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.12;
  filter: blur(60px);
  pointer-events: none;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1rem;
  font-size: clamp(2rem, 4vw, 2.5rem);
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.75);
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
`;

const TrialBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  padding: 0.4rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(57, 255, 20, 0.12);
  border: 1px solid rgba(57, 255, 20, 0.4);
  color: ${({ theme }) => theme.colors.neon};
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  svg {
    width: 14px;
    height: 14px;
  }
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const PlanCard = styled(motion.div)`
  background: ${({ popular }) =>
    popular ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.04)"};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid
    ${({ popular, theme }) =>
      popular ? theme.colors.accent : "rgba(255, 255, 255, 0.1)"};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transform: ${({ popular }) => (popular ? "scale(1.05)" : "scale(1)")};
  box-shadow: ${({ popular }) =>
    popular ? "0 20px 50px rgba(255, 255, 255, 0.16)" : "none"};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    transform: none;
    border-width: ${({ popular }) => (popular ? "2px" : "1px")};
    box-shadow: ${({ popular }) =>
      popular ? "0 10px 30px rgba(255, 255, 255, 0.2)" : "none"};
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 0.35rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PlanName = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

const PlanDescription = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  min-height: 2.5rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  margin-bottom: 2rem;
`;

const Price = styled.span`
  font-size: 3rem;
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  color: ${({ theme }) => theme.colors.white};

  &::before {
    content: "$";
    font-size: 1.5rem;
    vertical-align: super;
    margin-right: 2px;
  }
`;

const Period = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  line-height: 1.4;

  svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    margin-top: 2px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const MembershipSection = () => {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-60, 60]
  );

  return (
    <SectionWrapper id="membership" ref={ref}>
      <Blob style={{ y: blobY }} />
      <Container>
        <SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Title>Choose Your Membership</Title>
            <Subtitle>
              Pick the plan that fits your goals, cancel anytime.
            </Subtitle>
            <TrialBadge>
              <CheckIcon />
              {siteConfig.freeTrialText}
            </TrialBadge>
          </motion.div>
        </SectionHeader>

        <PlansGrid>
          {siteConfig.membershipPlans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              popular={plan.popular}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && <PopularBadge>Most Popular</PopularBadge>}
              <PlanName>{plan.name}</PlanName>
              <PlanDescription>{plan.description}</PlanDescription>
              <PriceRow>
                <Price>{plan.price}</Price>
                <Period>/{plan.period}</Period>
              </PriceRow>
              <FeatureList>
                {plan.features.map((feature) => (
                  <FeatureItem key={feature}>
                    <CheckIcon />
                    <span>{feature}</span>
                  </FeatureItem>
                ))}
              </FeatureList>
              <Button
                fullWidth
                variant={plan.popular ? "primary" : "outline"}
                onClick={() => scrollToSection("contact")}
              >
                {plan.cta}
              </Button>
            </PlanCard>
          ))}
        </PlansGrid>
      </Container>
    </SectionWrapper>
  );
};

export default MembershipSection;

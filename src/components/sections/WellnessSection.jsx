import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import Button from "../ui/Button";

const SectionWrapper = styled.section`
  padding: 6rem 0;
  background-color: ${({ theme }) => theme.colors.light};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
    background: ${({ theme }) => theme.colors.gradientDark};
    clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
    opacity: 0.03;
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextContent = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 2;
    text-align: center;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1.5rem;
  font-size: clamp(2rem, 4vw, 2.5rem);
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
    text-align: left;
  }
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const FeatureText = styled.div`
  h4 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  height: 500px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 400px;
    order: 1;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SmallImage = styled(motion.div)`
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 200px;
  height: 200px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 5px solid white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 150px;
    height: 150px;
    bottom: -20px;
    right: -20px;
  }
`;

const wellnessFeatures = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 6V12L16 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Extended Hours",
    description: "Access our spa facilities from 7 AM to 10 PM daily.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Expert Therapists",
    description: "Certified professionals with 5+ years of experience.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Premium Products",
    description: "We use only organic and eco-friendly spa products.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 9H9.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 9H15.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Relaxation Guarantee",
    description: "100% satisfaction or we'll offer a complimentary service.",
  },
];

const WellnessSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <SectionWrapper id="wellness">
      <Container>
        <ContentWrapper ref={ref}>
          <TextContent>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Title>Spa & Wellness Experience</Title>
              <Subtitle>
                Rejuvenate your body and mind in our state-of-the-art spa and
                wellness center. Enjoy a variety of treatments designed to help
                you relax, recover, and revitalize.
              </Subtitle>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <FeaturesList>
                {wellnessFeatures.map((feature, index) => (
                  <FeatureItem key={index} variants={itemVariants}>
                    <IconWrapper>{feature.icon}</IconWrapper>
                    <FeatureText>
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </FeatureText>
                  </FeatureItem>
                ))}
              </FeaturesList>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button>Book a Spa Session</Button>
            </motion.div>
          </TextContent>

          <ImageWrapper
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <MainImage
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
              alt="Spa and wellness center"
            />
            <SmallImage
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                alt="Massage therapy"
              />
            </SmallImage>
          </ImageWrapper>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default WellnessSection;

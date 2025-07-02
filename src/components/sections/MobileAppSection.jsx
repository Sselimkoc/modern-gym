import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";

const SectionWrapper = styled.section`
  padding: 6rem 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.light};
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.05) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
  z-index: 1;
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
    gap: 3rem;
  }
`;

const TextContent = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    text-align: center;
    order: 2;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.light};
  margin-bottom: 1.5rem;
  font-size: clamp(2rem, 4vw, 2.5rem);
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem 0;
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
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
    margin: 0 0 0.25rem 0;
    color: ${({ theme }) => theme.colors.light};
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.lightGray};
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const AppStoreButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }
`;

const StoreButton = styled.a`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  svg {
    width: 24px;
    height: 24px;
    margin-right: 0.75rem;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  span:first-child {
    font-size: 0.7rem;
    margin-bottom: 0.25rem;
  }

  span:last-child {
    font-weight: 600;
    font-size: 1rem;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 1;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const PhoneImage = styled.div`
  position: relative;
  z-index: 2;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const PhoneGlow = styled.div`
  position: absolute;
  width: 80%;
  height: 40%;
  background: ${({ theme }) => theme.colors.accent};
  filter: blur(100px);
  opacity: 0.3;
  bottom: 10%;
  left: 10%;
  z-index: 1;
`;

const appFeatures = [
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
    title: "Class Scheduling",
    description: "Book and manage your classes with just a few taps.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Fitness Tracking",
    description: "Monitor your workouts, progress, and achievements.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="9"
          cy="7"
          r="4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 21v-2a4 4 0 0 0-3-3.87"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3.13a4 4 0 0 1 0 7.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Community Features",
    description: "Connect with other members and join challenges.",
  },
];

const MobileAppSection = () => {
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
    <SectionWrapper id="mobile-app">
      <BackgroundPattern />
      <Container>
        <ContentWrapper ref={ref}>
          <TextContent>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Title>Take Your Fitness Journey Mobile</Title>
              <Subtitle>
                Download our app to track workouts, book classes, and stay
                connected with your fitness community. Available for iOS and
                Android.
              </Subtitle>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <FeaturesList>
                {appFeatures.map((feature, index) => (
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
              <AppStoreButtons>
                <StoreButton href="#" target="_blank" rel="noopener noreferrer">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.5615 12.5262C17.5615 9.84096 19.7428 8.65216 19.8236 8.60136C18.6348 6.83376 16.7542 6.6 16.0848 6.58032C14.4778 6.41136 12.9316 7.50336 12.1135 7.50336C11.2748 7.50336 10.0046 6.59952 8.64978 6.62976C6.87162 6.65904 5.22162 7.64352 4.30026 9.19152C2.41386 12.3356 3.81162 17.0126 5.61834 19.6464C6.52914 20.9434 7.58562 22.3905 8.97282 22.3412C10.3187 22.2872 10.8243 21.4691 12.4418 21.4691C14.0378 21.4691 14.5116 22.3412 15.9195 22.3092C17.3697 22.2872 18.2805 21.0178 19.1598 19.7102C20.2032 18.2186 20.6362 16.7538 20.6573 16.6884C20.615 16.6748 17.5689 15.4814 17.5615 12.5262Z" />
                    <path d="M15.4297 4.30992C16.1685 3.40968 16.6633 2.16408 16.5203 0.9375C15.4624 0.979125 14.1437 1.63552 13.3733 2.51616C12.6933 3.29352 12.0905 4.58592 12.2545 5.77472C13.4413 5.85512 14.6593 5.20992 15.4297 4.30992Z" />
                  </svg>
                  <div>
                    <span>Download on the</span>
                    <span>App Store</span>
                  </div>
                </StoreButton>
                <StoreButton href="#" target="_blank" rel="noopener noreferrer">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3.60001 2.40002C3.29001 2.76002 3.10001 3.30002 3.10001 3.98002V20.02C3.10001 20.7 3.29001 21.24 3.60001 21.6L3.66001 21.66L13.57 11.75V11.66L3.66001 1.74002L3.60001 2.40002Z" />
                    <path d="M17.5 15.68L13.57 11.75L17.5 7.82002L21.96 10.46C23.17 11.13 23.17 12.27 21.96 12.94L17.5 15.68Z" />
                    <path d="M17.5 15.68L13.57 11.75L3.60001 21.6C3.96001 21.96 4.53001 22.02 5.16001 21.66L17.5 15.68Z" />
                    <path d="M17.5 7.82002L5.16001 1.84002C4.53001 1.48002 3.96001 1.54002 3.60001 1.90002L13.57 11.75L17.5 7.82002Z" />
                  </svg>
                  <div>
                    <span>GET IT ON</span>
                    <span>Google Play</span>
                  </div>
                </StoreButton>
              </AppStoreButtons>
            </motion.div>
          </TextContent>

          <ImageWrapper
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PhoneGlow />
            <PhoneImage>
              <img
                src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
                alt="Mobile app interface showing fitness tracking"
              />
            </PhoneImage>
          </ImageWrapper>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default MobileAppSection;

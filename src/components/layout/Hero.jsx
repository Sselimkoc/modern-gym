import { useRef } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Button from "../ui/Button";
import Container from "../ui/Container";
import CursorSpotlight from "../ui/CursorSpotlight";
import heroVideo from "../../assets/videos/hero.mp4";
import siteConfig from "../../data/siteConfig";
import { useJoinModal } from "../../context/JoinModalContext";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const HeroWrapper = styled.section`
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: brightness(0.6) saturate(1.2);
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    rgba(4, 8, 5, 0.8) 60%,
    rgba(22, 163, 74, 0.45) 100%
  );
  z-index: 2;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 3;
  color: white;
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const PrimaryCtaWrap = styled.div`
  position: relative;
  display: inline-flex;

  &::before {
    content: "";
    position: absolute;
    inset: -8px;
    background: ${({ theme }) => theme.colors.gradientPrimary};
    filter: blur(18px);
    opacity: 0.6;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    z-index: -1;
  }
`;

const SecondaryButton = styled(Button)`
  && {
    border-width: 1.5px;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: rgba(255, 255, 255, 0.85);
    border-color: rgba(255, 255, 255, 0.4);
  }

  &&:hover {
    color: ${({ theme }) => theme.colors.white};
    border-color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const TrustRow = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);

  span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

// Modal styles
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  width: 100%;
  max-width: 460px;
  padding: 2.25rem 2rem;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
`;

const VisitEyebrow = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  margin: 0 auto 1rem;
  padding: 0.35rem 0.9rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(22, 163, 74, 0.12);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.06em;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const VisitTitle = styled.h2`
  font-size: clamp(1.4rem, 3vw, 1.6rem);
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 0.6rem;
  text-align: center;
`;

const VisitIntro = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const VisitInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.75rem;
`;

const VisitInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.7rem 0.85rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
  line-height: 1.4;
`;

const VisitIcon = styled.span`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(22, 163, 74, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 17px;
    height: 17px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const VisitActions = styled.div`
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;

  > * {
    flex: 1;
  }
`;

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 7v5l3 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Hero = () => {
  const { isOpen: showModal, openJoinModal, closeJoinModal } = useJoinModal();
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReducedMotion ? [1, 1] : [1, 1.1]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReducedMotion ? [0, 0] : [0, 100]
  );

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address
  )}`;

  return (
    <HeroWrapper ref={ref} id="hero" tabIndex={-1}>
      <motion.div style={{ scale }}>
        <VideoBackground src={heroVideo} autoPlay loop muted playsInline />
      </motion.div>
      <Overlay />
      <CursorSpotlight zIndex={2} />
      <Container>
        <Content style={{ opacity, y }}>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Unlock Your Potential.
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your Fitness Journey Starts Here.
          </Subtitle>
          <ButtonContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <PrimaryCtaWrap>
              <Button size="lg" onClick={openJoinModal}>
                Join Now
              </Button>
            </PrimaryCtaWrap>
            <SecondaryButton
              variant="outline"
              size="md"
              onClick={() => scrollToSection("programs")}
            >
              View Programs
            </SecondaryButton>
          </ButtonContainer>
          <TrustRow
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              First week free
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              No commitment
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Cancel anytime
            </span>
          </TrustRow>
        </Content>
      </Container>

      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <CloseButton onClick={closeJoinModal}>×</CloseButton>
              <VisitEyebrow>
                <LocationIcon />
                Visit Us
              </VisitEyebrow>
              <VisitTitle>Join {siteConfig.name} In Person</VisitTitle>
              <VisitIntro>
                We keep membership sign-ups simple — no forms, no waiting on a
                callback. Walk in during opening hours and our team will get
                you started the same day.
              </VisitIntro>
              <VisitInfoList>
                <VisitInfoRow>
                  <VisitIcon>
                    <LocationIcon />
                  </VisitIcon>
                  <span>{siteConfig.address}</span>
                </VisitInfoRow>
                <VisitInfoRow>
                  <VisitIcon>
                    <PhoneIcon />
                  </VisitIcon>
                  <span>{siteConfig.phone}</span>
                </VisitInfoRow>
                <VisitInfoRow>
                  <VisitIcon>
                    <ClockIcon />
                  </VisitIcon>
                  <span>Mon–Thu {siteConfig.hours.monday}</span>
                </VisitInfoRow>
              </VisitInfoList>
              <VisitActions>
                <Button
                  onClick={() =>
                    window.open(directionsUrl, "_blank", "noopener,noreferrer")
                  }
                >
                  Get Directions
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.location.href = `tel:${siteConfig.phone}`;
                  }}
                >
                  Call Us
                </Button>
              </VisitActions>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </HeroWrapper>
  );
};

export default Hero;

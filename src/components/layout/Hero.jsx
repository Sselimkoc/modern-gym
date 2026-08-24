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
import RatingBadge from "../ui/RatingBadge";
import { ScribbleUnderline } from "../decor/Scribble";
import heroVideo from "../../assets/videos/hero.mp4";
import siteConfig from "../../data/siteConfig";
import { useJoinModal } from "../../context/JoinModalContext";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const HeroWrapper = styled.section`
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bg};
  padding: 8rem 0 4rem;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: brightness(0.5) saturate(1.1) contrast(1.05) grayscale(0.15);
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 11, 0.75) 0%,
    rgba(10, 10, 11, 0.55) 45%,
    rgba(10, 10, 11, 0.92) 100%
  );
`;

const Eyebrow = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1.25rem;

  &::before {
    content: "— ";
  }
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 3;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
`;

const Title = styled(motion.h1)`
  margin-bottom: 1.5rem;
  line-height: 1.4;

  span {
    position: relative;
    display: inline-block;
    line-height: 0.86;
    color: ${({ theme }) => theme.colors.accent};
    white-space: nowrap;
  }
`;

const AccentUnderline = styled(ScribbleUnderline)`
  position: absolute;
  left: -3%;
  top: 100%;
  margin-top: 0.04em;
  width: 106%;
  height: 0.16em;
  color: ${({ theme }) => theme.colors.accent};
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  margin: 0 auto 2rem;
  max-width: 600px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const RatingRow = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
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
  margin-bottom: 3.5rem;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  max-width: 480px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 1rem;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.85rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem 2rem;
  }
`;

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(1.15rem, 4vw, 1.75rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.35rem;
  white-space: nowrap;
`;

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textFaint};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlayStrong};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1400;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  max-width: 480px;
  padding: 2.5rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }

const FormTitle = styled.h3`
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Input = styled.input`
  padding: 0.9rem 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textFaint};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 0.5rem;
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 1rem 0;

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: 0;
  }
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
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(closeModal, 2200);
  };

  return (
    <HeroWrapper ref={ref} id="hero">
      <VideoBackground src={heroVideo} autoPlay loop muted playsInline />
      <Scrim />

      <Container>
        <Content style={{ opacity, y }}>
          <Eyebrow
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sivas Merkez
          </Eyebrow>

          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Black-Fit ile{" "}
            <span>
              gücünü
              <AccentUnderline inView delay={0.9} opacity={0.9} />
            </span>
            <br />
            keşfet
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            Sivas'ın en modern spor merkezinde, uzman eğitmenler eşliğinde
            hedeflerinize ulaşın.
          </Subtitle>

          <RatingRow
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <RatingBadge rating="4.9" reviews="49" />
          </RatingRow>

          <ButtonContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" onClick={() => setShowModal(true)}>
              Hemen Katıl
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => scrollToSection("programs")}
            >
              Programları İncele
            </Button>
          </ButtonContainer>

          <StatsContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <StatItem>
              <StatNumber>487</StatNumber>
              <StatLabel>Üye</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>7</StatNumber>
              <StatLabel>Gün Açığız</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>2</StatNumber>
              <StatLabel>Ayrı Alan</StatLabel>
            </StatItem>
          </StatsContainer>
        </Content>
      </Container>

      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 24, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal} aria-label="Kapat">
                ×
              </CloseButton>
              <FormTitle>Black-Fit'e Katıl</FormTitle>

              {submitted ? (
                <SuccessMessage
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>
                    Teşekkürler! Ekibimiz en kısa sürede seninle iletişime
                    geçecek.
                  </p>
                </SuccessMessage>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="name">Ad Soyad</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Adınızı ve soyadınızı girin"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">E-posta Adresi</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="E-posta adresinizi girin"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="phone">Telefon Numarası</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Telefon numaranızı girin"
                      required
                    />
                  </FormGroup>
                  <SubmitButton type="submit" $fullWidth>
                    Yolculuğuna Başla
                  </SubmitButton>
                </Form>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </HeroWrapper>
  );
};

export default Hero;

import { useRef, useState } from "react";
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
  gap: 1rem;
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
`;

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

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0.2, 0.7], [0, 80]);

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
              size="lg"
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

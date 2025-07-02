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
import heroVideo from "../../assets/videos/hero.mp4";

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
    rgba(30, 42, 56, 0.7) 60%,
    rgba(255, 60, 95, 0.4) 100%
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
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
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
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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

const FormTitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.secondary};
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(255, 60, 95, 0.2);
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
  width: 100%;
`;

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form işleme mantığı buraya gelecek
    alert("Thank you for joining! We'll contact you shortly.");
    setShowModal(false);
  };

  return (
    <HeroWrapper ref={ref} id="hero">
      <motion.div style={{ scale }}>
        <VideoBackground src={heroVideo} autoPlay loop muted playsInline />
      </motion.div>
      <Overlay />
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
            <Button size="lg" onClick={() => setShowModal(true)}>
              Join Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("programs")}
            >
              View Programs
            </Button>
          </ButtonContainer>
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
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
              <FormTitle>Join PowerFit Today</FormTitle>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </FormGroup>
                <SubmitButton type="submit">Start Your Journey</SubmitButton>
              </Form>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </HeroWrapper>
  );
};

export default Hero;

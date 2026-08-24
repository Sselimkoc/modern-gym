import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";

const trainers = [
  {
    id: 1,
    name: "Muzaffer Tutaş",
    title: "Personal Trainer & Vücut Geliştirme Uzmanı",
    short:
      "Vücut geliştirme, functional fitness ve kondisyon çalışmaları uzmanı.",
    description:
      "Sivas'ın önde gelen fitness eğitmenlerinden. Vücut geliştirme, functional fitness ve kondisyon çalışmalarında uzman. Transformasyonlar ve günlük antrenman videolarıyla motivasyon sağlıyor.",
    expertise: [
      "Vücut Geliştirme",
      "Functional Fitness",
      "Kondisyon Çalışmaları",
    ],
    achievements: [
      "100+ Başarılı Transformasyon",
      "Günlük Motivasyon İçerikleri",
    ],
    instagram: "muzaffertutas",
    instagramUrl: "https://instagram.com/muzaffertutas",
    image: "/trainers/muzaffer.jpg",
  },
  {
    id: 2,
    name: "Sefa Ersoy",
    title: "Certified Personal Trainer",
    short: "Fitness, kuvvet antrenmanı ve online programlar uzmanı.",
    description:
      "Personal Trainer Sefa Ersoy olarak tanınan, eğitici içerikler ve pozitif motivasyon sözleriyle öne çıkan fitness uzmanı. Spor teknikleri ve online programlar konusunda uzman.",
    expertise: ["Fitness & Kuvvet Antrenmanı", "Online Programlar", "Motivasyon Koçluğu"],
    achievements: ["Online Fitness Programları", "Eğitici İçerik Üretimi"],
    instagram: "sefaersoyofficiall",
    instagramUrl: "https://instagram.com/sefaersoyofficiall",
    image: "/trainers/sefa.jpg",
  },
];

const cardVariants = {
  rest: { borderColor: "rgba(255,255,255,0.08)" },
  hover: { borderColor: "rgba(215,255,62,0.4)" },
};

const hoverVariants = {
  rest: { opacity: 0, x: 24, pointerEvents: "none" },
  hover: { opacity: 1, x: 0, pointerEvents: "auto" },
};

const Section = styled.section`
  background: ${({ theme }) => theme.colors.bg};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
`;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  max-width: 600px;
  margin: 0 auto;
`;

const TrainersGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TrainerCard = styled(motion.div)`
  display: flex;
  align-items: stretch;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  min-height: 260px;
  position: relative;
  transition: ${({ theme }) => theme.transitions.default};

  @media (max-width: 700px) {
    flex-direction: column;
    min-height: unset;
  }
`;

const ProfileImageArea = styled.div`
  flex: 0 0 240px;
  position: relative;

  @media (max-width: 700px) {
    flex: none;
    height: 260px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoArea = styled.div`
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  @media (max-width: 700px) {
    padding: 1.75rem;
  }
`;

const BasicInfo = styled.div`
  position: relative;
  z-index: 2;

  h3,
  h4,
  p {
    margin: 0;
  }
`;

const Name = styled.h3`
  margin-bottom: 0.4rem !important;
`;

const Title = styled.h4`
  color: ${({ theme }) => theme.colors.accent};
  margin: 0 0 0.7rem 0 !important;
`;

const Short = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HoverReveal = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlayStrong};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 700px) {
    position: static;
    opacity: 1 !important;
    pointer-events: auto;
    margin-top: 1rem;
    background: transparent;
    border-left: none;
    padding: 0;
  }

  h4 {
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.accent};
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.6rem;
  }

  ul {
    margin: 0 0 1rem 0;
    padding: 0;
    list-style: none;

    li {
      color: ${({ theme }) => theme.colors.textMuted};
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
      padding-left: 1rem;
      position: relative;

      &::before {
        content: "—";
        position: absolute;
        left: 0;
        color: ${({ theme }) => theme.colors.accent};
      }
    }
  }
`;

const Description = styled.p`
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
  border-left: 2px solid ${({ theme }) => theme.colors.accent};
  padding-left: 1rem;
`;

const InstaButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 0.85rem;
  padding: 0.6rem 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  margin-top: 0.5rem;
  transition: ${({ theme }) => theme.transitions.fast};

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accentDim};
    transform: translateY(-2px);
  }
`;

const TrainersSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Section id="trainers" ref={ref}>
      <Container>
        <SectionHeader>
          <Eyebrow>— Kadromuz</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            Profesyonel eğitmenlerimiz
          </motion.h2>
          <Subtitle>Sivas Black-Fit Gym'in profesyonel eğitmen kadrosu</Subtitle>
        </SectionHeader>

        <TrainersGrid>
          {trainers.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardVariants}
            >
              <ProfileImageArea>
                <ProfileImage src={trainer.image} alt={trainer.name} />
              </ProfileImageArea>
              <InfoArea>
                <BasicInfo>
                  <Name>{trainer.name}</Name>
                  <Title>{trainer.title}</Title>
                  <Short>{trainer.short}</Short>
                </BasicInfo>
                <HoverReveal
                  variants={hoverVariants}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Description>{trainer.description}</Description>
                  <h4>Uzmanlık</h4>
                  <ul>
                    {trainer.expertise.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <InstaButton
                    href={trainer.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" />
                      <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" />
                      <path d="M17.5 6.5H17.51" />
                    </svg>
                    @{trainer.instagram}
                  </InstaButton>
                </HoverReveal>
              </InfoArea>
            </TrainerCard>
          ))}
        </TrainersGrid>
      </Container>
    </Section>
  );
};

export default TrainersSection;

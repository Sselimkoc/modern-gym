import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import { ScribbleUnderline } from "../decor/Scribble";

const trainers = [
  {
    id: 1,
    name: "Muzaffer Tutaş",
    title: "Personal Trainer & Vücut Geliştirme Uzmanı",
    description:
      "Sivas'ın önde gelen fitness eğitmenlerinden. Vücut geliştirme, functional fitness ve kondisyon çalışmalarında uzman. Transformasyonlar ve günlük antrenman videolarıyla motivasyon sağlıyor.",
    expertise: [
      "Vücut Geliştirme",
      "Functional Fitness",
      "Kondisyon Çalışmaları",
    ],
    instagram: "muzaffertutas",
    instagramUrl: "https://instagram.com/muzaffertutas",
    image: "/trainers/muzaffer.jpg",
  },
  {
    id: 2,
    name: "Sefa Ersoy",
    title: "Certified Personal Trainer",
    description:
      "Personal Trainer Sefa Ersoy olarak tanınan, eğitici içerikler ve pozitif motivasyon sözleriyle öne çıkan fitness uzmanı. Spor teknikleri ve online programlar konusunda uzman.",
    expertise: ["Fitness & Kuvvet Antrenmanı", "Online Programlar", "Motivasyon Koçluğu"],
    instagram: "sefaersoyofficiall",
    instagramUrl: "https://instagram.com/sefaersoyofficiall",
    image: "/trainers/sefa.jpg",
  },
];

const cardVariants = {
  rest: { borderColor: "rgba(255,255,255,0.08)", y: 0 },
  hover: { borderColor: "rgba(215,255,62,0.4)", y: -4 },
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

const Section = styled.section`
  background: ${({ theme }) => theme.colors.bg};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
`;

const EyebrowGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Eyebrow = styled.div`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  line-height: 1;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const EyebrowUnderline = styled(ScribbleUnderline)`
  display: block;
  width: 115px;
  height: 14px;
  margin: -6px auto 0;
  color: ${({ theme }) => theme.colors.accent};
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

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ProfileImageArea = styled.div`
  flex: 0 0 240px;
  overflow: hidden;

  @media (max-width: 700px) {
    flex: none;
    height: 260px;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  @media (max-width: 700px) {
    object-position: top;
  }
`;

const InfoArea = styled.div`
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3,
  h4,
  p {
    margin: 0;
  }

  @media (max-width: 700px) {
    padding: 1.75rem;
  }
`;

const Name = styled.h3`
  margin-bottom: 0.4rem !important;
`;

const Title = styled.h4`
  color: ${({ theme }) => theme.colors.accent};
  margin: 0 0 1rem 0 !important;
`;

const Description = styled.p`
  font-size: 0.95rem;
  margin-bottom: 1.25rem !important;
  border-left: 2px solid ${({ theme }) => theme.colors.accent};
  padding-left: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ExpertiseTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.1rem;
  margin-bottom: 1.5rem;
`;

const ExpertiseTag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textFaint};

  &::before {
    content: "— ";
    color: ${({ theme }) => theme.colors.accent};
  }
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
          <EyebrowGroup>
            <Eyebrow>— Kadromuz</Eyebrow>
            <EyebrowUnderline inView={inView} delay={0.3} />
          </EyebrowGroup>
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
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ProfileImageArea>
                <ProfileImage
                  src={trainer.image}
                  alt={trainer.name}
                  variants={imageVariants}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </ProfileImageArea>
              <InfoArea>
                <Name>{trainer.name}</Name>
                <Title>{trainer.title}</Title>
                <Description>{trainer.description}</Description>
                <ExpertiseTags>
                  {trainer.expertise.map((item) => (
                    <ExpertiseTag key={item}>{item}</ExpertiseTag>
                  ))}
                </ExpertiseTags>
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
              </InfoArea>
            </TrainerCard>
          ))}
        </TrainersGrid>
      </Container>
    </Section>
  );
};

export default TrainersSection;

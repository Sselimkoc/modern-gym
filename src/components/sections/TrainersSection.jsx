import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import { handleImgError } from "../../utils/imageFallback";

const SectionWrapper = styled.section`
  padding: 6rem 0;
  background-color: ${({ theme }) => theme.colors.light};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.9rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(22, 163, 74, 0.14);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  max-width: 600px;
  margin: 0 auto;
`;

const TrainersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
`;

const TrainerCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(22, 163, 74, 0.2);
  }
`;

const TrainerImage = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${TrainerCard}:hover & img {
    transform: scale(1.08);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.15) 60%,
      rgba(0, 0, 0, 0.05) 100%
    );
  }
`;

const CertifiedBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(57, 255, 20, 0.5);
  color: ${({ theme }) => theme.colors.neon};
  padding: 0.3rem 0.7rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.04em;

  svg {
    width: 13px;
    height: 13px;
  }
`;

const NameOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 1.25rem;
`;

const TrainerName = styled.h3`
  margin-bottom: 0.15rem;
  color: white;
  font-size: 1.2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const TrainerRole = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.neon};
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const TrainerContent = styled.div`
  padding: 1.25rem 1.5rem 1.5rem;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
`;

const Tag = styled.span`
  padding: 0.3rem 0.7rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(22, 163, 74, 0.1);
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 0.78rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const ExperienceRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.85rem;

  svg {
    width: 15px;
    height: 15px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MedalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="15" r="6" stroke="currentColor" strokeWidth="2" />
    <path
      d="M9 10.5 6 3M15 10.5 18 3M9 15l1.8 1.8L15 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const trainers = [
  {
    id: 1,
    name: "Jordan Blake",
    role: "Strength & Conditioning",
    tags: ["Powerlifting", "Mobility"],
    experience: "12 yrs experience",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Maya Torres",
    role: "HIIT & Nutrition Coach",
    tags: ["HIIT", "Nutrition"],
    experience: "8 yrs experience",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Chris Adeyemi",
    role: "Powerlifting Specialist",
    tags: ["Strength", "Form Coaching"],
    experience: "10 yrs experience",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Sofia Reyes",
    role: "Yoga & Mobility Coach",
    tags: ["Yoga", "Recovery"],
    experience: "6 yrs experience",
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const TrainersSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper id="trainers">
      <Container>
        <SectionHeader
          as={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Eyebrow>Meet the team</Eyebrow>
          <Title>Coaches Who Push You Further</Title>
          <Subtitle>
            Certified professionals who bring real experience to every session
            — not just a whistle and a stopwatch.
          </Subtitle>
        </SectionHeader>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <TrainersGrid>
            {trainers.map((trainer) => (
              <motion.div key={trainer.id} variants={itemVariants}>
                <TrainerCard>
                  <TrainerImage>
                    <img
                      src={trainer.image}
                      alt={`${trainer.name}, ${trainer.role}`}
                      onError={handleImgError}
                    />
                    <CertifiedBadge>
                      <CheckIcon />
                      Certified
                    </CertifiedBadge>
                    <NameOverlay>
                      <TrainerName>{trainer.name}</TrainerName>
                      <TrainerRole>{trainer.role}</TrainerRole>
                    </NameOverlay>
                  </TrainerImage>
                  <TrainerContent>
                    <TagRow>
                      {trainer.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </TagRow>
                    <ExperienceRow>
                      <MedalIcon />
                      {trainer.experience}
                    </ExperienceRow>
                  </TrainerContent>
                </TrainerCard>
              </motion.div>
            ))}
          </TrainersGrid>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
};

export default TrainersSection;

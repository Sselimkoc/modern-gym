import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { handleImgError } from "../../utils/imageFallback";
import useTilt from "../../hooks/useTilt";

const SectionWrapper = styled.section`
  padding: 6rem 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tab = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.colors.white : theme.colors.secondary};
  border: 2px solid
    ${({ active, theme }) =>
      active ? theme.colors.primary : theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.colors.primary : "rgba(22,163,74,0.1)"};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ active, theme }) =>
      active ? theme.colors.white : theme.colors.primary};
  }
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const levelColor = (level, theme) =>
  level === "Beginner"
    ? theme.colors.accent
    : level === "Intermediate"
    ? theme.colors.primary
    : theme.colors.neon;

const ProgramCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.35s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ level, theme }) => levelColor(level, theme)};
    z-index: 2;
  }

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  }
`;

const ProgramImage = styled.div`
  height: 260px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 1.25rem;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    z-index: 0;
  }

  ${ProgramCard}:hover & img {
    transform: scale(1.08);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.94) 0%,
      rgba(0, 0, 0, 0.4) 55%,
      rgba(0, 0, 0, 0.05) 100%
    );
    z-index: 1;
  }
`;

const ProgramImageContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const ProgramLevel = styled.span`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  border: 1px solid ${({ level, theme }) => levelColor(level, theme)};
  color: white;
  padding: 0.35rem 0.8rem 0.35rem 0.6rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  z-index: 2;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ level, theme }) => levelColor(level, theme)};
    box-shadow: 0 0 8px ${({ level, theme }) => levelColor(level, theme)};
  }
`;

const ProgramTitle = styled.h3`
  margin-bottom: 0;
  color: white;
  font-size: 1.25rem;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
`;

const ProgramContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProgramInfo = styled.div`
  flex: 1;
`;

const ProgramDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 1.25rem;
  line-height: 1.6;
`;

const ProgramDetails = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const ProgramDetail = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(22, 163, 74, 0.1);
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  svg {
    width: 15px;
    height: 15px;
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const programs = {
  all: [
    {
      id: 1,
      title: "Strength Foundations",
      description:
        "Build core strength and proper form with this foundational program.",
      image:
        "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Beginner",
      duration: "8 weeks",
      sessions: "3x per week",
    },
    {
      id: 2,
      title: "HIIT Transformation",
      description:
        "High intensity interval training for maximum calorie burn and conditioning.",
      image:
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Intermediate",
      duration: "6 weeks",
      sessions: "4x per week",
    },
    {
      id: 3,
      title: "Yoga & Mindfulness",
      description:
        "Improve flexibility, balance and mental focus with guided yoga sessions.",
      image:
        "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Beginner",
      duration: "Ongoing",
      sessions: "2-5x per week",
    },
    {
      id: 4,
      title: "Advanced Powerlifting",
      description:
        "Take your strength to elite levels with this advanced powerlifting program.",
      image:
        "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Advanced",
      duration: "12 weeks",
      sessions: "4x per week",
    },
    {
      id: 5,
      title: "Cardio Kickboxing",
      description:
        "Burn fat and learn self-defense with high-energy kickboxing workouts.",
      image:
        "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      level: "Intermediate",
      duration: "8 weeks",
      sessions: "3x per week",
    },
    {
      id: 6,
      title: "Body Transformation",
      description:
        "Complete program combining strength, cardio and nutrition for total body change.",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Intermediate",
      duration: "12 weeks",
      sessions: "5x per week",
    },
  ],
  beginner: [
    {
      id: 1,
      title: "Strength Foundations",
      description:
        "Build core strength and proper form with this foundational program.",
      image:
        "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Beginner",
      duration: "8 weeks",
      sessions: "3x per week",
    },
    {
      id: 3,
      title: "Yoga & Mindfulness",
      description:
        "Improve flexibility, balance and mental focus with guided yoga sessions.",
      image:
        "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Beginner",
      duration: "Ongoing",
      sessions: "2-5x per week",
    },
  ],
  intermediate: [
    {
      id: 2,
      title: "HIIT Transformation",
      description:
        "High intensity interval training for maximum calorie burn and conditioning.",
      image:
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Intermediate",
      duration: "6 weeks",
      sessions: "4x per week",
    },
    {
      id: 5,
      title: "Cardio Kickboxing",
      description:
        "Burn fat and learn self-defense with high-energy kickboxing workouts.",
      image:
        "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
      level: "Intermediate",
      duration: "8 weeks",
      sessions: "3x per week",
    },
    {
      id: 6,
      title: "Body Transformation",
      description:
        "Complete program combining strength, cardio and nutrition for total body change.",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Intermediate",
      duration: "12 weeks",
      sessions: "5x per week",
    },
  ],
  advanced: [
    {
      id: 4,
      title: "Advanced Powerlifting",
      description:
        "Take your strength to elite levels with this advanced powerlifting program.",
      image:
        "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Advanced",
      duration: "12 weeks",
      sessions: "4x per week",
    },
  ],
};

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 7v5l3.5 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RepeatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"
      stroke="currentColor"
      strokeWidth="2"
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

const ProgramCardItem = ({ program }) => {
  const tilt = useTilt(3);

  return (
    <motion.div
      ref={tilt.ref}
      variants={itemVariants}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.style}
    >
      <ProgramCard level={program.level}>
        <ProgramImage>
          <img src={program.image} alt={program.title} onError={handleImgError} />
          <ProgramLevel level={program.level}>{program.level}</ProgramLevel>
          <ProgramImageContent>
            <ProgramTitle>{program.title}</ProgramTitle>
          </ProgramImageContent>
        </ProgramImage>
        <ProgramContent>
          <ProgramInfo>
            <ProgramDescription>{program.description}</ProgramDescription>
          </ProgramInfo>
          <div>
            <ProgramDetails>
              <ProgramDetail>
                <ClockIcon />
                {program.duration}
              </ProgramDetail>
              <ProgramDetail>
                <RepeatIcon />
                {program.sessions}
              </ProgramDetail>
            </ProgramDetails>
            <Button fullWidth onClick={() => scrollToSection("contact")}>
              Learn More
            </Button>
          </div>
        </ProgramContent>
      </ProgramCard>
    </motion.div>
  );
};

const ProgramsSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredPrograms = programs[activeTab] || programs.all;

  return (
    <SectionWrapper id="programs" ref={ref}>
      <Container>
        <SectionHeader
          as={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Title>Our Fitness Programs</Title>
          <Subtitle>
            Discover programs tailored to your fitness level and goals. From
            beginners to advanced athletes, we have something for everyone.
          </Subtitle>
        </SectionHeader>

        <TabsContainer>
          <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
            All Programs
          </Tab>
          <Tab
            active={activeTab === "beginner"}
            onClick={() => setActiveTab("beginner")}
          >
            Beginner
          </Tab>
          <Tab
            active={activeTab === "intermediate"}
            onClick={() => setActiveTab("intermediate")}
          >
            Intermediate
          </Tab>
          <Tab
            active={activeTab === "advanced"}
            onClick={() => setActiveTab("advanced")}
          >
            Advanced
          </Tab>
        </TabsContainer>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            <ProgramsGrid key={activeTab}>
              {filteredPrograms.map((program) => (
                <ProgramCardItem key={program.id} program={program} />
              ))}
            </ProgramsGrid>
          </AnimatePresence>
        </motion.div>

        <ButtonContainer>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("membership")}
          >
            View Membership Plans
          </Button>
        </ButtonContainer>
      </Container>
    </SectionWrapper>
  );
};

export default ProgramsSection;

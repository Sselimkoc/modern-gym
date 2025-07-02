import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import Button from "../ui/Button";

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
      active ? theme.colors.primary : "rgba(255,60,95,0.08)"};
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

const ProgramCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: ${({ theme }) => theme.transitions.default};
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-5px);
  }
`;

const ProgramImage = styled.div`
  height: 220px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
    z-index: 1;
  }
`;

const ProgramLevel = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ level, theme }) =>
    level === "Beginner"
      ? theme.colors.accent
      : level === "Intermediate"
      ? theme.colors.primary
      : theme.colors.secondary};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  z-index: 1;
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

const ProgramTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ProgramDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ProgramDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ProgramDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.gray};
    margin-bottom: 0.2rem;
  }

  span:last-child {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.secondary};
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
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
        "Burn fat and learn self-defense with high-energy kickboxing workouts. Our expert trainers will guide you through proper technique while providing an intense cardio workout that builds strength and confidence.",
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
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Advanced",
      duration: "12 weeks",
      sessions: "4x per week",
    },
  ],
};

const ProgramsSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredPrograms = programs[activeTab] || programs.all;

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
    <SectionWrapper id="programs" ref={ref}>
      <Container>
        <SectionHeader>
          <Title
            as={motion.h2}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Fitness Programs
          </Title>
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
                <motion.div key={program.id} variants={itemVariants}>
                  <ProgramCard>
                    <ProgramImage>
                      <img src={program.image} alt={program.title} />
                      <ProgramLevel level={program.level}>
                        {program.level}
                      </ProgramLevel>
                    </ProgramImage>
                    <ProgramContent>
                      <ProgramInfo>
                        <ProgramTitle>{program.title}</ProgramTitle>
                        <ProgramDescription>
                          {program.description}
                        </ProgramDescription>
                      </ProgramInfo>
                      <div>
                        <ProgramDetails>
                          <ProgramDetail>
                            <span>Duration</span>
                            <span>{program.duration}</span>
                          </ProgramDetail>
                          <ProgramDetail>
                            <span>Sessions</span>
                            <span>{program.sessions}</span>
                          </ProgramDetail>
                        </ProgramDetails>
                        <Button fullWidth>Learn More</Button>
                      </div>
                    </ProgramContent>
                  </ProgramCard>
                </motion.div>
              ))}
            </ProgramsGrid>
          </AnimatePresence>
        </motion.div>

        <ButtonContainer>
          <Button variant="outline" size="lg">
            View All Programs
          </Button>
        </ButtonContainer>
      </Container>
    </SectionWrapper>
  );
};

export default ProgramsSection;

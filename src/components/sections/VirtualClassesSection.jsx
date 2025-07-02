import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import Button from "../ui/Button";

const SectionWrapper = styled.section`
  padding: 6rem 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.light};
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.light};
  margin-bottom: 1.5rem;
  font-size: clamp(2rem, 4vw, 2.5rem);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.95;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const ClassesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ClassCard = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const ClassImage = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const LiveBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  svg {
    width: 12px;
    height: 12px;
    margin-right: 0.25rem;
  }
`;

const ClassContent = styled.div`
  padding: 1.5rem;
`;

const ClassTitle = styled.h3`
  color: ${({ theme }) => theme.colors.light};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const ClassInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.9;
  font-size: 0.9rem;
  font-weight: 500;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
  }
`;

const ClassDescription = styled.p`
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.85;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ClassFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InstructorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const InstructorImage = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InstructorName = styled.span`
  color: ${({ theme }) => theme.colors.light};
  font-size: 0.9rem;
  font-weight: 500;
`;

const CTAContainer = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const virtualClasses = [
  {
    id: 1,
    title: "HIIT Cardio Blast",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
    duration: "45 min",
    level: "Intermediate",
    description:
      "High-intensity interval training to maximize calorie burn and improve cardiovascular fitness.",
    instructor: {
      name: "Alex Johnson",
      image:
        "https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
    isLive: true,
  },
  {
    id: 2,
    title: "Power Yoga Flow",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
    duration: "60 min",
    level: "All Levels",
    description:
      "Dynamic yoga sequence that builds strength, flexibility and mindfulness through flowing movements.",
    instructor: {
      name: "Sarah Chen",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
    isLive: false,
  },
  {
    id: 3,
    title: "Core & Strength",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
    duration: "30 min",
    level: "Beginner",
    description:
      "Focus on building core strength and stability with this effective and efficient workout.",
    instructor: {
      name: "Mike Torres",
      image:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
    isLive: true,
  },
];

const VirtualClassesSection = () => {
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
    hidden: { opacity: 0, y: 30 },
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
    <SectionWrapper id="virtual-classes">
      <Container>
        <ContentWrapper ref={ref}>
          <SectionHeader>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <Title>Virtual Fitness Classes</Title>
              <Subtitle>
                Train anywhere, anytime with our premium virtual classes led by
                expert instructors. Join live sessions or access our on-demand
                library with hundreds of workouts.
              </Subtitle>
            </motion.div>
          </SectionHeader>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <ClassesGrid>
              {virtualClasses.map((classItem) => (
                <ClassCard key={classItem.id} variants={itemVariants}>
                  <ClassImage>
                    <img src={classItem.image} alt={classItem.title} />
                    {classItem.isLive && (
                      <LiveBadge>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="4" fill="currentColor" />
                        </svg>
                        LIVE NOW
                      </LiveBadge>
                    )}
                  </ClassImage>
                  <ClassContent>
                    <ClassTitle>{classItem.title}</ClassTitle>
                    <ClassInfo>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
                      {classItem.duration} • {classItem.level}
                    </ClassInfo>
                    <ClassDescription>{classItem.description}</ClassDescription>
                    <ClassFooter>
                      <InstructorInfo>
                        <InstructorImage>
                          <img
                            src={classItem.instructor.image}
                            alt={classItem.instructor.name}
                          />
                        </InstructorImage>
                        <InstructorName>
                          {classItem.instructor.name}
                        </InstructorName>
                      </InstructorInfo>
                      <Button small>Join</Button>
                    </ClassFooter>
                  </ClassContent>
                </ClassCard>
              ))}
            </ClassesGrid>
          </motion.div>

          <CTAContainer>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button>Browse All Classes</Button>
            </motion.div>
          </CTAContainer>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default VirtualClassesSection;

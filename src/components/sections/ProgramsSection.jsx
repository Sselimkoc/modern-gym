import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { ScribbleUnderline } from "../decor/Scribble";

const SectionWrapper = styled.section`
  background: ${({ theme }) => theme.colors.bgElevated};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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
  width: 150px;
  height: 18px;
  margin: -6px auto 0;
  color: ${({ theme }) => theme.colors.accent};
`;

const Subtitle = styled.p`
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
  padding: 0.7rem 1.4rem;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accent : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.onAccent : theme.colors.textMuted};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.accent : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast}, color ${({ theme }) => theme.transitions.fast}, border-color ${({ theme }) => theme.transitions.fast}, transform 160ms ease-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.onAccent : theme.colors.accent};
  }

  &:active {
    transform: scale(0.97);
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
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};
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
    border-color: ${({ theme }) => theme.colors.borderStrong};
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const ProgramImage = styled.div`
  height: 200px;
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
    transition: ${({ theme }) => theme.transitions.slow};
  }

  @media (hover: hover) and (pointer: fine) {
    ${ProgramCard}:hover & img {
      transform: scale(1.08);
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(10, 10, 11, 0.8), transparent);
  }
`;

const ProgramImageContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const ProgramLevel = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  background: ${({ theme }) => theme.colors.overlayStrong};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  color: ${({ theme }) => theme.colors.accent};
  padding: 0.3rem 0.7rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 1;
`;

const ProgramContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProgramTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const ProgramDescription = styled.p`
  margin-bottom: 1.5rem;
`;

const ProgramDetails = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
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

  span:first-child {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors.textFaint};
    margin-bottom: 0.3rem;
  }

  span:last-child {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text};
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
      title: "Vücut Geliştirme Temelleri",
      description:
        "Temel güç ve doğru form geliştirmek için bu temel program ile başlayın.",
      image:
        "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Başlangıç",
      duration: "8 hafta",
      sessions: "Haftada 3x",
    },
    // {
    //   id: 2,
    //   title: "HIIT Dönüşüm",
    //   description:
    //     "Maksimum kalori yakımı ve kondisyon için yüksek yoğunluklu interval antrenman.",
    //   image:
    //     "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    //   level: "Orta",
    //   duration: "6 hafta",
    //   sessions: "Haftada 4x",
    // },
    // {
    //   id: 3,
    //   title: "Yoga & Farkındalık",
    //   description:
    //     "Rehberli yoga seansları ile esnekliği, dengeyi ve zihinsel odaklanmayı geliştirin.",
    //   image:
    //     "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    //   level: "Başlangıç",
    //   duration: "Sürekli",
    //   sessions: "Haftada 2-5x",
    // },

    {
      id: 6,
      title: "Vücut Dönüşümü",
      description:
        "Toplam vücut değişimi için güç, kardiyo ve beslenmeyi birleştiren tam program.",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Orta",
      duration: "12 hafta",
      sessions: "Haftada 5x",
    },
    {
      id: 4,
      title: "İleri Seviye Powerlifting",
      description:
        "Bu ileri seviye powerlifting programı ile gücünüzü elit seviyelere çıkarın.",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "İleri",
      duration: "12 hafta",
      sessions: "Haftada 4x",
    },
  ],
  beginner: [
    {
      id: 1,
      title: "Vücut Geliştirme Temelleri",
      description:
        "Temel güç ve doğru form geliştirmek için bu temel program ile başlayın.",
      image:
        "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Başlangıç",
      duration: "8 hafta",
      sessions: "Haftada 3x",
    },
    {
      id: 3,
      title: "Yoga & Farkındalık",
      description:
        "Rehberli yoga seansları ile esnekliği, dengeyi ve zihinsel odaklanmayı geliştirin.",
      image:
        "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Başlangıç",
      duration: "Sürekli",
      sessions: "Haftada 2-5x",
    },
  ],
  intermediate: [
    {
      id: 2,
      title: "HIIT Dönüşüm",
      description:
        "Maksimum kalori yakımı ve kondisyon için yüksek yoğunluklu interval antrenman.",
      image:
        "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Orta",
      duration: "6 hafta",
      sessions: "Haftada 4x",
    },
    {
      id: 5,
      title: "Kardiyo Kickboxing",
      description:
        "Yüksek enerjili kickboxing antrenmanları ile yağ yakın ve kendini savunma öğrenin. Uzman eğitmenlerimiz size doğru tekniği öğretirken güç ve güven oluşturan yoğun bir kardiyo antrenmanı sağlayacak.",
      image:
        "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Orta",
      duration: "8 hafta",
      sessions: "Haftada 3x",
    },
    {
      id: 6,
      title: "Vücut Dönüşümü",
      description:
        "Toplam vücut değişimi için güç, kardiyo ve beslenmeyi birleştiren tam program.",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "Orta",
      duration: "12 hafta",
      sessions: "Haftada 5x",
    },
  ],
  advanced: [
    {
      id: 4,
      title: "İleri Seviye Powerlifting",
      description:
        "Bu ileri seviye powerlifting programı ile gücünüzü elit seviyelere çıkarın.",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      level: "İleri",
      duration: "12 hafta",
      sessions: "Haftada 4x",
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
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const filteredPrograms = programs[activeTab] || programs.all;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <SectionWrapper id="programs" ref={ref}>
      <Container>
        <SectionHeader>
          <EyebrowGroup>
            <Eyebrow>— Programlar</Eyebrow>
            <EyebrowUnderline inView={inView} delay={0.3} />
          </EyebrowGroup>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Fitness programlarımız
          </motion.h2>
          <Subtitle>
            Her seviyeye uygun programlarımızla hedeflerinize ulaşın
          </Subtitle>
        </SectionHeader>

        <TabsContainer>
          <Tab $active={activeTab === "all"} onClick={() => setActiveTab("all")}>
            Tümü
          </Tab>
          <Tab
            $active={activeTab === "beginner"}
            onClick={() => setActiveTab("beginner")}
          >
            Başlangıç
          </Tab>
          <Tab
            $active={activeTab === "intermediate"}
            onClick={() => setActiveTab("intermediate")}
          >
            Orta
          </Tab>
          <Tab
            $active={activeTab === "advanced"}
            onClick={() => setActiveTab("advanced")}
          >
            İleri
          </Tab>
        </TabsContainer>

        <motion.div
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
                      <ProgramLevel>{program.level}</ProgramLevel>
                    </ProgramImage>
                    <ProgramContent>
                      <div>
                        <ProgramTitle>{program.title}</ProgramTitle>
                        <ProgramDescription>
                          {program.description}
                        </ProgramDescription>
                      </div>
                      <div>
                        <ProgramDetails>
                          <ProgramDetail>
                            <span>Süre</span>
                            <span>{program.duration}</span>
                          </ProgramDetail>
                          <ProgramDetail>
                            <span>Seans</span>
                            <span>{program.sessions}</span>
                          </ProgramDetail>
                        </ProgramDetails>
                        <Button fullWidth variant="outline">
                          Daha Fazla Bilgi
                        </Button>
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
            Tüm Programları Görüntüle
          </Button>
        </ButtonContainer>
      </Container>
    </SectionWrapper>
  );
};

export default ProgramsSection;

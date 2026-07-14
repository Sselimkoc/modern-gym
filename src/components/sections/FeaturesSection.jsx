import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import siteConfig from "../../data/siteConfig";
import { handleImgError } from "../../utils/imageFallback";

const SectionWrapper = styled.section`
  padding: 6rem 0;
  background-color: ${({ theme }) => theme.colors.light};
  position: relative;
  overflow: hidden;
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

/* ---------------------------------- Bento grid ---------------------------------- */

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(190px, auto);
  grid-template-areas:
    "hero hero a b"
    "hero hero c d"
    "banner banner banner banner";
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "hero hero"
      "a b"
      "c d"
      "banner banner";
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "hero"
      "a"
      "b"
      "c"
      "d"
      "banner";
  }
`;

const tileArea = (name) => `
  grid-area: ${name};
`;

/* Hero tile — real training photo, not another icon box */
const HeroTile = styled(motion.div)`
  ${tileArea("hero")}
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  overflow: hidden;
  min-height: 320px;
  isolation: isolate;
  transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.35s ease;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.06);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      190deg,
      rgba(0, 0, 0, 0.1) 20%,
      rgba(0, 0, 0, 0.95) 100%
    );
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  color: white;
`;

const HeroBadge = styled.span`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(57, 255, 20, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: ${({ theme }) => theme.colors.neon};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow: 0 0 12px rgba(57, 255, 20, 0.6);
`;

const HeroTitle = styled.h3`
  font-size: clamp(1.4rem, 2.4vw, 1.9rem);
  margin-bottom: 0.5rem;
  color: white;
`;

const HeroText = styled.p`
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.6;
  max-width: 420px;
  margin-bottom: 0;
`;

/* Small icon tiles */
const IconTile = styled(motion.div)`
  ${({ $area }) => tileArea($area)}
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.85rem;
  padding: 1.75rem;
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 36px rgba(22, 163, 74, 0.2);
    border-color: rgba(57, 255, 20, 0.4);
  }
`;

const GhostIndex = styled.span`
  position: absolute;
  top: -0.5rem;
  right: 0.5rem;
  font-size: 4.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.05;
  line-height: 1;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${IconTile}:hover & {
    opacity: 0.09;
    transform: scale(1.08);
  }
`;

const IconBadge = styled.div`
  width: 52px;
  height: 52px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ $alt, theme }) =>
    $alt ? theme.colors.accent : theme.colors.gradientPrimary};
  box-shadow: ${({ $alt }) =>
    $alt
      ? "0 8px 20px rgba(255, 255, 255, 0.5)"
      : "0 8px 16px rgba(57, 255, 20, 0.4)"};
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  svg {
    width: 24px;
    height: 24px;
    color: ${({ $alt, theme }) =>
      $alt ? theme.colors.secondary : theme.colors.white};
  }

  ${IconTile}:hover & {
    transform: rotate(-8deg) scale(1.08);
  }
`;

const TileTitle = styled.h4`
  margin: 0;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.secondary};
  position: relative;
  z-index: 1;
`;

const TileDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.gray};
  position: relative;
  z-index: 1;
`;

/* Wide banner tile */
const BannerTile = styled(motion.div)`
  ${tileArea("banner")}
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  background: ${({ theme }) => theme.colors.gradientDark};
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }

  &::before {
    content: "";
    position: absolute;
    top: -60%;
    right: -8%;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.neon};
    opacity: 0.16;
    filter: blur(30px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const BannerIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  svg {
    width: 28px;
    height: 28px;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const BannerText = styled.div`
  position: relative;
  z-index: 1;

  h4 {
    margin: 0 0 0.3rem;
    color: white;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

/* ---------------------------------- Stats strip ---------------------------------- */

const StatsStrip = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.25rem 1.4rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(22, 163, 74, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const StatNumber = styled.span`
  display: block;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.1;
`;

const StatLabel = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 0.15rem;
`;

/* ---------------------------------- Icons ---------------------------------- */

const EquipmentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.5 6.5H17.5V17.5H6.5V6.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 21V13.5H6.5M2 10.5V3H6.5M17.5 21V17.5H22V13.5H17.5M22 10.5V3H17.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrainerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClassesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 4L21 7L18 10M6 20L3 17L6 14M21 7H9C7.93913 7 6.92172 7.42143 6.17157 8.17157C5.42143 8.92172 5 9.93913 5 11V13M3 17H15C16.0609 17 17.0783 16.5786 17.8284 15.8284C18.5786 15.0783 19 14.0609 19 13V11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NoContractIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NutritionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.25 6.375C20.25 8.65317 16.5563 10.5 12 10.5C7.44365 10.5 3.75 8.65317 3.75 6.375M20.25 6.375C20.25 4.09683 16.5563 2.25 12 2.25C7.44365 2.25 3.75 4.09683 3.75 6.375M20.25 6.375V17.625C20.25 19.9032 16.5563 21.75 12 21.75C7.44365 21.75 3.75 19.9032 3.75 17.625V6.375M20.25 12C20.25 14.2782 16.5563 16.125 12 16.125C7.44365 16.125 3.75 14.2782 3.75 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2s-5 5.5-5 10a5 5 0 0 0 10 0c0-1.4-.6-2.6-1.4-3.6.2 1-.2 2-1 2.4C15.2 8.8 14 6 12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------------------------------- Content ---------------------------------- */

const heroFeature = {
  title: "Quality Equipment, Built to Keep Up",
  description:
    "Full free-weight racks, plate-loaded machines and turf sled lanes maintained daily so your training never gets interrupted.",
  image:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
};

const tiles = [
  {
    area: "a",
    icon: <TrainerIcon />,
    title: "Expert Trainers",
    description: "Certified coaches who build a plan around your goals.",
  },
  {
    area: "b",
    icon: <ClassesIcon />,
    title: "Diverse Classes",
    description: "From HIIT to mindful yoga, for every fitness level.",
    alt: true,
  },
  {
    area: "c",
    icon: <NoContractIcon />,
    title: "No Long-Term Contracts",
    description: "Free trial week. Cancel anytime, no hidden fees.",
    alt: true,
  },
  {
    area: "d",
    icon: <NutritionIcon />,
    title: "Nutrition Guidance",
    description: "Personalized plans that complement your training.",
  },
];

const bannerFeature = {
  icon: <EquipmentIcon />,
  title: "Clean & Safe Facility",
  description:
    "Equipment sanitized daily and well-maintained spaces so you can focus on the lift, not the wipe-down.",
};

const stats = [
  { icon: <UsersIcon />, number: "1,200+", label: "Active members" },
  { icon: <MedalIcon />, number: "15+", label: "Certified coaches" },
  { icon: <CalendarIcon />, number: "50+", label: "Weekly classes" },
  { icon: <FlameIcon />, number: "10", label: "Years strong" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <SectionWrapper id="features">
      <Container>
        <SectionHeader
          as={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Eyebrow>Built for real training</Eyebrow>
          <Title>Why Choose {siteConfig.name}</Title>
          <Subtitle>
            We offer more than just a place to work out. Experience a complete
            fitness ecosystem designed for your success.
          </Subtitle>
        </SectionHeader>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <BentoGrid>
            <HeroTile variants={itemVariants}>
              <img
                src={heroFeature.image}
                alt="Member training with free weights on the gym floor"
                onError={handleImgError}
              />
              <HeroContent>
                <HeroBadge>
                  <FlameIcon />
                  Since day one
                </HeroBadge>
                <HeroTitle>{heroFeature.title}</HeroTitle>
                <HeroText>{heroFeature.description}</HeroText>
              </HeroContent>
            </HeroTile>

            {tiles.map((tile, index) => (
              <IconTile key={tile.area} $area={tile.area} variants={itemVariants}>
                <GhostIndex>{String(index + 1).padStart(2, "0")}</GhostIndex>
                <IconBadge $alt={tile.alt}>{tile.icon}</IconBadge>
                <TileTitle>{tile.title}</TileTitle>
                <TileDescription>{tile.description}</TileDescription>
              </IconTile>
            ))}

            <BannerTile variants={itemVariants}>
              <BannerIcon>{bannerFeature.icon}</BannerIcon>
              <BannerText>
                <h4>{bannerFeature.title}</h4>
                <p>{bannerFeature.description}</p>
              </BannerText>
            </BannerTile>
          </BentoGrid>

          <StatsStrip variants={itemVariants}>
            {stats.map((stat) => (
              <StatCard key={stat.label} variants={itemVariants}>
                <StatIcon>{stat.icon}</StatIcon>
                <div>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </div>
              </StatCard>
            ))}
          </StatsStrip>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
};

export default FeaturesSection;

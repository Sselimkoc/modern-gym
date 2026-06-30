import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GymHero from "../components/common/GymHero";
import GymServices from "../components/common/GymServices";
import ContactSection from "../components/common/ContactSection";
import Container from "../components/ui/Container";
import ImageGallery from "../components/ui/ImageGallery";
import ReviewCard from "../components/ui/ReviewCard";
import Button from "../components/ui/Button";
import gymsData from "../data/gyms.json";

const BackNavigation = styled.div`
  padding: ${({ theme }) => `${theme.space.lg} 0`};
  background: ${({ theme }) => theme.colors.light};
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateX(-4px);
  }
`;

const NotFoundSection = styled.section`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.light};
`;

const NotFoundContent = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.space.xl};
`;

const NotFoundTitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const NotFoundText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const Section = styled.section`
  padding: ${({ theme }) => `${theme.space.xl} 0`};

  &:nth-child(odd) {
    background: ${({ theme }) => theme.colors.light};
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.xl};
  color: ${({ theme }) => theme.colors.dark};
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  position: relative;
  padding-bottom: ${({ theme }) => theme.space.lg};

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ff3c5f, #00e6b8);
    border-radius: 2px;
  }
`;

const AboutSection = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const AboutText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.space.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialItem = styled(motion.div)``;

const StatsSection = styled.section`
  background: linear-gradient(135deg, #ff3c5f 0%, #1e2a38 100%);
  padding: ${({ theme }) => `${theme.space.xl} 0`};
  color: white;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>') repeat;
    opacity: 0.1;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.space.lg};
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.space.md};
  }
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.space.lg};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatNumber = styled.div`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  margin-bottom: ${({ theme }) => theme.space.sm};
  background: linear-gradient(135deg, #00e6b8 0%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const GymDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const gym = useMemo(() => gymsData.find((g) => g.slug === slug), [slug]);

  if (!gym) {
    return (
      <div>
        <Navbar />
        <NotFoundSection>
          <NotFoundContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NotFoundTitle>🏋️ Gym Not Found</NotFoundTitle>
            <NotFoundText>The gym you're looking for doesn't exist.</NotFoundText>
            <Button size="lg" onClick={() => navigate("/gyms")}>
              ← Back to Gyms
            </Button>
          </NotFoundContent>
        </NotFoundSection>
        <Footer />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <GymHero
        image={gym.heroImage}
        title={gym.name}
        subtitle={gym.tagline}
        gymColor={`linear-gradient(135deg, ${gym.primaryColor}dd 0%, ${gym.secondaryColor}dd 100%)`}
      />

      {/* Back Navigation */}
      <BackNavigation>
        <Container>
          <BackButton
            onClick={() => navigate("/gyms")}
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
          >
            ← Back to Gyms
          </BackButton>
        </Container>
      </BackNavigation>

      {/* About Section */}
      <Section>
        <Container>
          <AboutSection
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionTitle>About {gym.name}</SectionTitle>
            <AboutText>{gym.description_full}</AboutText>
          </AboutSection>
        </Container>
      </Section>

      {/* Stats Section */}
      <StatsSection>
        <Container>
          <StatsGrid
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <StatCard variants={itemVariants}>
              <StatNumber>{gym.services.length}+</StatNumber>
              <StatLabel>Services</StatLabel>
            </StatCard>
            <StatCard variants={itemVariants}>
              <StatNumber>{gym.testimonials?.length || 0}k</StatNumber>
              <StatLabel>Happy Members</StatLabel>
            </StatCard>
            <StatCard variants={itemVariants}>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Support</StatLabel>
            </StatCard>
            <StatCard variants={itemVariants}>
              <StatNumber>⭐5.0</StatNumber>
              <StatLabel>Rating</StatLabel>
            </StatCard>
          </StatsGrid>
        </Container>
      </StatsSection>

      {/* Services */}
      <GymServices services={gym.services} />

      {/* Gallery */}
      <Section>
        <Container>
          <SectionTitle>Our Facility</SectionTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ImageGallery images={gym.images} alt={gym.name} />
          </motion.div>
        </Container>
      </Section>

      {/* Testimonials */}
      {gym.testimonials && gym.testimonials.length > 0 && (
        <Section>
          <Container>
            <SectionTitle>Member Reviews</SectionTitle>
            <TestimonialsGrid
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {gym.testimonials.map((testimonial, index) => (
                <TestimonialItem key={index} variants={itemVariants}>
                  <ReviewCard
                    name={testimonial.name}
                    role={testimonial.role}
                    text={testimonial.text}
                    rating={testimonial.rating}
                    avatar={testimonial.avatar}
                  />
                </TestimonialItem>
              ))}
            </TestimonialsGrid>
          </Container>
        </Section>
      )}

      {/* Contact */}
      <ContactSection
        phone={gym.phone}
        email={gym.email}
        address={gym.address}
        hours={gym.hours}
      />

      <Footer />
    </div>
  );
};

export default GymDetailPage;
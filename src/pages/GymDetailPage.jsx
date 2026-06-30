import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GymHero from "../components/common/GymHero";
import GymServices from "../components/common/GymServices";
import ContactSection from "../components/common/ContactSection";
import Container from "../components/ui/Container";
import ImageGallery from "../components/ui/ImageGallery";
import ReviewCard from "../components/ui/ReviewCard";
import gymsData from "../data/gyms.json";
import { motion } from "framer-motion";

const NotFound = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space.xl};
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BackButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.space.lg};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
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
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.space.lg};
`;

const GymDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const gym = useMemo(() => gymsData.find((g) => g.slug === slug), [slug]);

  if (!gym) {
    return (
      <div>
        <Navbar />
        <NotFound>
          <h2>Gym Not Found</h2>
          <p>The gym you're looking for doesn't exist.</p>
          <BackButton onClick={() => navigate("/")}>Back to Home</BackButton>
        </NotFound>
        <Footer />
      </div>
    );
  }

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

      {/* Description */}
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>About Us</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
              {gym.description_full}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Services */}
      <GymServices services={gym.services} />

      {/* Gallery */}
      <Section>
        <Container>
          <SectionTitle>Our Facility</SectionTitle>
          <ImageGallery images={gym.images} alt={gym.name} />
        </Container>
      </Section>

      {/* Testimonials */}
      {gym.testimonials && gym.testimonials.length > 0 && (
        <Section>
          <Container>
            <SectionTitle>Member Reviews</SectionTitle>
            <TestimonialsGrid>
              {gym.testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ReviewCard
                    name={testimonial.name}
                    role={testimonial.role}
                    text={testimonial.text}
                    rating={testimonial.rating}
                    avatar={testimonial.avatar}
                  />
                </motion.div>
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

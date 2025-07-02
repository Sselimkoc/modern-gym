import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";

const SectionWrapper = styled.section`
  padding: 6rem 0;
  background-color: ${({ theme }) => theme.colors.light};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -150px;
    left: -150px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.05;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.05;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1.5rem;
  font-size: clamp(2rem, 4vw, 2.5rem);
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 0;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const TestimonialsContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1000px;
  margin: 0 auto;
`;

const TestimonialSlider = styled.div`
  position: relative;
  overflow: hidden;
  height: 400px; /* Set a fixed height for the slider */

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 450px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 500px;
  }
`;

const TestimonialSlide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

const TestimonialContent = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  &::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 5rem;
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.2;
    font-family: Georgia, serif;
    line-height: 1;
  }
`;

const TestimonialText = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthorImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  border: 3px solid ${({ theme }) => theme.colors.accent};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div`
  text-align: left;
`;

const AuthorName = styled.h4`
  margin: 0 0 0.25rem 0;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.1rem;
`;

const AuthorTitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const SliderDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.accent : "rgba(0, 0, 0, 0.1)"};
  border: none;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.colors.accent : "rgba(0, 0, 0, 0.2)"};
    transform: scale(1.2);
  }

  &:focus {
    outline: none;
  }
`;

const testimonials = [
  {
    id: 1,
    text: "I've been a member for over a year now, and the transformation in my fitness level is incredible. The trainers are knowledgeable and supportive, and the facilities are always clean and well-maintained. The virtual classes have been a game-changer for my busy schedule!",
    author: {
      name: "Emily Rodriguez",
      title: "Member since 2022",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
  },
  {
    id: 2,
    text: "As someone who was intimidated by gyms, the welcoming atmosphere here made all the difference. The staff took time to create a personalized plan for me, and the community is so supportive. I've lost 30 pounds and gained confidence I never thought possible!",
    author: {
      name: "Marcus Johnson",
      title: "Member since 2021",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
  },
  {
    id: 3,
    text: "The spa and wellness services are exceptional. After intense workouts, being able to recover with professional massage therapy and wellness treatments has improved my performance and overall well-being. This isn't just a gym, it's a complete fitness experience.",
    author: {
      name: "Sophia Chen",
      title: "Premium Member",
      image:
        "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
  },
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SectionWrapper id="testimonials">
      <Container>
        <SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <Title>What Our Members Say</Title>
            <Subtitle>
              Don't just take our word for it. Hear from our community of
              members who have transformed their lives with us.
            </Subtitle>
          </motion.div>
        </SectionHeader>

        <TestimonialsContainer ref={ref}>
          <TestimonialSlider>
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  currentSlide === index && (
                    <TestimonialSlide
                      key={testimonial.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <TestimonialContent>
                        <TestimonialText>{testimonial.text}</TestimonialText>
                        <TestimonialAuthor>
                          <AuthorImage>
                            <img
                              src={testimonial.author.image}
                              alt={testimonial.author.name}
                            />
                          </AuthorImage>
                          <AuthorInfo>
                            <AuthorName>{testimonial.author.name}</AuthorName>
                            <AuthorTitle>
                              {testimonial.author.title}
                            </AuthorTitle>
                          </AuthorInfo>
                        </TestimonialAuthor>
                      </TestimonialContent>
                    </TestimonialSlide>
                  )
              )}
            </AnimatePresence>
          </TestimonialSlider>

          <SliderControls>
            {testimonials.map((_, index) => (
              <SliderDot
                key={index}
                active={currentSlide === index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </SliderControls>
        </TestimonialsContainer>
      </Container>
    </SectionWrapper>
  );
};

export default TestimonialsSection;

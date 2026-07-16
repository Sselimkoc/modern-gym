import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import { handleImgError } from "../../utils/imageFallback";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const SectionWrapper = styled.section`
  padding: 6rem 0;
  background-color: ${({ theme }) => theme.colors.light};
  position: relative;
  overflow: hidden;
`;

const CircleTopLeft = styled(motion.div)`
  position: absolute;
  top: -150px;
  left: -150px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  opacity: 0.08;
  pointer-events: none;
`;

const CircleBottomRight = styled(motion.div)`
  position: absolute;
  bottom: -100px;
  right: -100px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.08;
  pointer-events: none;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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

const RatingSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const RatingScore = styled.span`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  color: ${({ theme }) => theme.colors.secondary};
`;

const RatingMeta = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.95rem;
`;

const StarsWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 2px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const StarIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={filled ? "#FBBC04" : "none"}
      stroke={filled ? "#FBBC04" : "#D0D0D0"}
      strokeWidth="1.5"
    />
  </svg>
);

const StarRow = ({ rating = 5 }) => (
  <StarsWrapper>
    {[1, 2, 3, 4, 5].map((i) => (
      <StarIcon key={i} filled={i <= rating} />
    ))}
  </StarsWrapper>
);

// "G" logo — standard four-color Google mark, used to signal these are
// (placeholder) Google reviews. Swap for the real Google Business Profile
// review feed once the listing is claimed (see comment near `testimonials`).
const GoogleLogo = ({ size = 18 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

const TestimonialsContainer = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialContent = styled(motion.div)`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: left;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }

  &::before {
    content: "\\201C";
    position: absolute;
    top: -1.5rem;
    right: 1rem;
    font-size: 9rem;
    font-family: Georgia, serif;
    font-weight: 700;
    line-height: 1;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.06;
    pointer-events: none;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const AuthorImage = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const AuthorName = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.05rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.3rem;
`;

const DateText = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.85rem;
`;

const TestimonialText = styled.p`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0;
  flex: 1;
`;

const ReviewPhoto = styled.img`
  display: block;
  margin-top: 1.25rem;
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

// Placeholder review data styled to look like a Google Business Profile
// review feed. Once the gym's real Google listing exists, replace this
// array with a live pull from the Google Places API (or an embed widget)
// instead of hand-written entries.
const testimonials = [
  {
    id: 1,
    text: "I've been a member for over a year now, and the transformation in my fitness level is incredible. The trainers are knowledgeable and supportive, and the facilities are always clean and well-maintained. The mobile app makes booking classes so easy!",
    rating: 5,
    date: "2 weeks ago",
    photo:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    author: {
      name: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
  },
  {
    id: 2,
    text: "As someone who was intimidated by gyms, the welcoming atmosphere here made all the difference. The staff took time to create a personalized plan for me, and the community is so supportive. I've lost 30 pounds and gained confidence I never thought possible!",
    rating: 5,
    date: "1 month ago",
    author: {
      name: "Marcus Johnson",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
  },
  {
    id: 3,
    text: "The spa and wellness services are exceptional. After intense workouts, being able to recover with professional massage therapy and wellness treatments has improved my performance and overall well-being. This isn't just a gym, it's a complete fitness experience.",
    rating: 4,
    date: "1 month ago",
    photo:
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    author: {
      name: "Sophia Chen",
      image:
        "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
  },
];

const AVERAGE_RATING = (
  testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
).toFixed(1);

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.12 },
  }),
};

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const sectionRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const circle1Y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-40, 40]
  );
  const circle2Y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [40, -40]
  );

  return (
    <SectionWrapper id="testimonials" ref={sectionRef}>
      <CircleTopLeft style={{ y: circle1Y }} />
      <CircleBottomRight style={{ y: circle2Y }} />
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
            <RatingSummary>
              <GoogleLogo />
              <RatingScore>{AVERAGE_RATING}</RatingScore>
              <StarRow rating={Math.round(AVERAGE_RATING)} />
              <RatingMeta>· {testimonials.length} Google reviews</RatingMeta>
            </RatingSummary>
          </motion.div>
        </SectionHeader>

        <TestimonialsContainer ref={ref}>
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialContent
                key={testimonial.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <CardHeader>
                  <AuthorImage>
                    <img
                      src={testimonial.author.image}
                      alt={testimonial.author.name}
                      onError={handleImgError}
                    />
                  </AuthorImage>
                  <AuthorInfo>
                    <AuthorTopRow>
                      <AuthorName>{testimonial.author.name}</AuthorName>
                      <GoogleLogo size={16} />
                    </AuthorTopRow>
                    <MetaRow>
                      <StarRow rating={testimonial.rating} />
                      <DateText>{testimonial.date}</DateText>
                    </MetaRow>
                  </AuthorInfo>
                </CardHeader>
                <TestimonialText>{testimonial.text}</TestimonialText>
                {testimonial.photo && (
                  <ReviewPhoto
                    src={testimonial.photo}
                    alt={`Photo shared by ${testimonial.author.name}`}
                    onError={handleImgError}
                  />
                )}
              </TestimonialContent>
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
      </Container>
    </SectionWrapper>
  );
};

export default TestimonialsSection;

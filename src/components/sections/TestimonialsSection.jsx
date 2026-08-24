import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import RatingBadge from "../ui/RatingBadge";
import { ScribbleUnderline } from "../decor/Scribble";

const SectionWrapper = styled.section`
  background: ${({ theme }) => theme.colors.bgElevated};
  position: relative;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
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
  width: 105px;
  height: 13px;
  margin: -6px auto 0;
  color: ${({ theme }) => theme.colors.accent};
`;

const Subtitle = styled.p`
  margin: 0 auto 1.5rem;
  max-width: 600px;
`;

const RatingRow = styled.div`
  display: flex;
  justify-content: center;
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
  max-width: 800px;
  margin: 0 auto;
`;

const TestimonialSlider = styled.div`
  position: relative;
  min-height: 320px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 380px;
  }
`;

const TestimonialSlide = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TestimonialContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2.5rem;
  text-align: center;
  position: relative;
  width: 100%;

  &::before {
    content: "\\201C";
    position: absolute;
    top: 0.5rem;
    left: 1.5rem;
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.3;
    font-family: ${({ theme }) => theme.fonts.display};
    line-height: 1;
    color: ${({ theme }) => theme.colors.primary};
    opacity: 0.06;
    pointer-events: none;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const TestimonialAuthor = styled.div`
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
  margin-right: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.accent};

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
  margin: 0 0 0.15rem 0 !important;
`;

const AuthorTitle = styled.p`
  margin: 0 !important;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.3rem;
`;

const SliderDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.accent : theme.colors.border};
  border: none;
  margin: 0 0.4rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
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
    text: "Black-Fit'e katıldıktan sonra hayatım tamamen değişti. Profesyonel eğitmenler sayesinde 6 ayda 20 kilo verdim ve kas kütlem arttı. Artık kendimi çok daha güçlü ve enerjik hissediyorum. Herkese tavsiye ederim!",
    author: {
      name: "Ahmet Yılmaz",
      title: "2022'den beri üye",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  },
  {
    id: 2,
    text: "Spor salonlarından korkan biri olarak, buradaki sıcak atmosfer her şeyi değiştirdi. Personel benim için kişiselleştirilmiş bir plan oluşturmak için zaman ayırdı ve topluluk çok destekleyici. 30 kilo verdim ve hiç düşünmediğim bir güven kazandım!",
    author: {
      name: "Mehmet Kaya",
      title: "2021'den beri üye",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  },
  {
    id: 3,
    text: "CrossFit antrenmanları ve grup dersleri harika! Muzaffer hocam sayesinde hem güçlendim hem de eğlenceli vakit geçirdim. Artık her gün spor yapmak için sabırsızlanıyorum. Black-Fit ailesine teşekkürler!",
    author: {
      name: "Fatma Özkan",
      title: "Premium üye",
      image:
        "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  },
  {
    id: 4,
    text: "Sefa hocamın beslenme danışmanlığı sayesinde hedeflerime ulaştım. Hem antrenman hem de beslenme konusunda çok bilgilendim. Artık sağlıklı yaşam tarzımı sürdürüyorum. Black-Fit gerçekten fark yaratıyor!",
    author: {
      name: "Zeynep Demir",
      title: "2023'ten beri üye",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
            <EyebrowGroup>
              <Eyebrow>— Yorumlar</Eyebrow>
              <EyebrowUnderline inView={inView} delay={0.3} />
            </EyebrowGroup>
            <h2>Üyelerimiz ne diyor</h2>
            <Subtitle>
              Sadece bizim sözümüze güvenmeyin. Bizimle hayatlarını değiştiren
              üyelerimizin topluluğundan dinleyin.
            </Subtitle>
            <RatingRow>
              <RatingBadge rating="4.9" reviews="49" />
            </RatingRow>
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
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.4 }}
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
                            <AuthorTitle>{testimonial.author.title}</AuthorTitle>
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
                $active={currentSlide === index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`${index + 1}. yoruma git`}
              />
            ))}
          </TestimonialsGrid>
        </TestimonialsContainer>
      </Container>
    </SectionWrapper>
  );
};

export default TestimonialsSection;

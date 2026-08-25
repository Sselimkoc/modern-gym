import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
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

const TestimonialsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TestimonialSlider = styled(motion.div)`
  position: relative;
  overflow: hidden;
`;

const TestimonialSlide = styled(motion.div)`
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
    content: '"';
    position: absolute;
    top: 0.5rem;
    left: 1.5rem;
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.3;
    font-family: ${({ theme }) => theme.fonts.display};
    line-height: 1;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  text-align: left;
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

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
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
    <SectionWrapper id="testimonials">
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
          <TestimonialSlider layout transition={{ layout: { duration: 0.4 } }}>
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
                            <AuthorTitle>
                              {testimonial.author.title}
                            </AuthorTitle>
                          </AuthorInfo>
                        </TestimonialAuthor>
                      </TestimonialContent>
                    </TestimonialSlide>
                  ),
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
          </SliderControls>
        </TestimonialsContainer>
      </Container>
    </SectionWrapper>
  );
};

export default TestimonialsSection;

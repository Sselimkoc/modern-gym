import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import { ScribbleUnderline } from "../decor/Scribble";

const SectionWrapper = styled.section`
  background: ${({ theme }) => theme.colors.bg};
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 4rem;
  max-width: 640px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 720px;
  }
`;

const EyebrowGroup = styled.div``;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  line-height: 1;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const EyebrowUnderline = styled(ScribbleUnderline)`
  width: 175px;
  height: 20px;
  margin: -4px 0 0;
  color: ${({ theme }) => theme.colors.accent};
`;

const Title = styled.h2`
  margin-bottom: 0;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  max-width: 560px;
  margin-bottom: 0;
`;

const FeatureList = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FeatureRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 0.3rem;
  padding: 2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    padding-left: 0.5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 6rem 1fr 1fr;
    align-items: baseline;
  }
`;

const Index = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textFaint};
  transition: ${({ theme }) => theme.transitions.default};

  ${FeatureRow}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const FeatureTitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 0;
`;

const FeatureTag = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const FeatureDescription = styled.p`
  grid-column: 1 / -1;
  margin: 0.75rem 0 0;
  max-width: 480px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: auto;
    margin-top: 0;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const features = [
  {
    title: "Kadın ve erkeğe özel çalışma alanları",
    description:
      "Kadın ve erkek üyelerimiz için ayrı çalışma alanları sunuyoruz, herkes kendini rahat hissettiği ortamda antrenman yapar.",
    tag: "Ayrı Alan",
  },
  {
    title: "Son teknoloji ekipmanlar",
    description:
      "En son fitness teknolojisi ve premium ekipmanlarla optimal antrenman sonuçları elde edin. Her ekipman düzenli olarak bakımdan geçirilir.",
    tag: "Premium",
  },
  {
    title: "Uzman eğitmenler",
    description:
      "Sertifikalı fitness uzmanlarıyla kişiselleştirilmiş dikkatle yolculuğunuzu yönlendirin. Her eğitmen minimum 5 yıl deneyime sahiptir.",
    tag: "Uzman",
  },
  {
    title: "Çeşitli dersler",
    description:
      "Farklı seviyelerde ve tarzlarda çeşitli grup dersleriyle fitness deneyiminizi zenginleştirin. Günlük 20+ farklı ders seçeneği.",
    tag: "Çeşitli",
  },
  {
    title: "Kişisel antrenman",
    description:
      "Hedeflerinize özel tasarlanmış kişisel antrenman programlarıyla maksimum sonuç alın. İlk seans ücretsizdir.",
    tag: "Kişisel",
  },
  {
    title: "Beslenme danışmanlığı",
    description:
      "Uzman beslenme danışmanlarıyla sağlıklı yaşam hedeflerinize ulaşın. Kişiye özel beslenme planları hazırlanır.",
    tag: "Sağlık",
  },
  {
    title: "Geniş çalışma saatleri",
    description:
      "Hafta içi 06:00–23:00, hafta sonu 08:00–22:00 saatleri arasında açığız; erken sabah ya da akşam antrenmanı fark etmez.",
    tag: "06–23",
  },
];

const FeaturesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <SectionWrapper id="features">
      <Container>
        <Header ref={headerRef}>
          <EyebrowGroup>
            <Eyebrow>— Neden Black-Fit</Eyebrow>
            <EyebrowUnderline inView={headerInView} />
          </EyebrowGroup>
          <Title>Bir dönüşüm için ihtiyacın olan her şey</Title>
          <Subtitle>
            Sivas'ın en kapsamlı spor merkezinde hedeflerinize ulaşın. Modern
            ekipmanlar, uzman eğitmenler ve kişiselleştirilmiş programlarla
            fitness yolculuğunuzda yanınızdayız.
          </Subtitle>
        </Header>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <FeatureList>
            {features.map((feature, index) => (
              <FeatureRow key={feature.title} variants={itemVariants}>
                <Index>{String(index + 1).padStart(2, "0")}</Index>
                <div>
                  <FeatureTitleRow>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureTag>— {feature.tag}</FeatureTag>
                  </FeatureTitleRow>
                </div>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureRow>
            ))}
          </FeatureList>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
};

export default FeaturesSection;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

const Section = styled.section`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f7f7f7 0%, #ffffff 100%);
  padding: ${({ theme }) => `${theme.space.xl} 0`};
`;

const Content = styled(motion.div)`
  text-align: center;
  max-width: 600px;
`;

const ErrorCode = styled.div`
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  background: linear-gradient(135deg, #ff3c5f, #1e2a38);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.space.xl};
  line-height: 1.8;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <Section>
        <Container>
          <Content
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <ErrorCode>404</ErrorCode>
            </motion.div>

            <Title>Page Not Found</Title>
            <Description>
              Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
            </Description>

            <ButtonGroup>
              <Button size="lg" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </ButtonGroup>
          </Content>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
import styled from "styled-components";
import { motion } from "framer-motion";
import Container from "../ui/Container";

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  padding: 5rem 0 2rem;
`;

const FooterContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: 1.8rem;
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  background: ${({ theme }) => theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    width: 32px;
    height: 32px;
  }
`;

const FooterDescription = styled.p`
  font-size: 0.95rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.8rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;

  a {
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.7;
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.primary};
      transform: translateX(5px);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.white};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-5px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;

  svg {
    margin-right: 0.8rem;
    margin-top: 0.3rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 0.95rem;
    opacity: 0.8;
    line-height: 1.6;
  }
`;

const BottomBar = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.7;
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.fast};

    &:hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterColumn
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <FooterLogo>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 6.5H17.5V17.5H6.5V6.5Z"
                stroke="url(#paint0_linear)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 11V4C4 3.44772 4.44772 3 5 3H12"
                stroke="url(#paint1_linear)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 21H19C19.5523 21 20 20.5523 20 20V13"
                stroke="url(#paint2_linear)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="6.5"
                  y1="6.5"
                  x2="17.5"
                  y2="17.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF6B6B" />
                  <stop offset="1" stopColor="#4472CA" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear"
                  x1="4"
                  y1="3"
                  x2="12"
                  y2="11"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF6B6B" />
                  <stop offset="1" stopColor="#4472CA" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear"
                  x1="12"
                  y1="13"
                  x2="20"
                  y2="21"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FF6B6B" />
                  <stop offset="1" stopColor="#4472CA" />
                </linearGradient>
              </defs>
            </svg>
            PowerFit
          </FooterLogo>
          <FooterDescription>
            Transform your body and mind with our premium fitness experience.
            Our expert trainers and state-of-the-art facilities are designed to
            help you achieve your ultimate fitness potential.
          </FooterDescription>
          <SocialLinks>
            <SocialLink
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Facebook"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" />
              </svg>
            </SocialLink>
            <SocialLink
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" />
                <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" />
                <path d="M17.5 6.5H17.51" />
              </svg>
            </SocialLink>
            <SocialLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Twitter"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 4.01C21.0424 4.68547 19.9821 5.20197 18.86 5.54C18.2577 4.84751 17.4573 4.35464 16.567 4.13473C15.6767 3.91482 14.7395 3.97908 13.8821 4.31849C13.0247 4.65789 12.2884 5.2575 11.773 6.02927C11.2575 6.80104 10.9877 7.7067 11 8.63V9.63C9.24561 9.67866 7.50606 9.29359 5.93095 8.51153C4.35584 7.72948 3.00164 6.57536 2 5.15C2 5.15 -2 13.15 8 17.15C5.94053 18.5208 3.48716 19.1657 1 19C11 24 23 19 23 8.6C22.9991 8.31782 22.9723 8.03644 22.92 7.76C23.9406 6.74943 24.6608 5.45651 25 4.01H22Z" />
              </svg>
            </SocialLink>
            <SocialLink
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="YouTube"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.988743 13.537 1.14273 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 22.9965 13.5103 23 11.75C23.0113 9.96295 22.8572 8.1787 22.54 6.42Z" />
                <path d="M9.75 15.02L15.5 11.75L9.75 8.48001V15.02Z" />
              </svg>
            </SocialLink>
            <SocialLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" />
                <path d="M6 9H2V21H6V9Z" />
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" />
              </svg>
            </SocialLink>
          </SocialLinks>
        </FooterColumn>

        <FooterColumn
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("hero");
                }}
              >
                Home
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("features");
                }}
              >
                Features
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("programs");
                }}
              >
                Programs
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href="#wellness"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("wellness");
                }}
              >
                Wellness
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href="#virtual-classes"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("virtual-classes");
                }}
              >
                Virtual Classes
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href="#testimonials"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("testimonials");
                }}
              >
                Testimonials
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href="#mobile-app"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("mobile-app");
                }}
              >
                Mobile App
              </a>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>

        <FooterColumn
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Our Programs</FooterTitle>
          <FooterLinks>
            <FooterLink>
              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("programs");
                }}
              >
                Strength & Conditioning
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("programs");
                }}
              >
                HIIT Workouts
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("programs");
                }}
              >
                Yoga & Pilates
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("programs");
                }}
              >
                CrossFit Training
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("programs");
                }}
              >
                Boxing & Kickboxing
              </a>
            </FooterLink>
            <FooterLink>
              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("programs");
                }}
              >
                Nutrition Coaching
              </a>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>

        <FooterColumn
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <FooterTitle>Contact Us</FooterTitle>
          <ContactItem>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>
              123 Fitness Avenue, Wellness District
              <br />
              New York, NY 10001
            </p>
          </ContactItem>
          <ContactItem>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 16.92V19.92C22 20.4704 21.7893 20.9983 21.4142 21.3734C21.0391 21.7485 20.5113 21.9592 19.96 21.96C16.4223 21.6459 13.0418 20.3358 10.21 18.18C7.57451 16.1865 5.54313 13.5707 4.5 10.46C3.37738 7.01834 3.25245 3.4202 4.14 0C4.14111 -0.000332002 4.14111 -0.000332002 4.14 0C4.14123 0.550461 4.35071 1.07825 4.72573 1.45327C5.10076 1.8283 5.62855 2.03777 6.18 2.04H9.18C9.62518 2.03538 10.0551 2.19104 10.3949 2.47721C10.7347 2.76337 10.9625 3.16172 11.04 3.6C11.2225 4.68715 11.5157 5.75335 11.92 6.78C12.0729 7.1291 12.0933 7.52314 11.9782 7.88525C11.8631 8.24735 11.6198 8.55479 11.29 8.75L9.84 9.75C10.7884 12.4876 12.9326 14.6318 15.67 15.58L16.67 14.13C16.8652 13.8002 17.1726 13.5569 17.5347 13.4418C17.8969 13.3267 18.2909 13.3471 18.64 13.5C19.6667 13.9043 20.7329 14.1975 21.82 14.38C22.2628 14.458 22.6647 14.6942 22.9483 15.0449C23.2319 15.3956 23.3802 15.8372 23.36 16.29C23.36 16.29 23.36 16.92 22 16.92Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>+1 (555) 123-4567</p>
          </ContactItem>
          <ContactItem>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 6L12 13L2 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>info@powerfit.com</p>
          </ContactItem>
          <ContactItem>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>
              Monday - Friday: 5:30 AM - 11:00 PM
              <br />
              Saturday - Sunday: 7:00 AM - 9:00 PM
            </p>
          </ContactItem>
        </FooterColumn>
      </FooterContainer>

      <Container>
        <BottomBar>
          <Copyright>
            © {new Date().getFullYear()} PowerFit. All rights reserved.
          </Copyright>
          <BottomLinks>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/careers">Careers</a>
            <a href="/sitemap">Sitemap</a>
          </BottomLinks>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;

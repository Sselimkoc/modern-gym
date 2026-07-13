import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import Container from "../ui/Container";
import ScrollProgressBar from "../ui/ScrollProgressBar";
import { motion, AnimatePresence } from "framer-motion";
import siteConfig from "../../data/siteConfig";

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${({ scrolled, theme }) =>
    scrolled ? `${theme.colors.secondary}b3` : "transparent"};
  backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(16px) saturate(180%)" : "none")};
  -webkit-backdrop-filter: ${({ scrolled }) =>
    scrolled ? "blur(16px) saturate(180%)" : "none"};
  border-bottom: 1px solid
    ${({ scrolled }) => (scrolled ? "rgba(255, 255, 255, 0.08)" : "transparent")};
  transition: background-color 0.3s ease, box-shadow 0.3s ease,
    backdrop-filter 0.3s ease, border-color 0.3s ease;
  box-shadow: ${({ scrolled, theme }) =>
    scrolled ? theme.shadows.md : "none"};
`;

const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
`;

const Logo = styled.a`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  letter-spacing: 0.01em;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }

  svg {
    margin-right: 8px;
    width: 28px;
    height: 28px;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.light};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  z-index: 1002;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  align-items: center;

  &.desktop-nav {
    gap: 0.25rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  }

  &.mobile-nav {
    display: none;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      position: fixed;
      top: 0;
      right: 0;
      width: 280px;
      height: 100vh;
      background-color: ${({ theme }) => `${theme.colors.secondary}e6`};
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border-left: 1px solid rgba(255, 255, 255, 0.08);
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0;
      box-shadow: ${({ theme }) => theme.shadows.lg};
      z-index: 1001;
      overflow-y: auto;
    }
  }
`;

const MobileNavOverlay = styled(motion.div)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    backdrop-filter: blur(3px);
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme, active }) => (active ? theme.colors.white : theme.colors.light)};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
  position: relative;
  transition: background-color 0.25s ease, color 0.25s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.9rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ active }) => (active ? "rgba(255, 255, 255, 0.14)" : "transparent")};
  opacity: ${({ active }) => (active ? 1 : 0.85)};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background-color: rgba(255, 255, 255, 0.08);
    opacity: 1;
  }

  svg {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    opacity: 0.8;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0.4rem;
    padding: 0.85rem 1.5rem;
    width: 100%;
    font-size: 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

const MobileNavHeader = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: sticky;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => `${theme.colors.secondary}e6`};
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    z-index: 2;
  }
`;

const MobileNavContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  width: 100%;
  flex: 1;
`;

const MobileNavFooter = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1rem 1.5rem 1.5rem;
    margin-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    position: sticky;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => `${theme.colors.secondary}e6`};
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    z-index: 2;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.white};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar background change on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Handle active section highlighting
      const sections = [
        "hero",
        "features",
        "programs",
        "membership",
        "wellness",
        "testimonials",
        "mobile-app",
        "gallery",
        "contact",
      ];

      // Find the current section in view
      let currentSection = "";
      let minDistance = Number.MAX_VALUE;

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          // If this section is closer to the top of viewport than previous ones
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = sectionId;
          }
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Prevent scrolling when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [activeSection, isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <NavbarWrapper scrolled={scrolled}>
      <NavContainer>
        <Logo
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
        >
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
                <stop stopColor="#7C3AED" />
                <stop offset="1" stopColor="#FFD93D" />
              </linearGradient>
              <linearGradient
                id="paint1_linear"
                x1="4"
                y1="3"
                x2="12"
                y2="11"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7C3AED" />
                <stop offset="1" stopColor="#FFD93D" />
              </linearGradient>
              <linearGradient
                id="paint2_linear"
                x1="12"
                y1="13"
                x2="20"
                y2="21"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#7C3AED" />
                <stop offset="1" stopColor="#FFD93D" />
              </linearGradient>
            </defs>
          </svg>
          {siteConfig.name}
        </Logo>

        <MenuToggle
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </MenuToggle>

        {/* Desktop Navigation */}
        <NavLinks className="desktop-nav">
          <NavLink
            href="#programs"
            active={activeSection === "programs"}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("programs");
            }}
          >
            Programs
          </NavLink>
          <NavLink
            href="#membership"
            active={activeSection === "membership"}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("membership");
            }}
          >
            Membership
          </NavLink>
          <NavLink
            href="#gallery"
            active={activeSection === "gallery"}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("gallery");
            }}
          >
            Gallery
          </NavLink>
          <NavLink
            href="#contact"
            active={activeSection === "contact"}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            Contact
          </NavLink>
          <Button
            small
            style={{ marginLeft: "0.75rem" }}
            onClick={() => scrollToSection("hero")}
          >
            Join Now
          </Button>
        </NavLinks>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <MobileNavOverlay
              isOpen={isMenuOpen}
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={toggleMenu}
            />
          )}
        </AnimatePresence>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <NavLinks
              className="mobile-nav"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              style={{ display: isMenuOpen ? "flex" : "none" }}
            >
              <MobileNavHeader>
                <Logo
                  href="#hero"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("hero");
                  }}
                >
                  {siteConfig.name}
                </Logo>
              </MobileNavHeader>

              <MobileNavContent>
                <NavLink
                  href="#programs"
                  active={activeSection === "programs"}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("programs");
                  }}
                  variants={itemVariants}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM7 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m7 20 10-14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Programs
                </NavLink>
                <NavLink
                  href="#membership"
                  active={activeSection === "membership"}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("membership");
                  }}
                  variants={itemVariants}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Membership
                </NavLink>
                <NavLink
                  href="#gallery"
                  active={activeSection === "gallery"}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("gallery");
                  }}
                  variants={itemVariants}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="8.5"
                      cy="8.5"
                      r="1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="m21 15-5-5L5 21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Gallery
                </NavLink>
                <NavLink
                  href="#contact"
                  active={activeSection === "contact"}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  variants={itemVariants}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 16.92V19.92C22 20.4704 21.7893 20.9983 21.4142 21.3734C21.0391 21.7485 20.5113 21.9592 19.96 21.96C16.4223 21.6459 13.0418 20.3358 10.21 18.18C7.57451 16.1865 5.54313 13.5707 4.5 10.46C3.37738 7.01834 3.25245 3.4202 4.14 0C4.14123 0.550461 4.35071 1.07825 4.72573 1.45327C5.10076 1.8283 5.62855 2.03777 6.18 2.04H9.18C9.62518 2.03538 10.0551 2.19104 10.3949 2.47721C10.7347 2.76337 10.9625 3.16172 11.04 3.6C11.2225 4.68715 11.5157 5.75335 11.92 6.78C12.0729 7.1291 12.0933 7.52314 11.9782 7.88525C11.8631 8.24735 11.6198 8.55479 11.29 8.75L9.84 9.75C10.7884 12.4876 12.9326 14.6318 15.67 15.58L16.67 14.13C16.8652 13.8002 17.1726 13.5569 17.5347 13.4418C17.8969 13.3267 18.2909 13.3471 18.64 13.5C19.6667 13.9043 20.7329 14.1975 21.82 14.38C22.2628 14.458 22.6647 14.6942 22.9483 15.0449C23.2319 15.3956 23.3802 15.8372 23.36 16.29C23.36 16.29 23.36 16.92 22 16.92Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Contact
                </NavLink>
              </MobileNavContent>

              <MobileNavFooter>
                <Button fullWidth onClick={() => scrollToSection("hero")}>
                  Join Now
                </Button>
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
                </SocialLinks>
              </MobileNavFooter>
            </NavLinks>
          )}
        </AnimatePresence>
      </NavContainer>

      <ScrollProgressBar />
    </NavbarWrapper>
  );
};

export default Navbar;

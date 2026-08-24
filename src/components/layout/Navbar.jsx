import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import Container from "../ui/Container";
import { motion, AnimatePresence } from "framer-motion";

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${({ $scrolled, theme }) =>
    $scrolled ? theme.colors.bgElevated : "transparent"};
  border-bottom: 1px solid
    ${({ $scrolled, theme }) =>
      $scrolled ? theme.colors.border : "transparent"};
  transition: ${({ theme }) => theme.transitions.default};
`;

const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;

  img {
    height: 42px;
    width: auto;
    display: block;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  z-index: 1002;

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
    gap: 2rem;

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
      background-color: ${({ theme }) => theme.colors.bgElevated};
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0;
      border-left: 1px solid ${({ theme }) => theme.colors.border};
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
    background-color: ${({ theme }) => theme.colors.overlayStrong};
    z-index: 1000;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ $active }) => ($active ? "100%" : "0")};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.accent};
    transition: ${({ theme }) => theme.transitions.fast};
  }

  &:hover::after {
    width: 100%;
  }

  svg {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    opacity: 0.8;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0.4rem;
    padding: 0.8rem 1.5rem;
    width: 100%;
    font-size: 1rem;

    &::after {
      display: none;
    }
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
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    position: sticky;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.bgElevated};
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
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    position: sticky;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.bgElevated};
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
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const NAV_ITEMS = [
  { id: "features", label: "Özellikler" },
  { id: "programs", label: "Programlar" },
  { id: "trainers", label: "Eğitmenler" },
  { id: "testimonials", label: "Yorumlar" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["hero", ...NAV_ITEMS.map((item) => item.id)];
      let currentSection = "";
      let minDistance = Number.MAX_VALUE;

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = sectionId;
          }
        }
      });

      setActiveSection((prev) =>
        prev === currentSection ? prev : currentSection,
      );
    };

    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
      transition: { type: "spring", stiffness: 400, damping: 40 },
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
    <NavbarWrapper $scrolled={scrolled}>
      <NavContainer>
        <Logo
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
        >
          <img src="/logo.PNG" alt="Black-Fit" />
        </Logo>

        <MenuToggle
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none">
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

        <NavLinks className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              $active={activeSection === item.id}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </NavLink>
          ))}
          <Button size="sm" onClick={() => scrollToSection("hero")}>
            Hemen Katıl
          </Button>
        </NavLinks>

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
                  BLACK<span>FIT</span>
                </Logo>
              </MobileNavHeader>

              <MobileNavContent>
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.id}
                    href={`#${item.id}`}
                    $active={activeSection === item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    variants={itemVariants}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </MobileNavContent>

              <MobileNavFooter>
                <Button fullWidth onClick={() => scrollToSection("hero")}>
                  Hemen Katıl
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
                    <svg viewBox="0 0 24 24" fill="currentColor">
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
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" />
                      <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" />
                      <path d="M17.5 6.5H17.51" />
                    </svg>
                  </SocialLink>
                  {/* <SocialLink
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Twitter"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 4.01C21.0424 4.68547 19.9821 5.20197 18.86 5.54C18.2577 4.84751 17.4573 4.35464 16.567 4.13473C15.6767 3.91482 14.7395 3.97908 13.8821 4.31849C13.0247 4.65789 12.2884 5.2575 11.773 6.02927C11.2575 6.80104 10.9877 7.7067 11 8.63V9.63C9.24561 9.67866 7.50606 9.29359 5.93095 8.51153C4.35584 7.72948 3.00164 6.57536 2 5.15C2 5.15 -2 13.15 8 17.15C5.94053 18.5208 3.48716 19.1657 1 19C11 24 23 19 23 8.6C22.9991 8.31782 22.9723 8.03644 22.92 7.76C23.9406 6.74943 24.6608 5.45651 25 4.01H22Z" />
                    </svg>
                  </SocialLink> */}
                </SocialLinks>
              </MobileNavFooter>
            </NavLinks>
          )}
        </AnimatePresence>
      </NavContainer>
    </NavbarWrapper>
  );
};

export default Navbar;

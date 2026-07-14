import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import LazyImage from "./LazyImage";

const GalleryContainer = styled.div`
  width: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.space.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.space.md};
  }
`;

const ImageItem = styled(motion.div)`
  width: 100%;
  height: 250px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 180px;
  }
`;

const LightboxOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndices.modal};
  padding: ${({ theme }) => theme.space.md};
`;

const LightboxContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.space.md};
  right: ${({ theme }) => theme.space.md};
  background-color: transparent;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  z-index: 10;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  z-index: 10;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 40px;
    height: 40px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.space.md};
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  z-index: 9;
`;

const ImageGallery = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    },
    [handlePrevious, handleNext]
  );

  React.useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedIndex, handleKeyDown]);

  return (
    <GalleryContainer>
      <GridContainer>
        {images.map((image, index) => (
          <ImageItem
            key={index}
            onClick={() => setSelectedIndex(index)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <LazyImage
              src={image.src}
              alt={image.alt}
              width="100%"
              height="100%"
            />
          </ImageItem>
        ))}
      </GridContainer>

      <AnimatePresence>
        {selectedIndex !== null && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <LightboxContent
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <CloseButton onClick={() => setSelectedIndex(null)} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 6 6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CloseButton>

              <NavigationButton
                onClick={handlePrevious}
                style={{ left: "20px" }}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18l-6-6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavigationButton>

              <LightboxImage
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
              />

              <NavigationButton
                onClick={handleNext}
                style={{ right: "20px" }}
                aria-label="Next image"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavigationButton>

              <ImageCounter>
                {selectedIndex + 1} / {images.length}
              </ImageCounter>
            </LightboxContent>
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};

export default ImageGallery;

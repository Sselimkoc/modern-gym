import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { handleImgError } from "../../utils/imageFallback";

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.lightGray};
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${({ objectFit }) => objectFit || "cover"};
  display: block;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.lightGray} 25%,
    rgba(57, 255, 20, 0.14) 50%,
    ${({ theme }) => theme.colors.lightGray} 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.8s infinite;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const LazyImage = ({ src, alt, objectFit, onLoad }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "50px" },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = (e) => {
    handleImgError(e);
    setLoaded(true);
  };

  return (
    <ImageWrapper ref={ref}>
      {!loaded && <Placeholder />}
      {inView && (
        <Img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loaded={loaded}
          objectFit={objectFit}
          loading="lazy"
        />
      )}
    </ImageWrapper>
  );
};

export default LazyImage;

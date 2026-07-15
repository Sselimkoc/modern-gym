import { useEffect, useRef } from "react";
import styled from "styled-components";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const Glow = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${({ $zIndex }) => $zIndex};
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  mix-blend-mode: screen;
  background: radial-gradient(
    220px circle at var(--x, 50%) var(--y, 50%),
    rgba(57, 255, 20, 0.09) 0%,
    rgba(57, 255, 20, 0.03) 45%,
    transparent 70%
  );
`;

// Mouse-follow glow for dark sections — like a flashlight sweeping a gym at
// night. Attaches to its own parent element (which must be position:relative)
// so it can be dropped in as a plain sibling with no extra wiring per section.
const CursorSpotlight = ({ zIndex = 0 }) => {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const el = ref.current;
    const parent = el?.parentElement;
    if (!parent) return undefined;

    const handleMove = (e) => {
      const rect = parent.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
      el.style.opacity = "1";
    };
    const handleLeave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("mousemove", handleMove);
    parent.addEventListener("mouseleave", handleLeave);
    return () => {
      parent.removeEventListener("mousemove", handleMove);
      parent.removeEventListener("mouseleave", handleLeave);
    };
  }, [prefersReducedMotion]);

  return <Glow ref={ref} $zIndex={zIndex} aria-hidden="true" />;
};

export default CursorSpotlight;

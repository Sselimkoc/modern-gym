import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

// 3D pointer-tilt for cards: tracks cursor position over the element and
// converts it into a spring-smoothed rotateX/rotateY pair.
const useTilt = (maxTilt = 8) => {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 200, damping: 22 });
  const springY = useSpring(y, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);

  const onMouseMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return {
    ref,
    onMouseMove,
    onMouseLeave,
    style: {
      rotateX: prefersReducedMotion ? 0 : rotateX,
      rotateY: prefersReducedMotion ? 0 : rotateY,
      transformPerspective: 900,
    },
  };
};

export default useTilt;

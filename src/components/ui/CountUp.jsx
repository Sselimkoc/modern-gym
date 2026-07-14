import { useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const CountUp = ({ value, suffix = "", duration = 1.6, start = false }) => {
  const spanRef = useRef(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest).toLocaleString()
  );
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!start) return undefined;
    if (prefersReducedMotion) {
      motionValue.set(value);
      return undefined;
    }
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [start, value, duration, motionValue, prefersReducedMotion]);

  useEffect(
    () =>
      rounded.on("change", (latest) => {
        if (spanRef.current) spanRef.current.textContent = `${latest}${suffix}`;
      }),
    [rounded, suffix]
  );

  return <span ref={spanRef}>{`0${suffix}`}</span>;
};

export default CountUp;

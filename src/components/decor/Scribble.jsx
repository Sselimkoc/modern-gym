import styled from "styled-components";
import { motion } from "framer-motion";

// A single hand-tapered brush-stroke shape: wide where the pen runs
// straight, narrow through the curve and at both tips — like a chisel-tip
// marker laid down fast. Baked in once as static path data (generated from
// a variable-width offset curve), reused as the site's one recurring
// annotation mark.
const SWOOSH = {
  viewBox: "0 0 296 46",
  d: "M 8 34 L 11.7 33.9 L 15.9 35.3 L 19.7 36.7 L 22.9 36.2 L 25.9 35.4 L 28.9 34.7 L 32 34.2 L 35.1 33.7 L 38.3 33.4 L 41.6 33.2 L 44.8 33.1 L 48.2 33 L 51.5 33.1 L 55 33.2 L 58.5 33.3 L 62 33.5 L 65.6 33.7 L 69.2 33.9 L 73 34.1 L 76.8 34.2 L 80.7 34 L 84.7 33.5 L 88.7 32.9 L 92.9 32.2 L 97.1 31.5 L 101.4 31 L 105.8 30.6 L 110.2 30.5 L 114.6 30.8 L 119 31.2 L 123.5 31.7 L 128.1 32.2 L 132.7 32.9 L 137.4 33.9 L 142.1 35 L 146.9 36.2 L 151.8 37.3 L 156.8 38.5 L 161.9 39.4 L 167.1 40.2 L 172.4 40.7 L 177.7 40.9 L 183.2 40.8 L 188.7 40.5 L 194.3 40.1 L 200 39.5 L 205.7 38.8 L 211.5 38 L 217.4 37.1 L 223.3 36 L 229.3 34.9 L 235.4 33.7 L 241.6 32.4 L 247.9 31.1 L 254.3 29.7 L 260.7 28.2 L 267.2 26.3 L 273.4 22.8 L 279.5 18.9 L 286 16 L 286 16 L 279 16.9 L 271.8 16.6 L 264.8 16.4 L 258.3 17.4 L 252 18.7 L 245.8 19.8 L 239.6 20.6 L 233.6 21.3 L 227.6 21.8 L 221.7 22.2 L 215.9 22.5 L 210.1 22.7 L 204.5 22.8 L 199 22.9 L 193.5 22.9 L 188.2 22.9 L 182.9 22.9 L 177.7 22.9 L 172.5 23 L 167.4 23.4 L 162.4 23.9 L 157.4 24.5 L 152.5 25.1 L 147.6 25.8 L 142.7 26.3 L 137.9 26.8 L 133.2 27 L 128.5 27 L 124 26.7 L 119.5 26.3 L 115 25.8 L 110.7 25.3 L 106.4 24.3 L 102.2 23.1 L 98.1 21.7 L 94 20.3 L 90 18.8 L 86 17.5 L 82 16.3 L 78 15.5 L 74.1 15.2 L 70.1 15 L 66.2 14.9 L 62.3 14.9 L 58.5 15 L 54.7 15.2 L 50.9 15.5 L 47.2 15.8 L 43.5 16.3 L 39.8 16.8 L 36.2 17.5 L 32.6 18.2 L 29 19 L 25.5 19.9 L 21.9 20.8 L 18.4 21.9 L 15.2 23.5 L 12.7 27.2 L 10.5 31.3 L 8 34 Z",
};

const Svg = styled(motion.svg)`
  display: block;
  overflow: visible;
  pointer-events: none;
  flex-shrink: 0;
`;

const sweep = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, delay, ease: [0.65, 0, 0.35, 1] },
  }),
};

// Accent underline mark — reused under every section eyebrow and, once,
// beneath a headline word. The single motif the site is built around, so
// it repeats deliberately rather than being scattered as loose decoration.
export const ScribbleUnderline = ({
  inView,
  delay = 0,
  opacity = 0.85,
  className,
  color,
}) => (
  <Svg
    className={className}
    viewBox={SWOOSH.viewBox}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <motion.path
      d={SWOOSH.d}
      fill={color || "currentColor"}
      opacity={opacity}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={sweep}
      style={{ originX: 0, originY: 0.5 }}
    />
  </Svg>
);

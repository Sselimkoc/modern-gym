import styled from "styled-components";
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, delay: i * 0.18, ease: "easeInOut" },
  }),
};

const Svg = styled(motion.svg)`
  display: block;
  overflow: visible;
  pointer-events: none;
`;

// Highlighter-style scrawl to accent a heading/eyebrow — one thick translucent
// marker stroke underneath a thinner, more opaque pen stroke on top.
export const ScribbleUnderline = ({ inView, className, color }) => (
  <Svg
    className={className}
    viewBox="0 0 220 34"
    initial="hidden"
    animate={inView ? "visible" : "hidden"}
    aria-hidden="true"
  >
    <motion.path
      d="M6 23 C 44 8, 92 30, 142 12 C 172 1, 198 17, 214 9"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="13"
      strokeLinecap="round"
      opacity="0.22"
      custom={0}
      variants={draw}
    />
    <motion.path
      d="M4 19 C 48 4, 90 27, 140 8 C 170 -3, 196 13, 216 7"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2.5"
      strokeLinecap="round"
      custom={1}
      variants={draw}
    />
  </Svg>
);

// A loose cluster of freehand marks — thick and thin, scattered — for filling
// otherwise-empty background space with a bit of energy.
export const ScribbleScatter = ({ inView, className, color }) => (
  <Svg
    className={className}
    viewBox="0 0 320 200"
    initial="hidden"
    animate={inView ? "visible" : "hidden"}
    aria-hidden="true"
  >
    <motion.path
      d="M18 40 C 60 10, 40 70, 90 55 C 130 43, 110 90, 160 78"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="16"
      strokeLinecap="round"
      opacity="0.12"
      custom={0}
      variants={draw}
    />
    <motion.path
      d="M210 20 C 235 45, 260 15, 285 45"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.5"
      custom={1}
      variants={draw}
    />
    <motion.path
      d="M40 140 C 80 120, 70 175, 120 155 C 150 143, 170 168, 205 150"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.35"
      custom={2}
      variants={draw}
    />
    <motion.path
      d="M250 110 C 262 95, 278 125, 292 108"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="9"
      strokeLinecap="round"
      opacity="0.16"
      custom={3}
      variants={draw}
    />
  </Svg>
);

import React from "react";
import styled from "styled-components";

const WaveContainer = styled.div`
  width: 100%;
  height: ${({ $height }) => $height}px;
  background: ${({ $bgColor }) => $bgColor};
  overflow: hidden;
  line-height: 0;
  position: relative;
  z-index: 1;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    height: ${({ $height }) => Math.round($height * 0.6)}px;
  }
`;

const WAVE_PATHS = [
  "M0,30 C240,80 480,0 720,35 C960,70 1200,15 1440,45 L1440,100 L0,100 Z",
  "M0,50 C360,10 1080,90 1440,30 L1440,100 L0,100 Z",
];

// Sits between two sections: $bgColor matches the section above (fills the
// flat area) while the wave shape itself is filled with the color of the
// section below, so the boundary reads as one continuous curve.
const SectionWave = ({ bgColor, fillColor, height = 70, variant = 0 }) => (
  <WaveContainer $bgColor={bgColor} $height={height} aria-hidden="true">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d={WAVE_PATHS[variant % WAVE_PATHS.length]} fill={fillColor} />
    </svg>
  </WaveContainer>
);

export default SectionWave;

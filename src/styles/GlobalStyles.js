import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  :root {
    --scrollbar-width: 8px;
    --scrollbar-track: rgba(255, 255, 255, 0.04);
    --scrollbar-thumb: rgba(215, 255, 62, 0.35);
    --scrollbar-thumb-hover: rgba(215, 255, 62, 0.6);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.7;
    overflow-x: hidden;
    min-height: 100vh;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }

  h1, h2 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    text-transform: uppercase;
    line-height: 0.95;
    letter-spacing: -0.01em;
    margin-bottom: 1.5rem;
    text-wrap: balance;
  }

  h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    line-height: 1.25;
    letter-spacing: -0.01em;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: clamp(2.75rem, 7vw, 5.5rem);
  }

  h2 {
    font-size: clamp(2rem, 5vw, 3.25rem);
  }

  h3 {
    font-size: clamp(1.4rem, 3vw, 1.75rem);
  }

  h4 {
    font-size: clamp(1.15rem, 2.5vw, 1.4rem);
  }

  h5 {
    font-size: 1.1rem;
  }

  h6 {
    font-size: 1rem;
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes["2xl"]};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  }

  p {
    margin-bottom: 1.5rem;
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.accent};
    transition: ${({ theme }) => theme.transitions.fast};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.body};
    border: none;
    background: none;
    font-size: inherit;
    color: inherit;
  }

  ul, ol {
    margin-left: 1.5rem;
    margin-bottom: ${({ theme }) => theme.space.md};
  }

  section {
    padding: 7rem 0 8rem;
    position: relative;
  }

  ::-webkit-scrollbar {
    width: var(--scrollbar-width);
  }

  ::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--scrollbar-thumb-hover);
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.onAccent};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    section {
      padding: 4.5rem 0 5.5rem;
    }
  }

  @media print {
    * {
      background: transparent !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
  }
`;

export default GlobalStyles;
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.dark};
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: ${({ theme }) => theme.fontWeights.bold};
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
    margin-bottom: ${({ theme }) => theme.space.md};
    line-height: 1.7;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  button {
    font-family: ${({ theme }) => theme.fonts.body};
    cursor: pointer;
    border: none;
    transition: ${({ theme }) => theme.transitions.default};

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  input, textarea, select {
    font-family: ${({ theme }) => theme.fonts.body};
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.space.sm};
    font-size: ${({ theme }) => theme.fontSizes.md};
    transition: ${({ theme }) => theme.transitions.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.18);
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.lightGray};
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    margin-left: 1.5rem;
    margin-bottom: ${({ theme }) => theme.space.md};
  }

  li {
    margin-bottom: 0.5rem;
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
    margin: ${({ theme }) => theme.space.lg} 0;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.light};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray};
    border-radius: 5px;

    &:hover {
      background: ${({ theme }) => theme.colors.dark};
    }
  }

  /* Selection styling */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  ::-moz-selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles;
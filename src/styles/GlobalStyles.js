import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Removed Google Fonts import as it should be in index.html */

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

  p {
    margin-bottom: 1rem;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: ${({ theme }) => theme.transitions.fast};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.body};
    border: none;
    background: none;
  }

  ul, ol {
    list-style-position: inside;
  }

  section {
    padding: 5rem 0;
  }

  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    section {
      padding: 3rem 0;
    }
  }

  /* Utility Classes */
  .text-center {
    text-align: center;
  }

  .text-primary {
    color: ${({ theme }) => theme.colors.primary};
  }

  .text-secondary {
    color: ${({ theme }) => theme.colors.secondary};
  }

  .bg-primary {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .bg-secondary {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .bg-light {
    background-color: ${({ theme }) => theme.colors.light};
  }

  .bg-dark {
    background-color: ${({ theme }) => theme.colors.dark};
  }

  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .gap-sm {
    gap: ${({ theme }) => theme.space.sm};
  }

  .gap-md {
    gap: ${({ theme }) => theme.space.md};
  }

  .gap-lg {
    gap: ${({ theme }) => theme.space.lg};
  }

  .mt-sm { margin-top: ${({ theme }) => theme.space.sm}; }
  .mt-md { margin-top: ${({ theme }) => theme.space.md}; }
  .mt-lg { margin-top: ${({ theme }) => theme.space.lg}; }
  .mt-xl { margin-top: ${({ theme }) => theme.space.xl}; }

  .mb-sm { margin-bottom: ${({ theme }) => theme.space.sm}; }
  .mb-md { margin-bottom: ${({ theme }) => theme.space.md}; }
  .mb-lg { margin-bottom: ${({ theme }) => theme.space.lg}; }
  .mb-xl { margin-bottom: ${({ theme }) => theme.space.xl}; }
`;

export default GlobalStyles;

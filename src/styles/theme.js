const theme = {
  colors: {
    // Base surfaces — warm near-black, single accent
    bg: "#0A0A0B",
    bgElevated: "#141416",
    surface: "#19191C",
    surfaceHover: "#212124",

    border: "rgba(255, 255, 255, 0.08)",
    borderStrong: "rgba(255, 255, 255, 0.18)",

    text: "#F3F3EF",
    textMuted: "#A0A0A6",
    textFaint: "#6C6C72",

    // Single signal color — volt lime
    accent: "#D7FF3E",
    accentDim: "#B9DE35",
    onAccent: "#0A0A0B",

    overlay: "rgba(10, 10, 11, 0.6)",
    overlayStrong: "rgba(10, 10, 11, 0.88)",
  },
  fonts: {
    display: "'Anton', 'Arial Narrow', sans-serif",
    body: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  shadows: {
    sm: "0 1px 3px rgba(10, 10, 11, 0.4)",
    md: "0 4px 12px rgba(10, 10, 11, 0.45)",
    lg: "0 12px 28px rgba(10, 10, 11, 0.5)",
    xl: "0 24px 48px rgba(10, 10, 11, 0.55)",
    accent: "0 8px 24px rgba(215, 255, 62, 0.18)",
  },

  space: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    "2xl": "5rem",
    "3xl": "8rem",
    "4xl": "12rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
  transitions: {
    default: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    fast: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  zIndices: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1700,
    tooltip: 1800,
  },
};

export default theme;

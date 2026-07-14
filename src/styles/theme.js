const theme = {
  colors: {
    primary: "#16A34A",
    primaryDark: "#15803D",
    secondary: "#090D0A",
    accent: "#EFFFF6",
    light: "#F3F6F4",
    white: "#ffffff",
    dark: "#050805",
    gray: "#5B655F",
    lightGray: "#DDE3DF",
    neon: "#39FF14",
    gradientPrimary: "linear-gradient(135deg, #15803D 0%, #4ADE80 100%)",
    gradientDark: "linear-gradient(135deg, #050805 0%, #0F1F14 100%)",
    overlay: "rgba(5, 8, 5, 0.72)",
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Open Sans', sans-serif",
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
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
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
    sm: "0 1px 3px rgba(0,0,0,0.12)",
    md: "0 4px 6px rgba(0,0,0,0.1)",
    lg: "0 10px 15px rgba(0,0,0,0.1)",
    xl: "0 20px 25px rgba(0,0,0,0.1)",
    primary: "0 4px 20px rgba(57, 255, 20, 0.35)",
    hover: "0 8px 30px rgba(0,0,0,0.12)",
  },
  space: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    "2xl": "5rem",
  },
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  transitions: {
    default: "all 0.3s ease",
    fast: "all 0.15s ease",
    slow: "all 0.5s ease",
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
  utilities: {
    focusRing: `
      outline: 2px solid #39FF14;
      outline-offset: 2px;
    `,
    visibleHidden: `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    `,
  },
};

export default theme;

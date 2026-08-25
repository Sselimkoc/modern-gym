import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const DEV_ACCENT = "rgb(202, 73, 63)";

function App() {
  const [devAccent, setDevAccent] = useState(false);

  const activeTheme = devAccent
    ? {
        ...theme,
        colors: {
          ...theme.colors,
          accent: DEV_ACCENT,
          accentDim: DEV_ACCENT,
        },
      }
    : theme;

  return (
    <ThemeProvider theme={activeTheme}>
      <GlobalStyles />
      <MotionConfig reducedMotion="user">
        <Router>
          <Navbar onToggleDevAccent={() => setDevAccent((prev) => !prev)} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </Router>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
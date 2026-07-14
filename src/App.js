import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import StickyJoinButton from "./components/ui/StickyJoinButton";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { JoinModalProvider } from "./context/JoinModalContext";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MotionConfig reducedMotion="user">
          <JoinModalProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Router>
            <StickyJoinButton />
          </JoinModalProvider>
        </MotionConfig>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
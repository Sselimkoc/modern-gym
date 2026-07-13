import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import StickyJoinButton from "./components/ui/StickyJoinButton";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <StickyJoinButton />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
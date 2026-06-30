import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import { GymProvider } from "./components/context/GymContext";
import HomePage from "./pages/HomePage";
import GymListPage from "./pages/GymListPage";
import GymDetailPage from "./pages/GymDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <GymProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gyms" element={<GymListPage />} />
              <Route path="/gym/:slug" element={<GymDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </GymProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import { GymProvider } from "./context/GymContext";
import HomePage from "./pages/HomePage";
import GymDetailPage from "./pages/GymDetailPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GymProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gym/:slug" element={<GymDetailPage />} />
          </Routes>
        </Router>
      </GymProvider>
    </ThemeProvider>
  );
}

export default App;

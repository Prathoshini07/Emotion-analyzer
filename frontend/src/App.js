import React from "react";
import { Routes, Route } from "react-router-dom";
import EmotionForm from "./components/EmotionForm";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmotionForm />} />
      <Route path="/analytics" element={<AnalyticsDashboard />} />
    </Routes>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import StudentEntry from "./pages/StudentEntry";
import TableOfContents from "./pages/TableOfContents";
import QuizScreen from "./pages/QuizScreen";
import ScoreSummary from "./pages/ScoreSummary";

const App: React.FC = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/admin-login" />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Changed from dynamic quizId to hardcoded /start route */}
        <Route path="/buzztrackers-quizz/start" element={<StudentEntry />} />

        <Route path="/table" element={<TableOfContents />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/score-summary" element={<ScoreSummary />} />

        <Route path="*" element={<Navigate to="/admin-login" />} />
      </Routes>
    </Router>
  );
};

export default App;
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
        {/* Admin Routes */}
        <Route
  path="/admin"
  element={isAdmin ? <AdminPage /> : <Navigate to="/admin-login" />}
/>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/" element={<Navigate to="/admin-login" />} />

        {/* Student Routes */}
        <Route path="/" element={<StudentEntry />} />
        <Route path="/table" element={<TableOfContents />} />

        <Route path="/quiz" element={<QuizScreen />} />

        <Route path="/score-summary" element={<ScoreSummary />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

// ✅ Final ScoreSummary.tsx (No Answer Reveal to Students)
import React from 'react';

const ScoreSummary: React.FC = () => {
  const studentName = localStorage.getItem("lastQuizUser") || "Guest";
  const topic = localStorage.getItem("lastQuizTopic") || "";
  const score = parseInt(localStorage.getItem(`${studentName}_${topic}_score`) || "0", 10);

  const attemptLog = JSON.parse(localStorage.getItem("attempts") || "{}");
  const questionData = attemptLog[`${studentName}_${topic}`] || [];

  const totalQuestions = questionData.length;
  const accuracy = totalQuestions > 0 ? parseFloat(((score / totalQuestions) * 100).toFixed(1)) : 0;

  const getMessage = () => {
    if (score === totalQuestions) return "🌟 Perfect score! Outstanding!";
    if (accuracy >= 80) return "💪 Great job! You're almost there!";
    if (accuracy >= 60) return "👏 Good effort! Keep practicing.";
    return "📘 Keep studying. You'll improve with time!";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 Quiz Completed</h1>
        <p className="text-lg mb-2">👤 <strong>{studentName}</strong></p>
        <p className="text-lg mb-2">📘 Topic: <strong>{topic}</strong></p>
        <p className="text-lg mb-2">✅ Score: <strong>{score}</strong> / {totalQuestions}</p>
        <p className="text-lg mb-2">🎯 Accuracy: <strong>{accuracy}%</strong></p>
        <p className="text-lg mb-4">{getMessage()}</p>

        <div className="text-center text-gray-600 italic mt-6">
          📩 Your results have been submitted. You will receive them from your teacher.
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.href = "/table"}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            🔁 Go Back to Table of Contents
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreSummary;

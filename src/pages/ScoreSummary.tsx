import React from 'react';

const ScoreSummary: React.FC = () => {
  const studentName = localStorage.getItem("studentName") || "Guest";
  const topic = localStorage.getItem("currentTopic") || "";
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

        <h2 className="text-xl font-bold mt-6 mb-3">📊 Question Analytics</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {questionData.map((q: any, idx: number) => {
            const correct = q.selected === q.correct;
            return (
              <div
                key={idx}
                className={`p-3 border rounded ${
                  correct ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400"
                }`}
              >
                <p className="font-semibold mb-1">Q{idx + 1}: {q.question}</p>
                <p>
                  Your Answer: <strong>{q.options?.[q.selected] || `Option ${q.selected + 1}`}</strong>
                  {" "}
                  {correct ? "✅" : "❌"}
                </p>
                {!correct && (
                  <p>
                    Correct Answer: <strong>{q.options?.[q.correct] || `Option ${q.correct + 1}`}</strong>
                  </p>
                )}
              </div>
            );
          })}
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

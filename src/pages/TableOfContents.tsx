import React from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const TableOfContents: React.FC = () => {
  const studentName = localStorage.getItem("studentName");
  const quizData: Question[] = JSON.parse(localStorage.getItem("quizData") || "[]");

  const topics: { [key: string]: Question[] } = {};
  quizData.forEach((q) => {
    const topic = q.question.split("–")[0].trim();
    if (!topics[topic]) topics[topic] = [];
    topics[topic].push(q);
  });

  const startQuiz = (topic: string) => {
    localStorage.setItem("currentTopic", topic);
    window.location.href = "/quiz";
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Table of Contents</h1>
          <div className="text-sm text-gray-600">👤 {studentName}</div>
        </div>
        <p className="text-gray-600 mb-4">Select a section to start the quiz</p>
        <div className="space-y-4">
          {Object.entries(topics).map(([topic, _questions], index) => {
            const completed = localStorage.getItem(`${studentName}_${topic}_done`);
            return (
              <div
                key={index}
                className="flex items-center justify-between border rounded-lg p-4 hover:shadow-md transition"
              >
                <span className="font-medium text-lg">
                  {index + 1}. {topic}
                </span>
                <button
                  onClick={() => startQuiz(topic)}
                  disabled={!!completed}
                  className={`px-4 py-1 text-sm font-semibold rounded ${
                    completed
                      ? 'bg-green-100 text-green-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {completed ? "Completed" : "Start"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;

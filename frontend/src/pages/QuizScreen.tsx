import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizScreen: React.FC = () => {
  const topic = localStorage.getItem("currentTopic") || "";
  const studentName = localStorage.getItem("studentName") || "Guest";
  const allQuestions: Question[] = JSON.parse(localStorage.getItem("quizData") || "[]");
  const questions = allQuestions.filter((q) => q.question.startsWith(topic));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const [tabChangeCount, setTabChangeCount] = useState(0);
  const [quizLocked, setQuizLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("⏰ Time's up! Submitting your quiz.");
          localStorage.setItem(`${studentName}_${topic}_done`, "true");
          localStorage.setItem(`${studentName}_${topic}_score`, score.toString());
          checkAllTopicsComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabChangeCount(prev => {
          const next = prev + 1;
          if (next === 1) alert("⚠️ Please don’t switch tabs.");
          if (next === 2) {
            setQuizLocked(true);
            alert("⛔ Quiz Locked! You will be redirected in 10 seconds.");
            localStorage.setItem(`${studentName}_${topic}_done`, "true");
            localStorage.setItem(`${studentName}_${topic}_score`, score.toString());
            setTimeout(() => {
              window.location.href = "/score-summary";
            }, 10000);
          }
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleOptionSelect = (index: number) => {
    if (!quizLocked) {
      setSelected(index);
    }
  };

  const handleNext = () => {
    const isCorrect = selected === questions[currentIndex].correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);

    const attemptLog = JSON.parse(localStorage.getItem("attempts") || "{}");
    const key = `${studentName}_${topic}`;
    const logEntry = {
      question: questions[currentIndex].question,
      selected,
      correct: questions[currentIndex].correctAnswer
    };
    attemptLog[key] = attemptLog[key] || [];
    attemptLog[key].push(logEntry);
    localStorage.setItem("attempts", JSON.stringify(attemptLog));

    if (currentIndex === questions.length - 1) {
      localStorage.setItem(`${studentName}_${topic}_done`, "true");
      localStorage.setItem(`${studentName}_${topic}_score`, score.toString());
      checkAllTopicsComplete();
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelected(null);
    }
  };

  const checkAllTopicsComplete = () => {
    const quizData: Question[] = JSON.parse(localStorage.getItem("quizData") || "[]");
    const topics = Array.from(new Set(quizData.map(q => q.question.split("–")[0].trim())));
    const doneAll = topics.every(t => localStorage.getItem(`${studentName}_${t}_done`) === "true");
    if (doneAll) {
      window.location.href = "/score-summary";
    } else {
      window.location.href = "/table";
    }
  };

  if (quizLocked) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg border border-red-300 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-2">🚫 Quiz Locked</h2>
          <p className="mb-4 font-medium text-gray-800">
            Tab switching has been detected. This action violates quiz integrity.
          </p>
          <div className="bg-yellow-100 border-l-4 border-yellow-400 p-3 text-left text-sm text-yellow-800 mb-4">
            <p><strong>Warning:</strong> Multiple tab switches will result in termination.</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Do not open new tabs</li>
              <li>Do not minimize the window</li>
              <li>Do not use search engines</li>
            </ul>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            You will be logged out automatically in 10 seconds.
          </p>
        </div>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4">Question {currentIndex + 1} of {questions.length}</h2>
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
        <div className="text-right text-sm text-gray-600 mb-2">
          Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
        <p className="mb-6">{current.question}</p>
        <div className="space-y-3">
          {current.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left px-4 py-2 border rounded ${
                selected === idx
                  ? 'bg-blue-100 border-blue-400'
                  : 'hover:bg-gray-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="text-right mt-6">
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {currentIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;

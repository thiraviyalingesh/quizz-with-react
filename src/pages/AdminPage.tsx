import React, { useState, useEffect } from 'react';
import UploadBox from '../components/UploadBox';

const AdminPage: React.FC = () => {
  const [tempLink, setTempLink] = useState<string | null>(null);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<{ [key: string]: any[] }>({});
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAttempts = JSON.parse(localStorage.getItem("attempts") || "{}");
      setAttempts(newAttempts);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleParsedQuestions = (parsed: any[]) => {
    // ✅ CLEAR previous attempts on upload
    localStorage.removeItem("attempts");

    const newQuizId = `buzz-${Math.random().toString(36).substring(2, 8)}`;
    const link = `${window.location.origin}/buzztrackers-quizz/${newQuizId}`;
    localStorage.setItem(`quiz_${newQuizId}`, JSON.stringify(parsed));
    localStorage.setItem(`quiz_${newQuizId}_expires`, (Date.now() + 60 * 60 * 1000).toString());
    localStorage.setItem("quizData", JSON.stringify(parsed));
    setQuizId(newQuizId);
    setTempLink(link);
    setAttempts({});
  };

  const groupedByStudent: { [student: string]: { topic: string; logs: any[] }[] } = {};
  Object.entries(attempts).forEach(([key, logs]) => {
    const [student, topic] = key.split("_");
    if (!groupedByStudent[student]) groupedByStudent[student] = [];
    groupedByStudent[student].push({ topic, logs });
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      {!tempLink && (
        <div
          onClick={() => localStorage.removeItem("attempts")}
          className="cursor-pointer"
        >
          <UploadBox onFileParsed={handleParsedQuestions} />
        </div>
      )}

      {tempLink && (
        <div className="mt-6 p-6 bg-white rounded shadow-md">
          <h2 className="text-xl font-bold text-green-700">✅ Quiz Link Generated</h2>
          <p className="text-gray-600 mb-1">Share this with students (valid 1 hour):</p>
          <div className="bg-gray-100 p-3 rounded border text-blue-600 font-mono">
            <a href={tempLink} target="_blank" rel="noopener noreferrer">{tempLink}</a>
          </div>
        </div>
      )}

      <div className="mt-10 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">📢 Student Submissions</h2>
        {Object.keys(groupedByStudent).length === 0 ? (
          <p className="text-gray-500">No attempts yet.</p>
        ) : (
          <div>
            {Object.entries(groupedByStudent).map(([student, topics], idx) => (
              <div key={idx} className="mb-4 border rounded shadow-sm">
                <button
                  onClick={() => setExpandedStudent(expandedStudent === student ? null : student)}
                  className="w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 border-b font-semibold"
                >
                  👤 {student}
                </button>
                {expandedStudent === student && (
                  <div className="px-4 py-2 bg-white">
                    {topics.map((t, i) => {
                      const score = t.logs.filter(q => q.selected === q.correct).length;
                      return (
                        <div key={i} className="border-b py-2">
                          <p className="font-medium">📘 {t.topic}</p>
                          <p className="text-sm text-gray-600">Score: {score} / {t.logs.length}</p>
                          <ul className="list-disc ml-5 text-sm mt-1 text-gray-700">
                            {t.logs.map((q, idx) => (
                              <li key={idx}>{q.question.slice(0, 40)}... → {q.selected === q.correct ? '✅' : '❌'}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
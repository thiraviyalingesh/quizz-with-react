import jsPDF from "jspdf"; 
import React, { useState } from 'react';
import UploadBox from '../components/UploadBox';
import TableOfContents from './TableOfContents';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const AdminPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // step 1: upload, 2: name, 3: toc
  const [studentName, setStudentName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleParsedQuestions = (parsed: Question[]) => {
    const combined = [...questions, ...parsed];
    setQuestions(combined);
    localStorage.setItem("quizData", JSON.stringify(combined));
    setStep(2); // Go to student name entry
  };

  const handleNameSubmit = () => {
    if (!studentName.trim()) return;
    localStorage.setItem("studentName", studentName.trim());
    setStep(3); // Go to Table of Contents
  };

  const getAllScores = () => {
    const attempts = JSON.parse(localStorage.getItem("attempts") || "{}");
    const scoreLines = Object.entries(attempts).map(([key, logs]: [string, any]) => {
      const score = logs.filter((entry: any) => entry.selected === entry.correct).length;
      return {
        student: key.split("_")[0],
        topic: key.split("_")[1],
        score
      };
    });
    return scoreLines;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {step === 1 && (
        <>
          <UploadBox onFileParsed={handleParsedQuestions} />
        </>
      )}

      {step === 2 && (
        <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
          <label className="block text-lg font-medium mb-2">👤 Enter your name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Your name"
            className="px-4 py-2 border rounded w-full mb-4"
          />
          <button
            onClick={handleNameSubmit}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6">
          <TableOfContents />

          {/* 📊 Student Scores Section */}
          <div className="mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">📊 Student Scores</h2>
            {getAllScores().map((item, idx) => (
              <div
                key={idx}
                className="border-b py-2 flex justify-between text-gray-700"
              >
                <span>{item.student} - {item.topic}</span>
                <span className="font-semibold">{item.score} points</span>
              </div>
            ))}

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => {
                const mailBody = getAllScores()
                  .map(i => `${i.student} - ${i.topic}: ${i.score} marks`)
                  .join("\n");
                const subject = encodeURIComponent("Quiz Scores Report");
                const body = encodeURIComponent(mailBody);
                window.location.href = `mailto:?subject=${subject}&body=${body}`;
              }}
            >
              📧 Send Report via Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

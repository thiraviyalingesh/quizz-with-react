import React, { useState } from 'react';

const StudentEntry: React.FC = () => {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (!name.trim()) return;
    localStorage.setItem('studentName', name.trim());
    window.location.href = "/table"; // (We'll build this page next)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">NEET Physics Quiz App</h1>
      <p className="mb-2 text-lg">Enter your name to continue</p>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 border rounded w-64 mb-4"
      />
      <button
        onClick={handleStart}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StudentEntry;

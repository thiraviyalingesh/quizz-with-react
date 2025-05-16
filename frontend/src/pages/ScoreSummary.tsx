import React, { useEffect } from 'react';

const ScoreSummary: React.FC = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = "/admin";
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded shadow-md max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">✅ Thank you!</h1>
        <p className="text-lg mb-2">Your answers have been submitted successfully.</p>
        <p className="text-lg mb-2">📩 Please check your mail for your results.</p>
        <p className="text-sm text-gray-600 mt-4">You will be redirected to the admin panel shortly...</p>
      </div>
    </div>
  );
};

export default ScoreSummary;
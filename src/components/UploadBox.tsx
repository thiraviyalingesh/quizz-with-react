import React, { useState } from 'react';

interface UploadBoxProps {
  onFileParsed: (questions: any[]) => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ onFileParsed }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const text = await file.text();

    // TODO: Parse text into question format
    const questions = parseQuestions(text);
    onFileParsed(questions);
  };

  // Dummy parser for now
  const parseQuestions = (raw: string): any[] => {
    const blocks = raw.split("Question:").slice(1);
    return blocks.map((block) => {
      const lines = block.trim().split("\n").map(l => l.trim());
      const question = lines[0];
      const options = lines.slice(1, 5).map((line) => line.replace(/^\(\d\)\s*/, ""));
      const answerLine = lines.find(l => l.startsWith("Answer:"));
      const correctAnswer = answerLine ? parseInt(answerLine.match(/\((\d)\)/)?.[1] || "1") - 1 : 0;

      return { question, options, correctAnswer };
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Upload Quiz File (.txt)</h2>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className="mb-2"
      />
      {fileName && <p className="text-sm text-gray-600">Loaded: {fileName}</p>}
    </div>
  );
};

export default UploadBox;

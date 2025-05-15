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
  const lines = raw.split("\n");
  const questions: any[] = [];
  let currentTopic = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect topic headers
    if (/^\d+\.\s.+NEET/i.test(line)) {
      currentTopic = line.split(" - ")[0].replace(/^\d+\.\s*/, '').trim();
      continue;
    }

    if (line.startsWith("Question:")) {
      const question = line.replace("Question:", "").trim();
      const options = [];
      let j = i + 1;
      while (options.length < 4 && j < lines.length) {
        const optLine = lines[j].trim();
        if (optLine.match(/^\(\d\)/)) {
          options.push(optLine.replace(/^\(\d\)\s*/, ""));
        }
        j++;
      }

      let correctAnswer = 0;
      while (j < lines.length) {
        const answerLine = lines[j].trim();
        if (answerLine.startsWith("Answer:")) {
          correctAnswer = parseInt(answerLine.match(/\((\d)\)/)?.[1] || "1") - 1;
          break;
        }
        j++;
      }

      questions.push({ question: `${currentTopic} – ${question}`, options, correctAnswer });
      i = j;
    }
  }

  return questions;
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

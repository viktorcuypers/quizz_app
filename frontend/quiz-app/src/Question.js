// src/Question.js
import React, { useState } from 'react';

function Question({ question, onNext }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerClick = (optionKey) => {
    setSelectedAnswer(optionKey);
    setIsCorrect(optionKey === question.correct_answer);
  };

  const handleNextClick = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    onNext();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-2">
        {['answer_a', 'answer_b', 'answer_c', 'answer_d'].map((optionKey, index) => (
          <button
            key={index}
            className={`block w-full text-left p-3 border rounded-lg 
              ${selectedAnswer === optionKey ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-gray-100'}
              ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => handleAnswerClick(optionKey)}
            disabled={selectedAnswer !== null}
          >
            {question[optionKey]}
          </button>
        ))}
      </div>
      {selectedAnswer && (
        <button
          className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          onClick={handleNextClick}
        >
          Next Question
        </button>
      )}
    </div>
  );
}

export default Question;

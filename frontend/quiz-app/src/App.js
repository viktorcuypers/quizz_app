import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedList, setSelectedList] = useState('db1'); // State to track selected list

  useEffect(() => {
    fetchQuestions(selectedList);
  }, [selectedList]);

  const fetchQuestions = (list) => {
    axios.get(`http://localhost:8080/questions/${list}`)
      .then(response => {
        console.log('API Response:', response.data); // Debugging: Log the response
        const shuffledQuestions = shuffleArray(response.data);
        setQuestions(shuffledQuestions);
      })
      .catch(error => console.error('Error fetching questions:', error));
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setIsCorrect(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(false);
      }, 1000); // Move to the next question after 1 second
    } else {
      setIsCorrect(false);
    }
  };

  const handleListChange = (event) => {
    const newList = event.target.value;
    console.log(`Using list URL: http://localhost:8080/questions/${newList}`);
    setSelectedList(newList);
    setCurrentQuestionIndex(0); // Reset the question index
    setSelectedAnswer(null); // Reset the selected answer
    setIsCorrect(false); // Reset the correctness state
  };

  if (questions.length === 0) return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container">
      <h1 className="title">Quiz App</h1>
      <div className="dropdown-container">
        <label htmlFor="question-list">Select Question List: </label>
        <select id="question-list" value={selectedList} onChange={handleListChange} className="dropdown">
          <option value="db1">Question List 1</option>
          <option value="db2">Question List 2</option>
        </select>
      </div>
      <div className="question-container">
        <h2 className="question">{currentQuestion.question}</h2>
        <div className="answers-container">
          {['a', 'b', 'c', 'd'].map(option => (
            <button
              key={option}
              className={`answer-button ${selectedAnswer === option.toUpperCase() ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleAnswerSelection(option.toUpperCase())}
            >
              {currentQuestion[`answer_${option}`]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
// src/Components/Quiz/QuizSong.jsx
import React, { useState, useEffect } from 'react';
import './QuizSong.css';

const soundtrackData = [
  {
    id: 1,
    game: 'The Legend of Zelda: Breath of the Wild',
    audio: 'https://example.com/zelda-botw-soundtrack.mp3',
    options: ['The Legend of Zelda: Breath of the Wild', 'Super Mario Odyssey', 'The Witcher 3', 'Final Fantasy XV'],
    correctAnswer: 'The Legend of Zelda: Breath of the Wild'
  },
  {
    id: 2,
    game: 'Super Mario Odyssey',
    audio: 'https://example.com/mario-odyssey-soundtrack.mp3',
    options: ['Super Mario Odyssey', 'The Legend of Zelda: Breath of the Wild', 'Animal Crossing', 'Minecraft'],
    correctAnswer: 'Super Mario Odyssey'
  },
];

const QuizSong = ({ onQuizComplete, toggleTheme, isDarkMode, language }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const audioRef = React.useRef(new Audio(soundtrackData[0].audio));

  useEffect(() => {
    audioRef.current.src = soundtrackData[currentQuestion].audio;
    audioRef.current.load();
    setSelectedAnswer(null);
  }, [currentQuestion]);

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === soundtrackData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion + 1 < soundtrackData.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className={`quiz-song ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="quiz-container">
        <h1>{language === 'en' ? 'Soundtrack Quiz' : 'Kuis Soundtrack'}</h1>
        <p>{language === 'en' ? 'Guess the game from its music!' : 'Tebak game dari musiknya!'}</p>
        {!showResult ? (
          <>
            <audio ref={audioRef} controls />
            <div className="options-container">
              {soundtrackData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${selectedAnswer === option ? (option === soundtrackData[currentQuestion].correctAnswer ? 'correct' : 'wrong') : ''}`}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="result-container">
            <h2>{language === 'en' ? 'Quiz Complete!' : 'Kuis Selesai!'}</h2>
            <p>{language === 'en' ? `Your Score: ${score} out of ${soundtrackData.length}` : `Skor Anda: ${score} dari ${soundtrackData.length}`}</p>
            <button className="restart-button" onClick={restartQuiz}>
              {language === 'en' ? 'Play Again' : 'Main Lagi'}
            </button>
            <button className="back-button" onClick={onQuizComplete}>
              {language === 'en' ? 'Back to Menu' : 'Kembali ke Menu'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongQuizzz;
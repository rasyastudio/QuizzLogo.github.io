import React, { useState, useEffect } from 'react';
import './Quiz.css'; // Gunakan Quiz.css dari Quiz.jsx untuk konsistensi

const CartoonQuiz = ({ difficulty, onGameEnd, language, games: externalGames }) => {
  const [gameState, setGameState] = useState('welcome');
  const [currentGame, setCurrentGame] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [games, setGames] = useState(externalGames || []);
  const [revealedLetters, setRevealedLetters] = useState(difficulty?.reveal || 3);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  useEffect(() => {
    if (externalGames && externalGames.length > 0 && gameState === 'playing') {
      setGames(externalGames);
    }
  }, [externalGames, gameState]);

  const generateClue = () => {
    if (!games[currentGame]) return <div>{language === 'en' ? 'Loading...' : 'Memuat...'}</div>;
    const game = games[currentGame];
    const nameClue = game.name.split('').map((char, i) => (i < revealedLetters ? char : '_')).join(' ');
    return (
      <>
        <div className="clue-letters">{nameClue}</div>
        <div className="clue-text">{game.clue?.[language] || 'No clue available'}</div>
      </>
    );
  };

  const handleCheckAnswer = () => {
    if (!difficulty || !games[currentGame]) return;
    const correctAnswer = games[currentGame].name.toLowerCase();
    const userAnswer = answer.trim().toLowerCase();
    if (userAnswer === correctAnswer) {
      setScore((s) => s + difficulty.points);
      setFeedback({ message: language === 'en' ? '🎉 Correct!' : '🎉 Benar!', type: 'success' });
      setTimeout(nextQuestion, 1500);
    } else {
      setFeedback({ message: language === 'en' ? '❌ Try Again!' : '❌ Coba Lagi!', type: 'error' });
    }
  };

  const nextQuestion = () => {
    const totalQuestions = difficulty.questions;
    const newQuestionsAnswered = questionsAnswered + 1;
    if (newQuestionsAnswered >= totalQuestions) {
      setGameState('finished');
      if (onGameEnd) onGameEnd(score, newQuestionsAnswered);
    } else {
      setCurrentGame((prev) => prev + 1);
      setQuestionsAnswered(newQuestionsAnswered);
      setAnswer('');
      setFeedback({ message: '', type: '' });
      setRevealedLetters(difficulty.reveal);
    }
  };

  const revealLetter = () => {
    if (score > 0 && revealedLetters < games[currentGame]?.name.length) {
      setRevealedLetters((prev) => prev + 1);
      setScore((s) => Math.max(0, s - 50));
    }
  };

  const resetGame = () => {
    setGameState('welcome');
    setScore(0);
    setCurrentGame(0);
    setQuestionsAnswered(0);
    setAnswer('');
    setFeedback({ message: '', type: '' });
  };

  return (
    <div className="quiz-app">
      {gameState === 'welcome' ? (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1 className="welcome-title">{language === 'en' ? 'Cartoon Quiz' : 'Kuis Kartun'}</h1>
            <p className="welcome-text">
              {language === 'en' ? 'Guess your favorite cartoons!' : 'Tebak kartun favoritmu!'}
            </p>
            <button className="start-button" onClick={() => setGameState('playing')}>
              {language === 'en' ? 'Start Quiz' : 'Mulai Kuis'}
            </button>
          </div>
        </div>
      ) : gameState === 'playing' ? (
        <div className="game-screen">
          <div className="game-header">
            <div className="score-display">
              🏆 <span>{score}</span> {language === 'en' ? 'Points' : 'Poin'}
            </div>
          </div>
          <div className="main-game-area">
            <div className="logo-card">
              <img
                src={games[currentGame]?.image || 'https://via.placeholder.com/200'}
                alt="Cartoon"
                className="game-logo"
              />
              <div className="logo-overlay">
                <span>#{currentGame + 1}</span>
              </div>
            </div>
            <div className="clue-container">
              {generateClue()}
              <button
                className="hint-button"
                onClick={revealLetter}
                disabled={revealedLetters >= games[currentGame]?.name.length || score < 50}
              >
                🔓 {language === 'en' ? 'Reveal Letter (-50)' : 'Ungkap Huruf (-50)'}
              </button>
            </div>
            <div className="answer-container">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={language === 'en' ? 'Enter cartoon name...' : 'Masukkan nama kartun...'}
                className="answer-input"
              />
              <div className="action-buttons">
                <button className="action-button check-button" onClick={handleCheckAnswer}>
                  ✅ {language === 'en' ? 'Submit' : 'Kirim'}
                </button>
                <button
                  className="action-button skip-button"
                  onClick={nextQuestion}
                  disabled={difficulty?.skips === 0}
                >
                  ⏭ {language === 'en' ? 'Skip' : 'Lewati'}
                </button>
              </div>
            </div>
            {feedback.message && <div className={`feedback ${feedback.type}`}>{feedback.message}</div>}
          </div>
        </div>
      ) : gameState === 'finished' ? (
        <div className="score-screen">
          <div className="header">
            <h1>{language === 'en' ? 'Game Over!' : 'Permainan Selesai!'}</h1>
            <p>{language === 'en' ? 'Your Final Score' : 'Skor Akhir Anda'}</p>
          </div>
          <div className="score-display">
            🏆 <span>{score}</span> {language === 'en' ? 'Points' : 'Poin'}
          </div>
          <p>
            {language === 'en'
              ? `You answered ${questionsAnswered} out of ${difficulty.questions} questions.`
              : `Anda menjawab ${questionsAnswered} dari ${difficulty.questions} pertanyaan.`}
          </p>
          <div className="action-buttons">
            <button className="action-button" onClick={resetGame}>
              {language === 'en' ? 'Play Again' : 'Main Lagi'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CartoonQuiz;
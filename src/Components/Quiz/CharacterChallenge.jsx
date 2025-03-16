// src/Components/Quiz/CharacterChallenge.jsx
import React, { useState } from 'react';
import './CharacterChallenge.css';

const DIFFICULTY_CONFIG = {
  easy: { reveal: 3, skips: Infinity, points: 100, questions: 5 },
  medium: { reveal: 2, skips: 3, points: 150, questions: 10 },
  hard: { reveal: 1, skips: 0, points: 200, questions: 15 },
};

const CharacterChallenge = ({ difficulty, onGameEnd, language, games, onChangeDifficulty }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [revealedLetters, setRevealedLetters] = useState(
    difficulty && DIFFICULTY_CONFIG[difficulty] ? DIFFICULTY_CONFIG[difficulty].reveal : 0
  );
  const [skipsLeft, setSkipsLeft] = useState(
    difficulty && DIFFICULTY_CONFIG[difficulty] ? DIFFICULTY_CONFIG[difficulty].skips : 0
  );
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const generateClue = () => {
    if (!games || !games[currentQuestion]) {
      return <div>{language === 'en' ? 'Loading character...' : 'Memuat karakter...'}</div>;
    }
    const character = games[currentQuestion];
    const nameClue = character.name.split('').map((char, i) => (i < revealedLetters ? char : '_')).join(' ');
    return (
      <>
        <div className="clue-letters">{nameClue}</div>
        <div className="clue-text">{character.clue?.[language] || 'No clue available'}</div>
      </>
    );
  };

  const handleCheckAnswer = () => {
    if (!difficulty || !games[currentQuestion]) return;
    const correctAnswer = games[currentQuestion].name.toLowerCase();
    const userAnswer = answer.trim().toLowerCase();
    if (userAnswer === correctAnswer) {
      setScore((s) => s + DIFFICULTY_CONFIG[difficulty].points);
      setFeedback({ message: language === 'en' ? '🎉 Correct Answer!' : '🎉 Jawaban Benar!', type: 'success' });
      setTimeout(nextQuestion, 1500);
    } else {
      setFeedback({ message: language === 'en' ? '❌ Try Again!' : '❌ Coba Lagi!', type: 'error' });
    }
  };

  const nextQuestion = () => {
    if (!difficulty) return;
    const totalQuestions = Math.min(DIFFICULTY_CONFIG[difficulty].questions, games.length);
    const newQuestionsAnswered = questionsAnswered + 1;

    if (newQuestionsAnswered >= totalQuestions) {
      onGameEnd(score, newQuestionsAnswered);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setQuestionsAnswered(newQuestionsAnswered);
      setAnswer('');
      setFeedback({ message: '', type: '' });
      setRevealedLetters(DIFFICULTY_CONFIG[difficulty].reveal);
    }
  };

  const revealLetter = () => {
    if (!games[currentQuestion] || !difficulty) return;
    if (score >= 50 && revealedLetters < games[currentQuestion].name.length) {
      setRevealedLetters((prev) => prev + 1);
      setScore((s) => Math.max(0, s - 50));
      setFeedback({ message: '', type: '' });
    }
  };

  const skipQuestion = () => {
    if (!difficulty) return;
    if (skipsLeft > 0 || skipsLeft === Infinity) {
      setSkipsLeft((prev) => (prev === Infinity ? Infinity : prev - 1));
      nextQuestion();
    }
  };

  if (!games || games.length === 0) {
    return <div>{language === 'en' ? 'Loading...' : 'Memuat...'}</div>;
  }

  return (
    <div className="game-screen">
      <div className="game-header">
        <div className="navigation-buttons">
          <button className="back-button" onClick={onChangeDifficulty}>
            ◀ {language === 'en' ? 'Change Difficulty' : 'Ganti Kesulitan'}
          </button>
        </div>
        <div className="score-display">
          🏆 <span>{score}</span> {language === 'en' ? 'Points' : 'Poin'}
        </div>
      </div>
      <div className="main-game-area">
        <div className="logo-card">
          <img
            src={games[currentQuestion].image || 'https://via.placeholder.com/300'}
            alt="Character"
            className="game-logo"
          />
          <div className="logo-overlay">
            <span>#{currentQuestion + 1}</span>
          </div>
        </div>
        <div className="clue-container">
          {generateClue()}
          <button
            className="hint-button"
            onClick={revealLetter}
            disabled={revealedLetters >= games[currentQuestion].name.length || score < 50}
          >
            🔓 {language === 'en' ? 'Reveal Letter (-50)' : 'Ungkap Huruf (-50)'}
          </button>
        </div>
        <div className="answer-container">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={language === 'en' ? 'Enter character name...' : 'Masukkan nama karakter...'}
            className="answer-input"
          />
          <div className="action-buttons">
            <button className="action-button check-button" onClick={handleCheckAnswer}>
              ✅ {language === 'en' ? 'Submit Answer' : 'Kirim Jawaban'}
            </button>
            <button
              className="action-button skip-button"
              onClick={skipQuestion}
              disabled={skipsLeft === 0}
            >
              ⏭ {language === 'en' ? 'Skip' : 'Lewati'} {skipsLeft === Infinity ? '∞' : skipsLeft}
            </button>
          </div>
        </div>
        {feedback.message && (
          <div className={`feedback ${feedback.type}`}>{feedback.message}</div>
        )}
      </div>
    </div>
  );
};

export default CharacterChallenge;
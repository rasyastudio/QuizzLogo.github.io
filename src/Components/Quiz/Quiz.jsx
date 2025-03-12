// quiz.jsx (tanpa perubahan besar, hanya memastikan struktur tetap)
import { useState } from 'react';
import gameLogo from './gameLogo';
import './Quiz.css';

const DIFFICULTY_CONFIG = {
  easy: { reveal: 3, skips: Infinity, points: 100, questions: 5 },
  medium: { reveal: 2, skips: 3, points: 150, questions: 10 },
  hard: { reveal: 1, skips: 0, points: 200, questions: 15 },
};

const CATEGORIES = ['All', 'FPS', 'RPG', 'Puzzle', 'Open World', 'MOBA', 'Strategy', 'Sports', 'Action/Adventure'];

const Quiz = () => {
  const [gameState, setGameState] = useState('welcome');
  const [currentGame, setCurrentGame] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [games, setGames] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [revealedLetters, setRevealedLetters] = useState(0);
  const [category, setCategory] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    let filteredGames;

    if (category === 'All') {
      filteredGames = gameLogo;
    } else {
      filteredGames = gameLogo.filter((game) => game.category === category);
    }

    const shuffled = [...filteredGames]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(DIFFICULTY_CONFIG[selectedDifficulty].questions, filteredGames.length));
    setGames(shuffled);
    setGameState('playing');
    setRevealedLetters(DIFFICULTY_CONFIG[selectedDifficulty].reveal);
    setCurrentGame(0);
    setScore(0);
    setQuestionsAnswered(0);
  };

  const generateClue = () => {
    const name = games[currentGame]?.name || '';
    return name.split('').map((char, i) => (i < revealedLetters ? char : '_')).join(' ');
  };

  const handleCheckAnswer = () => {
    const correctAnswer = games[currentGame]?.name.toLowerCase();
    const userAnswer = answer.trim().toLowerCase();
    if (userAnswer === correctAnswer) {
      setScore((s) => s + DIFFICULTY_CONFIG[difficulty].points);
      setFeedback({ message: '🎉 Correct Answer!', type: 'success' });
      setTimeout(nextQuestion, 1500);
    } else {
      setFeedback({ message: '❌ Try Again!', type: 'error' });
    }
  };

  const nextQuestion = () => {
    const totalQuestions = Math.min(DIFFICULTY_CONFIG[difficulty].questions, games.length);
    const newQuestionsAnswered = questionsAnswered + 1;

    if (newQuestionsAnswered >= totalQuestions) {
      setGameState('finished');
    } else {
      setCurrentGame((prev) => prev + 1);
      setQuestionsAnswered(newQuestionsAnswered);
      setAnswer('');
      setFeedback({ message: '', type: '' });
      setRevealedLetters(DIFFICULTY_CONFIG[difficulty].reveal);
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
    setCategory(null);
    setDifficulty(null);
    setGames([]);
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
            <h1 className="welcome-title">Welcome to Guess The Game</h1>
            <p className="welcome-text">
              Put your gaming knowledge to the test! Identify popular game titles 
              from their logos across various categories and difficulty levels.
            </p>
            <div className="welcome-stats">
              <div className="stat-item">
                <span className="stat-emoji">🎮</span>
                <span>{gameLogo.length} Games</span>
              </div>
              <div className="stat-item">
                <span className="stat-emoji">📊</span>
                <span>9 Categories</span>
              </div>
              <div className="stat-item">
                <span className="stat-emoji">⭐</span>
                <span>3 Difficulties</span>
              </div>
            </div>
            <button 
              className="start-button"
              onClick={() => setGameState('category-select')}
            >
              Start Quiz
            </button>
          </div>
        </div>
      ) : gameState === 'category-select' ? (
        <div className="category-select-screen">
          <div className="header">
            <h1>Guess The Game</h1>
            <p>Select a category to start</p>
            {feedback.message && (
              <div className={`feedback ${feedback.type}`}>{feedback.message}</div>
            )}
            <button 
              className="home-button"
              onClick={() => setGameState('welcome')}
            >
              🏠 Back to Home
            </button>
          </div>
          <div className="category-cards">
            {CATEGORIES.map((cat) => {
              const availableGames = cat === 'All' 
                ? gameLogo.length 
                : gameLogo.filter((game) => game.category === cat).length;
              const isDisabled = availableGames === 0;
              return (
                <div
                  key={cat}
                  className={`category-card ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => {
                    if (!isDisabled) {
                      setCategory(cat);
                      setFeedback({ message: '', type: '' });
                      setGameState('difficulty-select');
                    }
                  }}
                >
                  <div className="card-content">
                    <h3>{cat}</h3>
                    <p>{availableGames} games available</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : gameState === 'difficulty-select' ? (
        <div className="difficulty-select-screen">
          <div className="header">
            <h1>Guess The Game - {category}</h1>
            <p>Select difficulty to start</p>
            <div className="navigation-buttons">
              <button
                className="back-button"
                onClick={() => setGameState('category-select')}
              >
                ◀ Change Category
              </button>
              <button 
                className="home-button"
                onClick={() => setGameState('welcome')}
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
          <div className="difficulty-cards">
            {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
              <div key={key} className={`difficulty-card ${key}`} onClick={() => startGame(key)}>
                <div className="card-content">
                  <h3>{key.toUpperCase()}</h3>
                  <div className="card-details">
                    <p>⚡ {config.reveal} Letters Revealed</p>
                    <p>🔄 {config.skips === 0 ? 'No' : config.skips} Skips</p>
                    <p>📝 {config.questions} Questions</p>
                    <p>🏆 {config.points} Points/Correct</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : gameState === 'playing' ? (
        <div className="game-screen">
          <div className="game-header">
            <div className="navigation-buttons">
              <button
                className="back-button"
                onClick={() => setGameState('difficulty-select')}
              >
                ◀ Change Difficulty
              </button>
              <button 
                className="home-button"
                onClick={() => setGameState('welcome')}
              >
                🏠 Back to Home
              </button>
            </div>
            <div className="score-display">
              🏆 <span>{score}</span> Points
            </div>
          </div>
          <div className="main-game-area">
            <div className="logo-card">
              <img
                src={games[currentGame]?.image}
                alt="Game logo"
                className="game-logo"
              />
              <div className="logo-overlay">
                <span>#{currentGame + 1}</span>
              </div>
            </div>
            <div className="clue-container">
              <div className="clue-letters">{generateClue()}</div>
              <button
                className="hint-button"
                onClick={revealLetter}
                disabled={revealedLetters >= games[currentGame]?.name.length || score < 50}
              >
                🔓 Reveal Letter (-50)
              </button>
            </div>
            <div className="answer-container">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type game name..."
                className="answer-input"
              />
              <div className="action-buttons">
                <button className="action-button check-button" onClick={handleCheckAnswer}>
                  ✅ Submit Answer
                </button>
                <button
                  className="action-button skip-button"
                  onClick={nextQuestion}
                  disabled={DIFFICULTY_CONFIG[difficulty].skips === 0}
                >
                  ⏭ Skip Question
                </button>
              </div>
            </div>
            {feedback.message && (
              <div className={`feedback ${feedback.type}`}>{feedback.message}</div>
            )}
          </div>
        </div>
      ) : gameState === 'finished' ? (
        <div className="score-screen">
          <div className="header">
            <h1>Game Over!</h1>
            <p>Your Final Score</p>
          </div>
          <div className="score-display">
            🏆 <span>{score}</span> Points
          </div>
          <p>You answered {questionsAnswered} questions in {category} category ({difficulty} mode).</p>
          <div className="action-buttons">
            <button className="action-button" onClick={resetGame}>
              Play Again
            </button>
            <button className="action-button" onClick={() => setGameState('category-select')}>
              Change Category
            </button>
            <button 
              className="action-button home-button"
              onClick={() => setGameState('welcome')}
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
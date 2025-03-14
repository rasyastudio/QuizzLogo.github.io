import { useState } from 'react';
import Navbar from './navbar'; // Impor Navbar
import gameLogo from './gameLogo'; // Pastikan path sesuai
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState('en');

  console.log('Current gameState:', gameState);
  console.log('Games array:', games);
  console.log('Category:', category);
  console.log('Difficulty:', difficulty);

  const startGame = (selectedDifficulty) => {
    console.log('Starting game with difficulty:', selectedDifficulty);
    if (!category) {
      console.error('Category not set');
      setFeedback({ message: language === 'en' ? 'Please select a category first!' : 'Pilih kategori terlebih dahulu!', type: 'error' });
      return;
    }

    if (!gameLogo || !Array.isArray(gameLogo)) {
      console.error('gameLogo is not valid:', gameLogo);
      setFeedback({ message: language === 'en' ? 'Game data not available!' : 'Data game tidak tersedia!', type: 'error' });
      setGameState('welcome');
      return;
    }

    setDifficulty(selectedDifficulty);
    let filteredGames;

    try {
      if (category === 'All') {
        filteredGames = gameLogo;
      } else {
        filteredGames = gameLogo.filter((game) => game.category === category);
      }

      console.log('Filtered games:', filteredGames);

      if (!filteredGames.length) {
        console.error('No games available for category:', category);
        setFeedback({ message: language === 'en' ? 'No games available for this category!' : 'Tidak ada game untuk kategori ini!', type: 'error' });
        setGameState('category-select');
        return;
      }

      const shuffled = [...filteredGames]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(DIFFICULTY_CONFIG[selectedDifficulty].questions, filteredGames.length));
      console.log('Shuffled games:', shuffled);
      setGames(shuffled);
      setGameState('playing');
      setRevealedLetters(DIFFICULTY_CONFIG[selectedDifficulty].reveal);
      setCurrentGame(0);
      setScore(0);
      setQuestionsAnswered(0);
    } catch (error) {
      console.error('Error in startGame:', error);
      setFeedback({ message: language === 'en' ? 'Something went wrong!' : 'Ada yang salah!', type: 'error' });
    }
  };

  const generateClue = () => {
    if (!games || !games[currentGame]) {
      console.log('No game data available yet');
      return <div>{language === 'en' ? 'Loading game...' : 'Memuat game...'}</div>;
    }
    const game = games[currentGame];
    console.log('Current game:', game);
    const nameClue = game.name.split('').map((char, i) => (i < revealedLetters ? char : '_')).join(' ');
    return (
      <>
        <div className="clue-letters">{nameClue}</div>
        <div className="clue-text">{game.clue?.[language] || 'No clue available'}</div>
      </>
    );
  };

  const handleCheckAnswer = () => {
    const correctAnswer = games[currentGame]?.name.toLowerCase();
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

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  return (
    <div className={`quiz-app ${isDarkMode ? 'dark' : 'light'}`}>
      <Navbar 
        toggleTheme={toggleTheme} 
        isDarkMode={isDarkMode} 
        toggleLanguage={toggleLanguage} 
        language={language} 
      />
      {gameState === 'welcome' ? (
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1 className="welcome-title">{language === 'en' ? 'Welcome to Guess The Game' : 'Selamat Datang di Tebak Game'}</h1>
            <p className="welcome-text">
              {language === 'en'
                ? 'Put your gaming knowledge to the test! Identify popular game titles from their logos across various categories and difficulty levels.'
                : 'Uji pengetahuan gaming Anda! Tebak judul game populer dari logo mereka di berbagai kategori dan tingkat kesulitan.'}
            </p>
            <div className="welcome-stats">
              <div className="stat-item">
                <span className="stat-emoji">🎮</span>
                <span>{gameLogo?.length || 0} {language === 'en' ? 'Games' : 'Game'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-emoji">📊</span>
                <span>9 {language === 'en' ? 'Categories' : 'Kategori'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-emoji">⭐</span>
                <span>3 {language === 'en' ? 'Difficulties' : 'Tingkat Kesulitan'}</span>
              </div>
            </div>
            <button 
              className="start-button"
              onClick={() => setGameState('category-select')}
            >
              {language === 'en' ? 'Start Quiz' : 'Mulai Kuis'}
            </button>
          </div>
        </div>
      ) : gameState === 'category-select' ? (
        <div className="category-select-screen">
          <div className="header">
            <h1>{language === 'en' ? 'Guess The Game' : 'Tebak Game'}</h1>
            <p>{language === 'en' ? 'Select a category to start' : 'Pilih kategori untuk memulai'}</p>
            {feedback.message && (
              <div className={`feedback ${feedback.type}`}>{feedback.message}</div>
            )}
          </div>
          <div className="category-cards">
            {CATEGORIES.map((cat) => {
              const availableGames = cat === 'All' 
                ? (gameLogo?.length || 0) 
                : (gameLogo || []).filter((game) => game.category === cat).length;
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
                    <p>{availableGames} {language === 'en' ? 'games available' : 'game tersedia'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : gameState === 'difficulty-select' ? (
        <div className="difficulty-select-screen">
          <div className="header">
            <h1>{language === 'en' ? `Guess The Game - ${category || 'No Category'}` : `Tebak Game - ${category || 'Tanpa Kategori'}`}</h1>
            <p>{language === 'en' ? 'Select difficulty to start' : 'Pilih tingkat kesulitan untuk memulai'}</p>
            <div className="navigation-buttons">
              <button
                className="back-button"
                onClick={() => setGameState('category-select')}
              >
                ◀ {language === 'en' ? 'Change Category' : 'Ganti Kategori'}
              </button>
            </div>
          </div>
          <div className="difficulty-cards">
            {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
              <div key={key} className={`difficulty-card ${key}`} onClick={() => startGame(key)}>
                <div className="card-content">
                  <h3>{key.toUpperCase()}</h3>
                  <div className="card-details">
                    <p>⚡ {config.reveal} {language === 'en' ? 'Letters Revealed' : 'Huruf Terungkap'}</p>
                    <p>🔄 {config.skips === 0 ? (language === 'en' ? 'No' : 'Tanpa') : config.skips} {language === 'en' ? 'Skips' : 'Lewati'}</p>
                    <p>📝 {config.questions} {language === 'en' ? 'Questions' : 'Pertanyaan'}</p>
                    <p>🏆 {config.points} {language === 'en' ? 'Points/Correct' : 'Poin/Benar'}</p>
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
                src={games[currentGame]?.image || 'https://via.placeholder.com/200'}
                alt="Game logo"
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
                placeholder={language === 'en' ? 'Type game name...' : 'Ketik nama game...'}
                className="answer-input"
              />
              <div className="action-buttons">
                <button className="action-button check-button" onClick={handleCheckAnswer}>
                  ✅ {language === 'en' ? 'Submit Answer' : 'Kirim Jawaban'}
                </button>
                <button
                  className="action-button skip-button"
                  onClick={nextQuestion}
                  disabled={DIFFICULTY_CONFIG[difficulty]?.skips === 0}
                >
                  ⏭ {language === 'en' ? 'Skip Question' : 'Lewati Pertanyaan'}
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
            <h1>{language === 'en' ? 'Game Over!' : 'Permainan Selesai!'}</h1>
            <p>{language === 'en' ? 'Your Final Score' : 'Skor Akhir Anda'}</p>
          </div>
          <div className="score-display">
            🏆 <span>{score}</span> {language === 'en' ? 'Points' : 'Poin'}
          </div>
          <p>
            {language === 'en'
              ? `You answered ${questionsAnswered} questions in ${category} category (${difficulty} mode).`
              : `Anda menjawab ${questionsAnswered} pertanyaan di kategori ${category} (mode ${difficulty}).`}
          </p>
          <div className="action-buttons">
            <button className="action-button" onClick={resetGame}>
              {language === 'en' ? 'Play Again' : 'Main Lagi'}
            </button>
            <button className="action-button" onClick={() => setGameState('category-select')}>
              {language === 'en' ? 'Change Category' : 'Ganti Kategori'}
            </button>
          </div>
        </div>
      ) : (
        <div>{language === 'en' ? 'Unknown state' : 'Status tidak dikenal'}</div>
      )}
    </div>
  );
};

export default Quiz;
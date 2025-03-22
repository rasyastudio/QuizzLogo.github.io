import React, { useState } from 'react';
import Navbar from './navbar';
import LandingPage from './LandingPage';
import Intro from './Intro';
import CharacterChallenge from './CharacterChallenge';
import SoundtrackQuiz from './SoundtrackQuiz';
import CartoonQuiz from './CartoonQuiz'; // Impor CartoonQuiz
import gameLogo from './gameLogo';
import characterData from './characterData';
import { soundtrackData } from './SoundtrackQuiz';
import './Quiz.css';

// Data kartun dari CartoonQuiz (bisa dipisah ke file terpisah jika diinginkan)
const cartoonData = [
  { name: "SpongeBob SquarePants", image: "https://m.media-amazon.com/images/M/MV5BNDUwNjBkMmUtZjM2My00NmM4LTlmOWQtNWE5YTdmN2Y2MTgxXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_.jpg", clue: { en: "Lives in a pineapple under the sea", id: "Tinggal di nanas di bawah laut" } },
  { name: "Tom and Jerry", image: "https://www.cartoonbrew.com/wp-content/uploads/2023/10/tom_and_jerry_featured.jpg", clue: { en: "A cat and mouse chase", id: "Kucing dan tikus kejar-kejaran" } },
  { name: "The Simpsons", image: "https://www.pngplay.com/wp-content/uploads/10/The-Simpsons-PNG-Clipart-Background.png", clue: { en: "Yellow family from Springfield", id: "Keluarga kuning dari Springfield" } },
  { name: "Scooby Doo", image: "https://mmc.tirto.id/image/otf/640x0/2020/05/29/film-scoob_ratio-16x9.jpg", clue: { en: "A mystery-solving dog and friends", id: "Anjing penyelesai misteri dan teman-temannya" } },
  { name: "Looney Tunes", image: "https://m.media-amazon.com/images/S/pv-target-images/65ba7fe8bc89a34f0506a3baa3e5a575adda9d74bf0f197980dfcbd93587fd3c.jpg", clue: { en: "Bugs Bunny and friends", id: "Bugs Bunny dan teman-temannya" } },
  { name: "Avatar The Last Airbender", image: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/06/avatar-the-last-airbender-Cropped.jpg", clue: { en: "A boy who controls the elements", id: "Anak laki-laki yang mengendalikan elemen" } },
  { name: "Teen Titans", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjBlE3GdlKgAbZSiS5YSmPSZKuobAQua3-Tg&s", clue: { en: "Young superheroes fighting crime", id: "Pahlawan super muda melawan kejahatan" } },
  { name: "Phineas and Ferb", image: "https://cloudfront-us-east-1.images.arcpublishing.com/coxohio/YRH4YZT3WBH7XNK6EFNCH2Q7KY.jpeg", clue: { en: "Stepbrothers inventing during summer", id: "Saudara tiri yang menciptakan sesuatu di musim panas" } },
  { name: "Adventure Time", image: "https://images.newrepublic.com/fd2897148e0f8a0f2af82625c4d438fd44ff0f5b.jpeg?auto=format&fit=crop&crop=faces&q=65&w=1000&ar=3%3A2&ixlib=react-9.10.0", clue: { en: "A boy and his magical dog in a strange land", id: "Anak laki-laki dan anjing ajaibnya di negeri aneh" } },
  { name: "Pokemon", image: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/01/Pokemon-Ash-Pikachu.jpg", clue: { en: "Catch and train creatures", id: "Menangkap dan melatih makhluk" } },
  { name: "Dora", image: "https://m.media-amazon.com/images/M/MV5BMjM0MTIyMTk4M15BMl5BanBnXkFtZTgwODQzODQ2MjE@._V1_FMjpg_UX1000_.jpg", clue: { en: "A girl exploring with her monkey friend", id: "Gadis yang menjelajah bersama teman monyetnya" } },
  { name: "The Powerpuff Girls", image: "https://m.media-amazon.com/images/S/pv-target-images/b46cf039cc901fd29f95d1ade7d6052fef0258d4be75db84c61be467c737a92b._SX1080_FMjpg_.jpg", clue: { en: "Three super-powered sisters", id: "Tiga saudari dengan kekuatan super" } },
  { name: "Ben 10", image: "https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABR6vn8BtaC8r6FhDOfMCliOri5vm4p5bCnxzV61blyd_QJP0qr8VdYGGyoFxkLfwDc1nDVqf4ilKrmD1XquOAlXD29EyAM4UbC4i.jpg?r=54a", clue: { en: "A boy with an alien watch", id: "Anak laki-laki dengan jam alien" } },
];

const DIFFICULTY_CONFIG = {
  easy: { reveal: 3, skips: Infinity, points: 100, questions: 5 },
  medium: { reveal: 2, skips: 3, points: 150, questions: 10 },
  hard: { reveal: 1, skips: 0, points: 200, questions: 15 },
};

const CATEGORIES = ['All', 'FPS', 'RPG', 'Puzzle', 'Open World', 'MOBA', 'Strategy', 'Sports', 'Action/Adventure'];

const QUIZ_ID_TO_CATEGORY = {
  1: 'All',
  2: 'Action/Adventure',
  3: 'All',
  4: 'All', // Tambahkan untuk Cartoon Quiz
};

const QUIZ_ID_TO_NAME = {
  1: 'Logo Quiz',
  2: 'Character Challenge',
  3: 'Soundtrack Quiz',
  4: 'Cartoon Quiz', // Tambahkan untuk Cartoon Quiz
};

const Quiz = () => {
  const [gameState, setGameState] = useState('landing');
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
  const [quizId, setQuizId] = useState(null);

  const handleLandingComplete = (selectedQuizId) => {
    console.log('handleLandingComplete called with quizId:', selectedQuizId);
    if (selectedQuizId && [1, 2, 3, 4].includes(selectedQuizId)) { // Tambahkan 4 ke daftar valid
      const selectedCategory = QUIZ_ID_TO_CATEGORY[selectedQuizId];
      setCategory(selectedCategory);
      setQuizId(selectedQuizId);
      setGameState('difficulty-select');
    } else {
      console.error('Invalid quizId:', selectedQuizId);
      setGameState('intro');
      setFeedback({ message: language === 'en' ? 'Invalid quiz selection!' : 'Pilihan kuis tidak valid!', type: 'error' });
    }
  };

  const handleIntroComplete = () => {
    setGameState('welcome');
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  const startGame = (selectedDifficulty) => {
    console.log('startGame called - Initial State:', {
      quizId,
      category,
      selectedDifficulty,
      difficulty: DIFFICULTY_CONFIG[selectedDifficulty],
    });
    if (!category || !quizId || ![1, 2, 3, 4].includes(quizId)) { // Tambahkan 4 ke daftar valid
      console.error('Validation failed - category:', category, 'quizId:', quizId);
      setFeedback({ message: language === 'en' ? 'Invalid quiz selection!' : 'Pilihan kuis tidak valid!', type: 'error' });
      setGameState('landing');
      return;
    }

    setDifficulty(DIFFICULTY_CONFIG[selectedDifficulty] || DIFFICULTY_CONFIG.easy);
    let filteredGames;

    try {
      console.log('Attempting to load data for quizId:', quizId);
      if (quizId === 1) {
        console.log('Loading gameLogo:', gameLogo);
        if (!gameLogo || !Array.isArray(gameLogo)) {
          console.error('Game data invalid:', gameLogo);
          setFeedback({ message: language === 'en' ? 'Game data not available!' : 'Data game tidak tersedia!', type: 'error' });
          setGameState('welcome');
          return;
        }
        filteredGames = category === 'All' ? gameLogo : gameLogo.filter((game) => game.category === category);
      } else if (quizId === 2) {
        console.log('Loading characterData:', characterData);
        if (!characterData || !Array.isArray(characterData)) {
          console.error('Character data invalid:', characterData);
          setFeedback({ message: language === 'en' ? 'Character data not available!' : 'Data karakter tidak tersedia!', type: 'error' });
          setGameState('welcome');
          return;
        }
        filteredGames = characterData;
      } else if (quizId === 3) {
        console.log('Loading soundtrackData:', soundtrackData);
        if (!soundtrackData || !Array.isArray(soundtrackData)) {
          console.error('Soundtrack data invalid:', soundtrackData);
          setFeedback({ message: language === 'en' ? 'Soundtrack data not available!' : 'Data soundtrack tidak tersedia!', type: 'error' });
          setGameState('welcome');
          return;
        }
        filteredGames = soundtrackData;
      } else if (quizId === 4) { // Tambahkan logika untuk Cartoon Quiz
        console.log('Loading cartoonData:', cartoonData);
        if (!cartoonData || !Array.isArray(cartoonData)) {
          console.error('Cartoon data invalid:', cartoonData);
          setFeedback({ message: language === 'en' ? 'Cartoon data not available!' : 'Data kartun tidak tersedia!', type: 'error' });
          setGameState('welcome');
          return;
        }
        filteredGames = cartoonData;
      }

      console.log('Filtered games length:', filteredGames?.length);
      if (!filteredGames || !filteredGames.length) {
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

      setTimeout(() => {
        console.log('Setting game state to playing with games:', games);
        setGameState('playing');
        setRevealedLetters(DIFFICULTY_CONFIG[selectedDifficulty].reveal || 3);
        setCurrentGame(0);
        setScore(0);
        setQuestionsAnswered(0);
      }, 0);
    } catch (error) {
      console.error('Error in startGame:', error);
      setFeedback({ message: language === 'en' ? 'Something went wrong!' : 'Ada yang salah!', type: 'error' });
      setGameState('landing');
    }
  };

  const generateClue = () => {
    if (!games || !games[currentGame]) {
      return <div>{language === 'en' ? 'Loading game...' : 'Memuat game...'}</div>;
    }
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
      setScore((s) => s + (difficulty.points || 100));
      setFeedback({ message: language === 'en' ? '🎉 Correct Answer!' : '🎉 Jawaban Benar!', type: 'success' });
      setTimeout(nextQuestion, 1500);
    } else {
      setFeedback({ message: language === 'en' ? '❌ Try Again!' : '❌ Coba Lagi!', type: 'error' });
    }
  };

  const nextQuestion = () => {
    if (!difficulty) return;
    const totalQuestions = Math.min(difficulty.questions, games.length);
    const newQuestionsAnswered = questionsAnswered + 1;

    if (newQuestionsAnswered >= totalQuestions) {
      setGameState('finished');
    } else {
      setCurrentGame((prev) => prev + 1);
      setQuestionsAnswered(newQuestionsAnswered);
      setAnswer('');
      setFeedback({ message: '', type: '' });
      setRevealedLetters(difficulty.reveal || 3);
    }
  };

  const revealLetter = () => {
    if (!games[currentGame]) return;
    if (score > 0 && revealedLetters < games[currentGame].name.length) {
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
    setQuizId(null);
  };

  return (
    <div className={`quiz-app ${isDarkMode ? 'dark' : 'light'}`}>
      {gameState === 'landing' ? (
        <LandingPage
          onLandingComplete={handleLandingComplete}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          toggleLanguage={toggleLanguage}
          language={language}
        />
      ) : gameState === 'intro' ? (
        <Intro onIntroComplete={handleIntroComplete} />
      ) : (
        <>
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
                    ? 'Put your gaming knowledge to the test! Identify popular game titles from their logos, characters, soundtracks, or cartoons.'
                    : 'Uji pengetahuan gaming Anda! Tebak judul game populer dari logo, karakter, soundtrack, atau kartun mereka.'}
                </p>
                <button className="start-button" onClick={() => setGameState('category-select')}>
                  {language === 'en' ? 'Start Quiz' : 'Mulai Kuis'}
                </button>
              </div>
            </div>
          ) : gameState === 'category-select' ? (
            <div className="category-select-screen">
              <div className="header">
                <h1>{language === 'en' ? 'Guess The Game' : 'Tebak Game'}</h1>
                <p>{language === 'en' ? 'Select a category to start' : 'Pilih kategori untuk memulai'}</p>
                {feedback.message && <div className={`feedback ${feedback.type}`}>{feedback.message}</div>}
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
                <p>
                  {language === 'en'
                    ? `Select difficulty to start ${quizId ? QUIZ_ID_TO_NAME[quizId] : ''}`
                    : `Pilih tingkat kesulitan untuk memulai ${quizId ? QUIZ_ID_TO_NAME[quizId] : ''}`}
                </p>
                <div className="navigation-buttons">
                  <button className="back-button" onClick={() => setGameState('category-select')}>
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
            quizId === 1 ? (
              <div className="game-screen">
                <div className="game-header">
                  <div className="navigation-buttons">
                    <button className="back-button" onClick={() => setGameState('difficulty-select')}>
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
                        disabled={difficulty?.skips === 0}
                      >
                        ⏭ {language === 'en' ? 'Skip Question' : 'Lewati Pertanyaan'}
                      </button>
                    </div>
                  </div>
                  {feedback.message && <div className={`feedback ${feedback.type}`}>{feedback.message}</div>}
                </div>
              </div>
            ) : quizId === 2 ? (
              <CharacterChallenge
                difficulty={difficulty || DIFFICULTY_CONFIG.easy}
                onGameEnd={(finalScore, answered) => {
                  setScore(finalScore || 0);
                  setQuestionsAnswered(answered || 0);
                  setGameState('finished');
                }}
                language={language}
                games={games}
              />
            ) : quizId === 3 ? (
              <SoundtrackQuiz
                difficulty={difficulty || DIFFICULTY_CONFIG.easy}
                onGameEnd={(finalScore, answered) => {
                  setScore(finalScore || 0);
                  setQuestionsAnswered(answered || 0);
                  setGameState('finished');
                }}
                language={language}
                games={games}
              />
            ) : quizId === 4 ? ( // Tambahkan CartoonQuiz
              <CartoonQuiz
                difficulty={difficulty || DIFFICULTY_CONFIG.easy}
                onGameEnd={(finalScore, answered) => {
                  setScore(finalScore || 0);
                  setQuestionsAnswered(answered || 0);
                  setGameState('finished');
                }}
                language={language}
                games={games}
              />
            ) : (
              <div className="error-state">
                {language === 'en' ? 'Invalid quiz selected!' : 'Kuis tidak valid dipilih!'}
              </div>
            )
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
                  ? `You answered ${questionsAnswered} questions in ${category} category (${difficulty ? difficulty : 'unknown'} mode).`
                  : `Anda menjawab ${questionsAnswered} pertanyaan di kategori ${category} (mode ${difficulty ? difficulty : 'tidak diketahui'}).`}
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
            <div className="error-state">
              {language === 'en' ? 'Unknown state: ' : 'Status tidak dikenal: '} {gameState}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
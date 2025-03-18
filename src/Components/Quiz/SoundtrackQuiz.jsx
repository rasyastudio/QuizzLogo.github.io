import React, { useState, useEffect, useRef } from 'react';
import './SoundtrackQuiz.css';

export const soundtrackData = [
  {
    id: 1,
    game: 'The Legend of Zelda: Breath of the Wild',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    options: [
      'The Legend of Zelda: Breath of the Wild',
      'Super Mario Odyssey',
      'The Witcher 3: Wild Hunt',
      'Final Fantasy VII',
    ],
  },
  {
    id: 2,
    game: 'Super Mario Odyssey',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    options: [
      'Super Mario Odyssey',
      'The Legend of Zelda: Breath of the Wild',
      'Hollow Knight',
      'Stardew Valley',
    ],
  },
];

const SoundtrackQuiz = ({ difficulty, onGameEnd, language, games = soundtrackData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const totalQuestions = Math.min(difficulty?.questions || 5, games.length); // Default ke 5 jika undefined

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(games[currentQuestion].audio);
    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio load error:', e);
      setFeedback({ message: language === 'en' ? 'Failed to load audio!' : 'Gagal memuat audio!', type: 'error' });
    });
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentQuestion, games, language]);

  const handlePlayAudio = () => {
    if (!audioRef.current) return;
    if (!isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log('Audio playing:', games[currentQuestion].audio);
        })
        .catch((err) => {
          console.error('Audio play error:', err);
          setFeedback({ message: language === 'en' ? 'Cannot play audio!' : 'Tidak dapat memutar audio!', type: 'error' });
        });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log('Audio paused');
    }
  };

  const handleAnswer = (selectedOption) => {
    const correctAnswer = games[currentQuestion].game;
    if (selectedOption === correctAnswer) {
      setScore((prev) => prev + (difficulty?.points || 100)); // Default ke 100 jika undefined
      setFeedback({ message: language === 'en' ? '🎉 Correct!' : '🎉 Benar!', type: 'success' });
      setTimeout(nextQuestion, 1500);
    } else {
      setFeedback({ message: language === 'en' ? '❌ Wrong!' : '❌ Salah!', type: 'error' });
    }
  };

  const nextQuestion = () => {
    const newQuestionsAnswered = questionsAnswered + 1;
    if (newQuestionsAnswered >= totalQuestions) {
      if (audioRef.current) audioRef.current.pause();
      onGameEnd(score, newQuestionsAnswered);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setQuestionsAnswered(newQuestionsAnswered);
      setFeedback({ message: '', type: '' });
      setIsPlaying(false);
    }
  };

  return (
    <div className="soundtrack-quiz">
      <div className="quiz-header">
        <div className="score-display">
          🏆 <span>{score}</span> {language === 'en' ? 'Points' : 'Poin'}
        </div>
        <div className="progress">
          {language === 'en' ? 'Question' : 'Pertanyaan'} {currentQuestion + 1}/{totalQuestions}
        </div>
      </div>
      <div className="quiz-content">
        <button className="play-audio-button" onClick={handlePlayAudio}>
          {isPlaying ? '⏸ Pause' : '▶ Play Soundtrack'}
        </button>
        <div className="options">
          {games[currentQuestion].options.map((option) => (
            <button
              key={option}
              className="option-button"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback.message && <div className={`feedback ${feedback.type}`}>{feedback.message}</div>}
      </div>
    </div>
  );
};

export default SoundtrackQuiz;
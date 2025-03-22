import React, { useRef } from 'react';
import Navbar from './navbar';
import './LandingPage.css';

const QUIZ_IMAGES = {
  logo: 'https://i.ytimg.com/vi/qYaxJR0wpsY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAS8NJnCPJGAlhqv20ivDe0nztcCA',
  character: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_9smGzmmaESG1HO8n8cFK8zlJh3jDWfC_6Q&s',
  soundtrack: 'https://cdn.prod.website-files.com/61c070585317d2b435a597a4/676aa9133818034b430fc7c3_Song%20Quiz%20Roku.png',
  cartoon: 'https://img.goodfon.com/wallpaper/big/c/aa/filmy-fon-multik-gadkiy-ya-2.webp', // Gambar contoh untuk Cartoon Quiz
};

const LandingPage = ({ onLandingComplete, toggleTheme, isDarkMode, toggleLanguage, language }) => {
  const quizTypes = [
    {
      id: 1,
      title: language === 'en' ? 'Logo Quiz' : 'Kuis Logo',
      desc: language === 'en' ? 'Identify games from their iconic logos' : 'Tebak game dari logo ikoniknya',
      img: QUIZ_IMAGES.logo,
    },
    {
      id: 2,
      title: language === 'en' ? 'Character Challenge' : 'Tantangan Karakter',
      desc: language === 'en' ? 'Recognize famous game characters' : 'Kenali karakter game terkenal',
      img: QUIZ_IMAGES.character,
    },
    {
      id: 3,
      title: language === 'en' ? 'Soundtrack Quiz' : 'Kuis Soundtrack',
      desc: language === 'en' ? 'Guess the game from its music' : 'Tebak game dari musiknya',
      img: QUIZ_IMAGES.soundtrack,
    },
    {
      id: 4, // ID baru untuk Cartoon Quiz
      title: language === 'en' ? 'Cartoon Quiz' : 'Kuis Kartun',
      desc: language === 'en' ? 'Guess your favorite cartoons!' : 'Tebak kartun favoritmu!',
      img: QUIZ_IMAGES.cartoon,
    },
  ];

  const categoriesSectionRef = useRef(null);

  const handleStartExploring = (e) => {
    e.preventDefault();
    console.log('Start Exploring clicked/touched');
    if (categoriesSectionRef.current) {
      categoriesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('Categories section not found');
    }
  };

  return (
    <div className={`landing-page ${isDarkMode ? 'dark' : 'light'}`}>
      <Navbar 
        toggleTheme={toggleTheme} 
        isDarkMode={isDarkMode} 
        toggleLanguage={toggleLanguage} 
        language={language} 
      />
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {language === 'en' ? 'Guess The Game!' : 'Tebak Game!'}
          </h1>
          <p className="hero-subtitle">
            {language === 'en'
              ? 'Challenge your gaming knowledge with exciting quizzes!'
              : 'Uji pengetahuan gaming Anda dengan kuis yang seru!'}
          </p>
          <button 
            className="hero-cta" 
            onClick={handleStartExploring}
            onTouchStart={handleStartExploring}
          >
            {language === 'en' ? 'Start Exploring' : 'Mulai Jelajahi'}
          </button>
        </div>
      </section>
      <section className="game-categories-section" ref={categoriesSectionRef}>
        <h2 className="section-title">
          {language === 'en' ? 'Explore Quiz Types' : 'Jelajahi Jenis Kuis'}
        </h2>
        <div className="categories-container">
          {quizTypes.map((quiz) => (
            <div key={quiz.id} className="game-category-card">
              <div className="game-image-container">
                <img 
                  src={quiz.img} 
                  alt={quiz.title} 
                  className="game-category-image"
                />
                <div className="image-overlay" />
              </div>
              <div className="game-category-content">
                <h3>{quiz.title}</h3>
                <p>{quiz.desc}</p>
                <button 
                  className="category-cta"
                  onClick={() => onLandingComplete(quiz.id)}
                >
                  {language === 'en' ? 'Play Now' : 'Mainkan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="about-section">
        <h2 className="section-title">{language === 'en' ? 'About The Game' : 'Tentang Permainan'}</h2>
        <p className="section-text">
          {language === 'en'
            ? 'Guess The Game is designed for gamers who love a good challenge. Test your skills with iconic game logos, famous characters, memorable soundtracks, and now your favorite cartoons!'
            : 'Tebak Game dirancang untuk gamer yang menyukai tantangan. Uji keterampilan Anda dengan logo game ikonik, karakter terkenal, soundtrack yang mengesankan, dan sekarang kartun favorit Anda!'}
        </p>
      </section>
      <section className="cta-section">
        <h2 className="section-title">{language === 'en' ? 'Ready to Play?' : 'Siap Bermain?'}</h2>
        <p className="section-text">
          {language === 'en' 
            ? 'Join thousands of players and see how many games and cartoons you can guess!' 
            : 'Bergabunglah dengan ribuan pemain dan lihat berapa banyak game dan kartun yang bisa Anda tebak!'}
        </p>
        <button 
          className="cta-button" 
          onClick={() => onLandingComplete(1)} // Default ke Logo Quiz
        >
          {language === 'en' ? 'Get Started Now' : 'Mulai Sekarang'}
        </button>
      </section>
      <footer className="landing-footer">
        <p>© 2025 Guess The Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
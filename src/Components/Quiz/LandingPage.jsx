import React, { useRef } from 'react';
import Navbar from './navbar';
import './LandingPage.css';

const QUIZ_IMAGES = {
  logo: 'https://i.ytimg.com/vi/qYaxJR0wpsY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAS8NJnCPJGAlhqv20ivDe0nztcCA',
  character: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_9smGzmmaESG1HO8n8cFK8zlJh3jDWfC_6Q&s',
  soundtrack: 'https://cdn.prod.website-files.com/61c070585317d2b435a597a4/676aa9133818034b430fc7c3_Song%20Quiz%20Roku.png',
  year: 'https://www.denofgeek.com/wp-content/uploads/2022/05/pjimage-24.jpg?fit=1920%2C1080',
  developer: 'https://quiz.com/image-cache/uploads/598289fd-b895-439f-9c19-21ef0b5c81e5/df51aa7e9582d45e1d8513869a0f7ce4fd2545fb.jpg.jpg?width=1200&height=630',
  genre: 'https://media.proprofs.com/images/QM/user_images/2503852/New%20Project%20(72)(121).jpg'
};

const LandingPage = ({ onLandingComplete, toggleTheme, isDarkMode, toggleLanguage, language }) => {
  const quizTypes = [
    {
      id: 1,
      title: language === 'en' ? 'Logo Quiz' : 'Kuis Logo',
      desc: language === 'en' ? 'Identify games from their iconic logos' : 'Tebak game dari logo ikoniknya',
      img: QUIZ_IMAGES.logo
    },
    {
      id: 2,
      title: language === 'en' ? 'Character Challenge' : 'Tantangan Karakter',
      desc: language === 'en' ? 'Recognize famous game characters' : 'Kenali karakter game terkenal',
      img: QUIZ_IMAGES.character
    },
    {
      id: 3,
      title: language === 'en' ? 'Soundtrack Quiz' : 'Kuis Soundtrack',
      desc: language === 'en' ? 'Guess the game from its music' : 'Tebak game dari musiknya',
      img: QUIZ_IMAGES.soundtrack
    },
    {
      id: 4,
      title: language === 'en' ? 'Release Year' : 'Tahun Rilis',
      desc: language === 'en' ? 'Match games to their release years' : 'Cocokkan game dengan tahun rilisnya',
      img: QUIZ_IMAGES.year
    },
    {
      id: 5,
      title: language === 'en' ? 'Developer Quiz' : 'Kuis Developer',
      desc: language === 'en' ? 'Identify the game studios' : 'Tebak studio pengembang game',
      img: QUIZ_IMAGES.developer
    },
    {
      id: 6,
      title: language === 'en' ? 'Genre Guesser' : 'Tebak Genre',
      desc: language === 'en' ? 'Classify games by their genres' : 'Klasifikasikan game berdasarkan genrenya',
      img: QUIZ_IMAGES.genre
    }
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
            ? 'Guess The Game is designed for gamers who love a good challenge. Whether you\'re a casual player or a hardcore enthusiast, our quizzes will put your knowledge to the test with iconic game logos and clever clues.'
            : 'Tebak Game dirancang untuk gamer yang menyukai tantangan. Baik Anda pemain kasual atau penggemar berat, kuis kami akan menguji pengetahuan Anda dengan logo game ikonik dan petunjuk cerdas.'}
        </p>
      </section>

      <section className="cta-section">
        <h2 className="section-title">{language === 'en' ? 'Ready to Play?' : 'Siap Bermain?'}</h2>
        <p className="section-text">{language === 'en' ? 'Join thousands of players and see how many games you can guess!' : 'Bergabunglah dengan ribuan pemain dan lihat berapa banyak game yang bisa Anda tebak!'}</p>
        <button className="cta-button" onClick={onLandingComplete}>
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
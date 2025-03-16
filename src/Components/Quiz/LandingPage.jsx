import React, { useRef } from 'react';
import Navbar from './navbar';
import './LandingPage.css';

const QUIZ_IMAGES = {
  logo: 'https://files.oaiusercontent.com/file-PYnjd8s5oiZmjot5GNnV6q?se=2025-03-16T08%3A51%3A54Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc2f69c2e-4723-42b3-866d-460b9f98a0b5.webp&sig=qmRlDcMmgYefpv7OoyBncQASnAsLD5C7ScBZ9ZSKRRc%3D',
  character: 'https://files.oaiusercontent.com/file-SkitnzseLDVLEMmQ1WNcLJ?se=2025-03-16T08%3A51%3A54Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Db17cbb11-5ec6-466b-953d-447af4dae533.webp&sig=mfpZVa0zL%2BXyPfXCMTtJzp6YMdPrNKhNjVJDRBo/7%2BM%3D',
  soundtrack: 'https://files.oaiusercontent.com/file-BywCKcC32PJ3caKK5izAt3?se=2025-03-15T15%3A23%3A46Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D583a0817-8c8b-4487-8cab-ae6b3bc3dfc4.webp&sig=/Jb0NUB7p5Ff/FRavUPq628JGJbILQb1U7gdv3Ld9b0%3D',
  year: 'https://files.oaiusercontent.com/file-VVqbxdyk68JAotugNxSDVE?se=2025-03-16T08%3A51%3A54Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D877b95c7-6f00-4f6e-9ba2-b087e2cefac2.webp&sig=ggn02NUjwEiFk2aWVj75QoZ6uy240qQvzNr87ePK5NY%3D',
  developer: 'https://files.oaiusercontent.com/file-Vg65rGtUcpX6b5ASxrayg8?se=2025-03-16T08%3A51%3A54Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D023936ca-b1cb-4519-bc0e-d697b2c47d96.webp&sig=9ST6DoayvHE%2BvX/BdvKTqlmSdFe8plAKbk%2BJTpEVJ%2B4%3D',
  genre: 'https://files.oaiusercontent.com/file-DhP2hUaDbJEhPctF8K5ygD?se=2025-03-16T08%3A51%3A54Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D7b0a3c76-581f-4dab-aa2d-e91710081729.webp&sig=FXWMirO8CopIKrNlx7pz6QxucjXsdCaDBrelDcWQcJk%3D'
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
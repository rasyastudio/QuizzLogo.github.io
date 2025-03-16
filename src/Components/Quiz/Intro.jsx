import React, { useEffect, useState } from 'react';
import './Intro.css';

const Intro = ({ onIntroComplete }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Setelah 3 detik, mulai fade out dan panggil onIntroComplete
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000); // Durasi intro sebelum fade out (2 detik)

    const completeTimer = setTimeout(() => {
      onIntroComplete(); // Pindah ke scene berikutnya setelah fade out selesai
    }, 3000); // Total durasi termasuk fade out (3 detik)

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onIntroComplete]);

  return (
    <div className={`intro-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="intro-content">
        <h1 className="intro-title">Guess The Game</h1>
        <p className="intro-subtitle">Are you ready to test your gaming knowledge?</p>
      </div>
    </div>
  );
};

export default Intro;
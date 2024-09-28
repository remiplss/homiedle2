import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Fonction qui calcule le temps restant jusqu'à midi (12h)
  function calculateTimeLeft() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();

    // Calculer midi aujourd'hui
    let nextNoon = new Date();
    nextNoon.setHours(12, 0, 0, 0);

    // Si nous sommes après 12h, on passe à midi du lendemain
    if (currentHour >= 12) {
      nextNoon.setDate(nextNoon.getDate() + 1);
    }

    // Calculer la différence en millisecondes
    const difference = nextNoon - now;

    // Convertir en heures, minutes, et secondes
    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((difference / 1000 / 60) % 60);
    let seconds = Math.floor((difference / 1000) % 60);

    return {
      hours,
      minutes,
      seconds,
    };
  }

  // Mettre à jour chaque seconde
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div>Reset du homie:</div>
      <div>
        <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
        :
        <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
        :
        <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default Timer;

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import "app/styles/glasses.css";
import JSConfetti from "js-confetti";
import Lottie from "lottie-react";
import winTrophy from "public/win_trophy.json";

function Page() {
  const [glassesPosition, setGlassesPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [milhouseImage, setMilhouseImage] = useState("/milhouse_resized.webp");
  const [isH2Visible, setIsH2Visible] = useState(false);
  const [isPVisible, setIsPVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculer une position aléatoire pour l'image des lunettes
    const top = Math.random() * (windowHeight - 80 - 230 - 50) + 80; // 230 est la hauteur de l'image milhouse_resized.webp
    const left = Math.random() * (windowWidth - 130); // 457 est la largeur de l'image milhouse_resized.webp

    setTimeout(() => {
      setGlassesPosition({ top, left });
      setIsVisible(true);
    }, 550);

    setTimeout(() => {
      setIsH2Visible(true);
    }, 100);

    setTimeout(() => {
      setIsPVisible(true);
    }, 1100);

    setTimeout(() => {
      setFadeOut(true);
    }, 4000); // Commence le fade-out après 4 secondes
  }, []);

  const handleAnimationEnd = () => {
    if (fadeOut) {
      setFadeOut(false);
    }
  };

  const handleClick = () => {
    setHasWon(true);
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["🌈", "🕶️", "⚡️", "👓", "✨", "💫", "🌸", "🕶️", "👓"],
    });
    setMilhouseImage("/milhouse_glasses_on_resized.webp");
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-2 flex items-center justify-center min-h-screen bg-sky_blue">
      {hasWon ? (
        <div className="p-6 pt-20 flex flex-col justify-center items-center h-screen z-30">
          <div className="w-200 h-200">
            <Lottie animationData={winTrophy} loop={true} />
          </div>
        </div>
      ) : (
        ""
      )}

      {!fadeOut && (
        <div
          className={`z-20 w-full h-full flex flex-col justify-center items-center absolute text-white ${
            fadeOut ? "fade-out" : "fade-in"
          }`}
          onAnimationEnd={handleAnimationEnd}
        >
          <h2
            className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${
              isH2Visible ? "fade-in" : ""
            }`}
          >
            Teste ta vue 👀
          </h2>
          <p className={`leading-7 mt-2 ${isPVisible ? "fade-in" : ""}`}>
            Trouve et clic sur les lunettes de Milhouse dans le ciel
          </p>
        </div>
      )}
      <Image
        src={milhouseImage}
        alt="Milhouse without glasses"
        width="457"
        height="230"
        className="h-50 object-contain absolute bottom-0 left-1/2 transform -translate-x-1/2 select-none"
        id="milhouse"
      />
      <Image
        src="/glasses_blue.webp"
        alt="Glasses"
        width="100"
        height="50"
        className={`absolute z-1 select-none ${isVisible ? "fade-in" : ""}`}
        style={{
          top: `${glassesPosition.top}px`,
          left: `${glassesPosition.left}px`,
        }}
        id="glasses"
        onClick={handleClick}
      />
    </div>
  );
}

export default Page;

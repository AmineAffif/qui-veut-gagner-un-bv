"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import "app/styles/glasses.css";
import JSConfetti from "js-confetti";

function page() {
  const [glassesPosition, setGlassesPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [milhouseImage, setMilhouseImage] = useState("/milhouse_resized.webp");

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculer une position aléatoire pour l'image des lunettes
    const top = Math.random() * (windowHeight - 80 - 230 - 50) + 80; // 230 est la hauteur de l'image milhouse_resized.webp
    const left = Math.random() * (windowWidth - 130); // 457 est la largeur de l'image milhouse_resized.webp

    setTimeout(() => {
      setGlassesPosition({ top, left });
      setIsVisible(true);
    }, 550); // Délai avant de rendre l'image visible
  }, []);

  const handleClick = () => {
    console.log("Glasses clicked");

    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["🌈", "🕶️", "⚡️", "👓", "✨", "💫", "🌸", "🕶️", "👓"],
    });
    setMilhouseImage("/milhouse_glasses_on_resized.webp");
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-2 flex items-center justify-center min-h-screen bg-sky_blue">
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
        className={`absolute z-1 select-none ${isVisible ? "fade-in" : "hidden"}`}
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

export default page;

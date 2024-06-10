"use client";

import { JSX, SVGProps, useEffect, useState } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Home() {
  const WordWithSpace = ({
    word1,
    word2,
  }: {
    word1: string;
    word2: string;
  }) => (
    <>
      {word1}
      {"\u00A0"}
      {word2}
    </>
  );

  const initialWords = [
    <WordWithSpace word1="un" word2="BV" />,
    <WordWithSpace word1="une" word2="Gigi" />,
    <WordWithSpace word1="une" word2="🕶️" />,
    <WordWithSpace word1="un" word2="CeviDay" />,
    <WordWithSpace word1="une" word2="ordo" />,
    <WordWithSpace word1="un" word2="Bvente" />,
    <WordWithSpace word1="un" word2="devis à saisir" />,
    <WordWithSpace word1="une" word2="👓" />,
  ];

  const [shuffledWords, setShuffledWords] = useState(initialWords);
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    const shuffled = [...initialWords].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);

    const colors = ["#2900d1a3", "#0174f4c4", "#0174f4c4", "#2900d1a3"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }, []);

  return (
    <main className="flex min-h-[auto] md:min-h-screen flex-col items-center justify-center w-full">
      <div
        className={`flex min-h-screen flex-col items-center justify-center p-24 w-full`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex w-[80vw] justify-center h-full flex-col text-white">
          <div className="text-6xl font-bold text-start">
            Qui veut gagner{" "}
            <FlipWords
              words={shuffledWords}
              className="text-6xl font-bold text-start"
              duration={2000}
            />
          </div>
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center p-24 w-full bg-custom-gray">
        <div className="flex w-[80vw] justify-center h-full flex-col text-white">
          <div className="text-5xl font-bold text-center uppercase">
            <h2 className="mb-12">À gagner 👇 (c'est faux)</h2>
            <Carousel className="rounded-lg overflow-hidden">
              <CarouselContent>
                <CarouselItem className="flex justify-center">
                  <img
                    src="/montages/dvd_montage.jpg"
                    alt="Carousel Image 1"
                    width={1200}
                    height={800}
                    className="w-auto h-[500px] object-contain rounded-xl"
                  />
                </CarouselItem>
                <CarouselItem className="flex justify-center">
                  <img
                    src="/montages/jeu_de_societe.jpg"
                    alt="Carousel Image 2"
                    width={1200}
                    height={800}
                    className="w-auto h-[500px] object-contain rounded-xl"
                  />
                </CarouselItem>
                <CarouselItem className="flex justify-center">
                  <img
                    src="/montages/montage_ps1.jpg"
                    alt="Carousel Image 3"
                    width={1200}
                    height={800}
                    className="w-auto h-[500px] object-contain rounded-xl"
                  />
                </CarouselItem>
                <CarouselItem className="flex justify-center">
                  <img
                    src="/montages/switch.jpg"
                    alt="Carousel Image 4"
                    width={1200}
                    height={800}
                    className="w-auto h-[500px] object-contain rounded-xl"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-white/50 hover:bg-white/75 p-2 rounded-full shadow-md transition-colors">
                <ChevronLeftIcon className="w-6 h-6" />
              </CarouselPrevious>
              <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-white/50 hover:bg-white/75 p-2 rounded-full shadow-md transition-colors">
                <ChevronRightIcon className="w-6 h-6" />
              </CarouselNext>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="flex h-auto flex-col items-center justify-center w-full bg-custom-gray">
        <img
          src="/montages/long_banner.jpg"
          alt=""
          width={""}
          height={""}
          className="h-[500px] max-w-[100vw] object-cover md:object-contain rounded-xl"
        />
      </div>
    </main>
  );
}

function ChevronLeftIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

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
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Play, Volume2, Maximize2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

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
        className="flex min-h-screen flex-col items-center justify-center p-24 w-full"
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
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container flex items-center gap-6 px-4 md:px-6 lg:gap-10 flex-wrap md:flex-nowrap">
          <img
            src="/montages/album-cover.webp"
            width={600}
            height={600}
            alt="Image"
            className="mx-auto aspect-[2/2] md:aspect-[inherit] overflow-hidden rounded-lg object-contain"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              QVGDB
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Découvrez l'album <strong>QVGDB</strong> : une immersion musicale
              captivante où chaque note raconte une histoire. Plongez dans les
              sonorités uniques et rythmes envoûtants de cette expérience
              auditive ultime
            </p>
            <p className="max-w-[600px] text-[#c1c1ce] text-sm/relaxed">
              L'album n'existe pas{" "}
            </p>
          </div>
          <video controls className="w-auto md:w-[280px]">
            <source src="/react_cev_hit.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <div className="flex h-auto flex-col items-center justify-center w-full">
        <img
          src="/montages/long_banner.jpg"
          alt=""
          width={""}
          height={""}
          className="h-[500px] max-w-[100vw] object-cover md:object-contain rounded-xl"
        />
      </div>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-12 md:px-24 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Sac à vomi
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Découvrez LE sac à vomi à gagner ! Parfait pour les escapades
              imprévisibles et les soirées mémorables. Ce sac revisite un
              accessoire indispensable en un élément de surprise et d'amusement,
              prêt à vous accompagner partout.
            </p>
          </div>
          <img
            src="/montages/sac.webp"
            alt="Image"
            className="h-[60vh] w-[60vh] mx-auto aspect-[3/2] overflow-hidden rounded-lg object-contain"
          />
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-custom-gray">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-3 lg:gap-10">
          <img
            src="/montages/book-amine_1_17.webp"
            width={600}
            height={600}
            alt="Image"
            className="mx-auto aspect-[3/2] overflow-hidden rounded-lg object-contain"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
              Cévi bloc-note
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Gagnez un bloc-notes magique capable de réaliser vos souhaits les
              plus chers ! Notez vos désirs et laissez la magie faire le reste.
              Un compagnon idéal pour ceux qui aiment rêver grand et voir leurs
              rêves devenir réalité.
            </p>
            <p className="max-w-[600px] text-[#c1c1ce] text-sm/relaxed">
              Aucune magie garantie 🫖
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-12 md:px-24 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Un jeu gardé secret durant des siècles 🤫
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Protégé par des générations, ce jeu incroyable a été caché pendant
              des siècles. Maintenant, il est enfin révélé, vous offrant une
              chance unique de plonger dans son univers mystérieux et fascinant.
            </p>
            <Link
              className={`justify-self-end px-5 py-1 text-sm ${buttonVariants({ variant: "default" })}`}
              href="/games/quiz"
            >
              Jouer maintenant
            </Link>
          </div>
          <img
            src="/montages/secret-montage.webp"
            alt="Image"
            className="h-[60vh] w-[60vh] mx-auto aspect-[3/2] overflow-hidden rounded-lg object-contain"
          />
        </div>
      </section>
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

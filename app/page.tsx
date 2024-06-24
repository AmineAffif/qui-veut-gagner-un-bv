"use client";

import { JSX, SVGProps, useEffect, useRef, useState } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { motion } from "framer-motion";
import { VolumeX, Volume2 } from "lucide-react";
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

  const videoRef = useRef<HTMLVideoElement>(null);
  const audio1Ref = useRef<HTMLAudioElement>(null);
  const audio2Ref = useRef<HTMLAudioElement>(null);

  const [isAudio1Muted, setIsAudio1Muted] = useState(false);
  const [isAudio2Muted, setIsAudio2Muted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const audio1 = audio1Ref.current;
    const audio2 = audio2Ref.current;

    const handlePlay = () => {
      if (audio1 && audio2) {
        audio1.play();
        audio2.play();
      }
    };

    const handlePause = () => {
      if (audio1 && audio2) {
        audio1.pause();
        audio2.pause();
      }
    };

    const handleSeeked = () => {
      if (audio1 && audio2 && video) {
        audio1.currentTime = video.currentTime;
        audio2.currentTime = video.currentTime;
      }
    };

    if (video) {
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("seeked", handleSeeked);
    }

    return () => {
      if (video) {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("seeked", handleSeeked);
      }
    };
  }, []);

  const toggleMute = (
    audioRef: React.RefObject<HTMLAudioElement>,
    setIsMuted: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

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
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center"
          >
            <img
              src="/montages/album-cover.webp"
              width={600}
              height={600}
              alt="Image"
              className="mx-auto aspect-[2/2] md:aspect-[inherit] overflow-hidden rounded-lg object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.6,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                QVGDB
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez l'album <strong>QVGDB</strong> : une immersion
                musicale captivante où chaque note raconte une histoire. Plongez
                dans les sonorités uniques et rythmes envoûtants de cette
                expérience auditive ultime
              </p>
              <p className="max-w-[600px] text-[#c1c1ce] text-sm/relaxed">
                L'album n'existe pas{" "}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 1.2,
              duration: 0.6,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center mt-12 md:mt-0"
          >
            <div className="relative w-full max-w-4xl mx-auto rounded-lg">
              <Image
                src="/choose_audio-min.png"
                alt="choose_audio"
                width={250}
                height={250}
                className="absolute z-3 select-none w-[210px] md:w-[250px] top-[-130px] md:top-[-120px] right-[-25px] md:right-[60px] object-contain rotate-[-30deg] md:rotate-0"
              />
              <video
                ref={videoRef}
                controls
                className="w-auto md:w-[580px] rounded-lg"
              >
                <source src="/video/video_no_sound.mp4" type="video/mp4" />
              </video>
              <audio ref={audio1Ref} src="/sound/music_track.mp3" />
              <audio ref={audio2Ref} src="/sound/react_track.mp3" />
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-100 h-100 bg-black/50 hover:text-[#006aff] text-white px-3 py-1"
                  onClick={() => toggleMute(audio1Ref, setIsAudio1Muted)}
                >
                  {isAudio1Muted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                  <p className="ml-2">Musique</p>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-100 h-100 bg-black/50 hover:text-[#006aff] text-white px-3 py-1"
                  onClick={() => toggleMute(audio2Ref, setIsAudio2Muted)}
                >
                  {isAudio2Muted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                  <p className="ml-2">React</p>
                </Button>
              </div>
            </div>
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center"
          >
            <img
              src="/montages/sac.webp"
              alt="Image"
              className="h-[60vh] w-[60vh] mx-auto aspect-[3/2] overflow-hidden rounded-lg object-contain"
            />
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-custom-gray">
        <div className="container flex flex-wrap md:flex-wrap justify-center items-center gap-6 px-4 md:px-6 lg:gap-10">
          <img
            src="/montages/book-amine_1_17.webp"
            alt="Image"
            className="overflow-hidden rounded-lg object-contain md:w-[380px]"
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
              className={`justify-self-end px-5 py-1 text-sm ${buttonVariants({
                variant: "default",
              })}`}
              href="/games/quiz"
            >
              Jouer maintenant
            </Link>
          </div>
          <img
            src="/montages/secret-montage.webp"
            alt="Image"
            className="h-[60vh] w-[60vh] mx-auto overflow-hidden rounded-lg object-cover"
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

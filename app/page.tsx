"use client";

import { JSX, SVGProps, useEffect, useRef, useState } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { motion } from "framer-motion";
import { VolumeX, Volume2 } from "lucide-react";
import Image from "next/image";
import LogoCarousel from "components/logoCarousel";

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

  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/NBC_logo.svg/567px-NBC_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/2048px-Fox_News_Channel_logo.svg.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfohC5fhsADp9ZsPaJdHxIH2jaTVS6bYlVBg&s",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Discovery_Channel_-_Logo_2019.svg/800px-Discovery_Channel_-_Logo_2019.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/5/5e/Mtv_logo_before_1994.png",
    "https://upload.wikimedia.org/wikipedia/commons/f/fe/CARTOON_NETWORK_logo.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDifNoGmPCktncfPW94aeUWyRDQ-Cv4KsZQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQyRKP0MyiZVnqW7t0t25dzwexkskoX0Egw&s",
  ];

  return (
    <main className="flex min-h-[auto] md:min-h-screen flex-col items-center justify-center w-full overflow-x-hidden">
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

      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight mt-24">
        Ils en parlent
      </h2>
      <div className="relative flex flex-col gap-4 items-center justify-center mt-10">
        <video
          loop
          controls
          className="w-auto md:w-[800px] rounded-lg"
          src="/video/main_complot.mp4"
        />
      </div>

      <div className="min-h-full mt-36 bg-white drop-shadow-custom py-6 flex items-center justify-center pointer-events-none select-none">
        <LogoCarousel logos={logos} />
      </div>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container w-auto md:w-[800px] gap-6 px-12 md:px-24 flex justify-center items-center flex-col lg:gap-10">
          <div className="lg:col-span-2 space-y-4 w-[100%]">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Même Drak est dans le coup ! 🤯
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Drak ! Oui Drak et bel et bien DRAK la fameuse coqueluche du net
              nous délivre son témoignage exclusif rien que pour nous cette
              semaine !
            </p>
          </div>
          <div className="relative flex flex-col gap-4 items-center justify-center">
            <video
              loop
              controls
              className="w-auto md:w-[800px] rounded-lg"
              src="/video/Drake_interview_min.mp4"
            />
          </div>
        </div>
      </section>

      <div className="flex min-h-screen flex-col items-center justify-center p-24 w-full bg-custom-gray">
        <div className="flex w-[80vw] justify-center h-full flex-col text-white">
          <div className="text-5xl font-bold text-center uppercase">
            <h2 className="mb-12">À gagner 👇 (c'est faux)</h2>
            <Carousel className="rounded-lg overflow-hidden">
              <CarouselContent>
                <CarouselItem className="flex justify-center">
                  <Image
                    src="/montages/dvd_montage.jpg"
                    alt="Carousel Image 1"
                    width={1200}
                    height={800}
                    className="w-auto h-[500px] object-contain rounded-xl"
                    loading="lazy"
                  />
                </CarouselItem>
                <CarouselItem className="flex justify-center">
                  <Image
                    src="/montages/jeu_de_societe.jpg"
                    alt="Carousel Image 2"
                    width={1200}
                    height={800}
                    className="w-auto h-[500px] object-contain rounded-xl"
                    loading="lazy"
                  />
                </CarouselItem>
                <CarouselItem className="flex justify-center">
                  <Image
                    src="/montages/montage_ps1.jpg"
                    alt="Carousel Image 3"
                    width={1200}
                    height={800}
                    className="w-auto h-[500px] object-contain rounded-xl"
                    loading="lazy"
                  />
                </CarouselItem>
                <CarouselItem className="flex justify-center">
                  <Image
                    src="/montages/switch.jpg"
                    alt="Carousel Image 4"
                    width={1200}
                    height={800}
                    className="w-auto h-[500px] object-contain rounded-xl"
                    loading="lazy"
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
              delay: 0.1,
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center"
          >
            <div className="w-80 h-80 perspective">
              <div className="relative w-full h-full duration-700 transform-style-3d group hover:transform rotate-y-180">
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/montages/album-cover.webp"
                    alt="Front Image"
                    layout="fill"
                    className="rounded-lg object-cover rotate-y-180"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 w-full h-full bg-blue-500 backface-hidden transform rotate-y-180">
                  <Image
                    src="/montages/cover_2-min.jpg"
                    alt="Back Image"
                    layout="fill"
                    className="rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                QVGDBV
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Découvrez l'album <strong>QVGDBV</strong> : une immersion
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
              delay: 0.6,
              duration: 0.5,
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
                className="absolute z-3 select-none w-[210px] md:w-[250px] top-[-130px] md:top-[-120px] right-[-25px] md:right-[60px] object-contain rotate-[40deg] md:rotate-0"
              />
              <video
                loop
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
        <Image
          src="/montages/long_banner.jpg"
          alt=""
          width={1920}
          height={500}
          className="h-[500px] max-w-[100vw] object-cover md:object-contain rounded-xl"
          loading="lazy"
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
              delay: 0.2,
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center"
          >
            <Image
              src="/montages/sac.webp"
              alt="Image"
              width={600}
              height={600}
              className="h-[60vh] w-[60vh] mx-auto aspect-[3/2] overflow-hidden rounded-lg object-contain"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-custom-gray">
        <div className="container flex flex-wrap md:flex-wrap justify-center items-center gap-6 px-4 md:px-6 lg:gap-10">
          <Image
            src="/montages/book-amine_1_17.webp"
            alt="Image"
            width={380}
            height={500}
            className="overflow-hidden rounded-lg object-contain md:w-[380px]"
            loading="lazy"
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
        <motion.div
          initial={{ opacity: 0.0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center"
        >
          <div className="container grid items-center gap-6 px-12 md:px-24 lg:grid-cols-3 lg:gap-10">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Un jeu gardé secret durant des siècles 🤫
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Protégé par des générations, ce jeu incroyable a été caché
                pendant des siècles. Maintenant, il est enfin révélé, vous
                offrant une chance unique de plonger dans son univers mystérieux
                et fascinant.
              </p>
              <Link
                className={`justify-self-end px-5 py-1 text-sm ${buttonVariants(
                  {
                    variant: "default",
                  }
                )}`}
                href="/games/quiz"
              >
                Jouer maintenant
              </Link>
            </div>
            <Image
              src="/montages/secret-montage.webp"
              alt="Image"
              width={600}
              height={600}
              className="h-[60vh] w-[60vh] mx-auto overflow-hidden rounded-lg object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#6cc8ff4d]">
        <div className="container w-auto md:w-[800px] gap-6 px-12 md:px-24 flex justify-center items-center flex-col lg:gap-10">
          <div className="lg:col-span-2 space-y-4 w-[100%]">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Quelques cévi-création originales
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Découvrez quelques cévi-créations originales, réalisées par notre
              équipe de choc (moi). Des montages uniques et des créations
              artistiques, pour vous inspirer et vous émerveiller.
            </p>
          </div>
          <div className="w-screen px-12 relative flex flex-nowrap overflow-x-scroll gap-4 items-center justify-center">
            <video
              loop
              controls
              className="w-auto md:w-[300px] rounded-lg"
              src="/video/meme_coin_min.mp4"
            />
            <video
              loop
              controls
              className="w-auto md:w-[300px] rounded-lg"
              src="/video/onepiece_video_min.mp4"
            />
            <video
              loop
              controls
              className="w-auto md:w-[300px] rounded-lg"
              src="/video/son_fr_min.mp4"
            />
          </div>
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

import { FlipWords } from "@/components/ui/flip-words";

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

  const words = [
    <WordWithSpace word1="un" word2="BV" />,
    <WordWithSpace word1="une" word2="Gigi" />,
    <WordWithSpace word1="une" word2="🕶️" />,
    <WordWithSpace word1="un" word2="CeviDay" />,
    <WordWithSpace word1="une" word2="ordo" />,
    <WordWithSpace word1="un" word2="Bvente" />,
    <WordWithSpace word1="un" word2="devis à saisir" />,
    <WordWithSpace word1="une" word2="👓" />,
  ];

  const shuffledWords = words.sort(() => Math.random() - 0.5);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex w-[80vw] justify-center h-full flex-col">
        <div className="text-6xl font-bold text-start">
          Qui veut gagner{" "}
          <FlipWords
            words={shuffledWords}
            className="text-6xl font-bold text-start"
            duration={2000}
          />
        </div>
      </div>
    </main>
  );
}

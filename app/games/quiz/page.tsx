"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GameType } from "@/types/GameType";
import { AnswerType } from "@/types/AnswerType";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "components/privateRoute";
import Lottie from "lottie-react";
import loadingC from "public/loading_c.json";
import Link from "next/link";

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuizPage = () => {
  const [game, setGame] = useState<GameType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<AnswerType[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const incrementProgress = () => {
      setProgress((prevProgress) => {
        if (prevProgress < 90) {
          return prevProgress + 1;
        } else {
          return prevProgress;
        }
      });
    };

    const interval = setInterval(incrementProgress, 50);

    const fetchGame = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/games/random_game`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data: GameType = await response.json();
      setGame(data);
      setShuffledAnswers(shuffleArray(data.questions[0].answers));
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setLoading(false), 500); // Add a slight delay to ensure progress bar reaches 100%
    };

    fetchGame();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (game && currentQuestionIndex < game.questions.length) {
      setShuffledAnswers(
        shuffleArray(game.questions[currentQuestionIndex].answers)
      );
    }
  }, [currentQuestionIndex, game]);

  useEffect(() => {
    if (game && currentQuestionIndex >= game.questions.length && user) {
      const saveGame = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: user.id,
            score,
            question_ids: game.questions.map((q) => q.id),
          }),
        });
      };
      saveGame();
    }
  }, [currentQuestionIndex, game, score, user]);

  if (loading) {
    return (
      <div className="p-6 pt-20 flex flex-col justify-center items-center h-screen">
        <div className="w-20 h-20">
          <Lottie animationData={loadingC} loop={true} />
        </div>
      </div>
    );
  }

  if (!game || currentQuestionIndex >= game.questions.length) {
    return (
      <div className="p-6 pt-20 flex justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center h-[100dvh] dark:bg-gray-800 px-4 md:px-6">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                Quiz terminé !
              </h1>
              <div className="flex items-center space-x-2 text-2xl font-bold">
                <span>Score:</span>
                <span className="text-green-500 dark:text-green-400">
                  {score}
                </span>
                {game && <span>/ {game.questions.length}</span>}
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center">
                  <span className="text-4xl font-bold text-green-500 dark:text-green-400">
                    {score}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-center">
                    Réponses correctes
                  </span>
                </div>
                {game && (
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-4xl font-bold text-red-500 dark:text-red-400">
                      {game.questions.length - score}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-center">
                      Réponses incorrectes
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <Link href="/games/quiz">
                  <Button>Relancer</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = game.questions[currentQuestionIndex];

  const handleAnswerClick = (answerId: number) => {
    setSelectedAnswer(answerId);
    const correct = answerId === currentQuestion.right_answer_id;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 1000);
  };

  return (
    <PrivateRoute>
      <div className="p-6 pt-20 flex justify-center items-center h-screen w-[90vw] max-w-2xl">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{currentQuestion.text}</h3>
              <p className="text-gray-500 dark:text-gray-400">{`Question ${currentQuestionIndex + 1} / ${game.questions.length}`}</p>
            </div>
            <div className="grid gap-4 md:color-red-500">
              {" "}
              {shuffledAnswers.map((answer) => (
                <Button
                  key={`${answer.id}-${selectedAnswer}`}
                  variant="outline"
                  className={`whitespace-normal h-auto xs:hidden w-full ${selectedAnswer !== null ? "pointer-events-none" : ""} ${selectedAnswer === answer.id ? (isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white") : ""}`}
                  onClick={() => handleAnswerClick(answer.id)}
                >
                  {answer.text}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PrivateRoute>
  );
};

export default QuizPage;

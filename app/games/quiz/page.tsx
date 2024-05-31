"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GameType } from "@/types/GameType";
import { AnswerType } from "@/types/AnswerType";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "components/privateRoute";
import Lottie from "lottie-react";
import loadingC from "public/loading_c.json";

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
        },
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
        shuffleArray(game.questions[currentQuestionIndex].answers),
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
        Fin de la partie. Votre score est {score}.
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
        <Card className="xs:pt-2 p-6 w-[100%]">
          <div className="mb-4 flex justify-between pb-4">
            <p className="text-left">{currentQuestion.text}</p>
            <p className="text-right">{`${currentQuestionIndex + 1}/10`}</p>
          </div>
          <div className="grid gap-4 md:color-red-500">
            {shuffledAnswers.map((answer) => (
              <Button
                key={`${answer.id}-${selectedAnswer}`}
                variant="outline"
                className={`xs:hidden w-full ${selectedAnswer !== null ? "pointer-events-none" : ""} ${selectedAnswer === answer.id ? (isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white") : ""}`}
                onClick={() => handleAnswerClick(answer.id)}
              >
                {answer.text}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </PrivateRoute>
  );
};

export default QuizPage;

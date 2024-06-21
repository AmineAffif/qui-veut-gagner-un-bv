"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GameType } from "@/types/GameType";
import { AnswerType } from "@/types/AnswerType";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "components/privateRoute";
import Lottie from "lottie-react";
import loadingC from "public/loading_c.json";
import winTrophy2 from "public/win_trophy_2.json";
import JSConfetti from "js-confetti";
import "app/styles/quiz.css";

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const calculatePoints = (questionIndex: number) => {
  if (questionIndex < 2) return 25;
  if (questionIndex < 8) return 25;
  if (questionIndex < 20) return 25;
  if (questionIndex < 37) return 26.5;
  return 50;
};

const QuizPage = () => {
  const [game, setGame] = useState<GameType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<AnswerType[]>([]);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [noMoreQuestions, setNoMoreQuestions] = useState(false);
  const { user } = useAuth();
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [shake, setShake] = useState(false);

  const jsConfetti = new JSConfetti(); // Créer une instance de JSConfetti

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
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/games/random_game`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data: GameType = await response.json();
      if (data.questions.length === 0) {
        setNoMoreQuestions(true);
      } else {
        setGame(data);
        if (data.questions && data.questions.length > 0) {
          setShuffledAnswers(shuffleArray(data.questions[0].answers));
        }
      }
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setLoading(false), 500);
    };

    fetchGame();

    return () => clearInterval(interval);
  }, []);

  const resetQuestions = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/games/reset_questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Failed to reset questions");
    }
  };

  useEffect(() => {
    if (
      game &&
      game.questions &&
      currentQuestionIndex < game.questions.length
    ) {
      setShuffledAnswers(
        shuffleArray(game.questions[currentQuestionIndex].answers)
      );
    }
  }, [currentQuestionIndex, game]);

  useEffect(() => {
    if (game && currentQuestionIndex >= game.questions?.length && user) {
      const saveGame = async () => {
        const token = sessionStorage.getItem("token");
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: user.id,
            score,
            question_ids: game.questions.map((q) => q.id),
            answers,
          }),
        });
      };
      saveGame();

      // Afficher les confettis si au moins 5 bonnes réponses
      if (correctCount >= 5) {
        jsConfetti.addConfetti({
          emojis: ["🌈", "🎉", "✨", "💥"],
          confettiNumber: 100,
        });
      }
    }
  }, [currentQuestionIndex, game, score, user, answers, correctCount]);

  if (loading) {
    return (
      <div className="p-6 pt-20 flex flex-col justify-center items-center h-screen">
        <div className="w-20 h-20">
          <Lottie animationData={loadingC} loop={true} />
        </div>
      </div>
    );
  }

  if (noMoreQuestions) {
    return (
      <div className="p-6 pt-20 flex justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center h-[100dvh] dark:bg-gray-800 px-4 md:px-6">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                Point faible = Trop fort 😶
              </h1>
              <Lottie
                animationData={winTrophy2}
                loop={false}
                className="animate-bounce mb-4"
              />
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Vous avez répondu correctement à toutes les questions
                disponibles.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Mais vous pouvez recommencer en gardant votre score et vos
                statistiques rassurez-vous.
              </p>
              <div className="flex justify-center">
                <Button onClick={resetQuestions}>Recommencer</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (
    !game ||
    !game.questions ||
    currentQuestionIndex >= game.questions.length
  ) {
    return (
      <div className="p-6 pt-20 flex justify-center items-center h-screen">
        <div className="flex flex-col items-center justify-center h-[100dvh] dark:bg-gray-800 px-4 md:px-6">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                Quiz terminé !
              </h1>
              <div className="flex items-center space-x-2 text-2xl font-bold">
                <span>Points:</span>
                <span className="text-green-500 dark:text-green-400">
                  {score}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center">
                  <span className="text-4xl font-bold text-green-500 dark:text-green-400">
                    {correctCount}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-center">
                    Réponses correctes
                  </span>
                </div>
                {game && (
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center">
                    <span className="text-4xl font-bold text-red-500 dark:text-red-400">
                      {game.questions?.length - correctCount}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-center">
                      Réponses incorrectes
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <Button onClick={() => window.location.reload()}>
                  Relancer
                </Button>
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
      setScore(
        (prevScore) => prevScore + calculatePoints(currentQuestionIndex)
      );
      setCorrectCount((prevCount) => prevCount + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 200);
    }

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.id as number]: answerId,
    }));

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 1000);
  };

  return (
    <PrivateRoute>
      <div className="p-6 pt-20 flex justify-center items-center h-screen w-[90vw] max-w-2xl">
        <Card className={`w-full max-w-md ${shake ? "shake" : ""}`}>
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{currentQuestion.text}</h3>
              <p className="text-gray-500 dark:text-gray-400">{`Question ${
                currentQuestionIndex + 1
              } / ${game.questions.length}`}</p>
            </div>
            <div className="grid gap-4 md:color-red-500">
              {shuffledAnswers.map((answer) => (
                <Button
                  key={`${answer.id}-${selectedAnswer}`}
                  variant="outline"
                  className={`whitespace-normal h-auto xs:hidden w-full ${
                    selectedAnswer !== null ? "pointer-events-none" : ""
                  } ${
                    selectedAnswer === answer.id
                      ? isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : ""
                  }`}
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

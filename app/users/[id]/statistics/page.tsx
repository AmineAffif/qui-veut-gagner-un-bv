"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { StatisticResponse } from "@/types/StatisticType";
import Lottie from "lottie-react";
import loadingC from "public/loading_c.json";
import { Button } from "@/components/ui/button";
import PrivateRoute from "components/privateRoute";
import {
  BookIcon,
  CheckIcon,
  DiamondIcon,
  GamepadIcon,
  MedalIcon,
  PercentIcon,
  RocketIcon,
  StarIcon,
  Trophy,
  TrophyIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserStatisticsPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [statistics, setStatistics] = useState<StatisticResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchStatistics = async () => {
        const token = sessionStorage.getItem("token"); // Récupérer le jeton du sessionStorage
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/statistics/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Envoyer le jeton dans l'en-tête Authorization
            },
            credentials: "include", // Include cookies in the request
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStatistics(data);
        } else {
          console.error("Failed to fetch statistics");
        }
        setLoading(false);
      };

      fetchStatistics();
    }
  }, [id]);

  if (loading)
    return (
      <div className="p-6 pt-20 flex flex-col justify-center items-center h-screen">
        <div className="w-20 h-20">
          <Lottie animationData={loadingC} loop={true} />
        </div>
      </div>
    );

  if (!statistics)
    return (
      <div className="p-6 pt-20 flex justify-center items-center h-screen">
        <p>No statistics available</p>
      </div>
    );
  const { global_score, rank_value } = statistics.statistic;

  const {
    games_count,
    total_questions_count,
    correct_answers_count,
    incorrect_answers_count,
    correct_answers_percentage,
    best_score,
    average_score,
  } = statistics;

  return (
    <PrivateRoute>
      <div className="p-6 pt-24">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Mes statistiques
        </h1>
        <Card className="w-full max-w-md bg-gray-900 text-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold mb-2">{global_score ?? 0}</div>
            <div className="text-lg text-gray-400 mb-6">Score global</div>
            <div className="flex items-center text-gray-400 mb-8">
              <Trophy className="w-5 h-5 mr-2 text-[#FFBB03]" />
              <span>Rang {rank_value}</span>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-1 bg-card rounded-lg p-4 bg-gradient-to-r  from-[#673AB7] to-[#9C27B0] text-white">
                  <BookIcon className="h-8 w-8 text-white" />
                  <div className="text-4xl font-bold">
                    {total_questions_count}
                  </div>
                  <div className="text-sm">Questions répondues</div>
                </div>
                <div className="flex flex-col items-center gap-1 bg-card rounded-lg p-4 bg-gradient-to-r from-[#03A9F4] to-[#00BCD4] text-white">
                  <PercentIcon className="h-8 w-8 text-white" />
                  <div className="text-4xl font-bold">
                    {correct_answers_percentage}
                  </div>
                  <div className="text-sm">Taux de bonne réponse</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-1 bg-card rounded-lg p-4 bg-gradient-to-r  from-[#F44336] to-[#E91E63] text-white">
                  <XIcon className="h-8 w-8 text-white" />
                  <div className="text-4xl font-bold">
                    {incorrect_answers_count}
                  </div>
                  <div className="text-sm">Mauvaises réponses</div>
                </div>
                <div className="flex flex-col items-center gap-1 bg-card rounded-lg p-4 bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] text-white">
                  <CheckIcon className="h-8 w-8 text-white" />
                  <div className="text-4xl font-bold">
                    {correct_answers_count}
                  </div>
                  <div className="text-sm">Bonnes réponses</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center gap-1 bg-card rounded-lg p-4 bg-gradient-to-r from-[#FF9800] to-[#FFC107] text-white">
                  <TrophyIcon className="h-8 w-8 text-white" />
                  <div className="text-4xl font-bold">{best_score}</div>
                  <div className="text-sm">Meilleur score</div>
                </div>
                <div className="flex flex-col items-center gap-1 bg-card rounded-lg p-4 bg-gradient-to-r from-[#9E9E9E] to-[#607D8B] text-white">
                  <StarIcon className="h-8 w-8 text-white" />
                  <div className="text-4xl font-bold">{average_score}</div>
                  <div className="text-sm">Score moyen</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 bg-card rounded-lg p-4 bg-gradient-to-r from-[#FF5722] to-[#795548] text-white">
                <GamepadIcon className="h-8 w-8 text-white" />
                <div className="text-4xl font-bold">{games_count}</div>
                <div className="text-sm">Parties jouées</div>
              </div>
            </div>
          </div>

          <section className="mt-8 bg-gradient-to-br from-[#8e2de2] to-[#4a00e0] p-6 rounded-lg">
            <div className="max-w-md mx-auto grid gap-4">
              <div className="flex items-center justify-between">
                <div className="font-medium text-white flex items-center gap-2">
                  <MedalIcon className="w-5 h-5" />
                  Rangs
                </div>
              </div>
              <div className="text-sm text-[#ccc]">
                Voici les différents rangs
              </div>
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-2 w-[100%]">
                  <div className="px-3 py-1 rounded-full bg-[#7feb8c] text-[#333] font-medium">
                    0
                  </div>
                  <div className="text-white flex items-center gap-2 w-[100%]">
                    <div className="h-px bg-[#ffffff45] w-full" />
                    <UserIcon className="w-[1.9rem] h-[1.9rem]" />
                    <p>Beginner</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-[100%]">
                  <div className="px-3 py-1 rounded-full bg-[#2BCCFF] text-[#333] font-medium">
                    51
                  </div>
                  <div className="text-white flex items-center gap-2 w-[100%]">
                    <div className="h-px bg-[#ffffff45] w-full" />
                    <UsersIcon className="w-[2.1rem] h-[2.1rem]" />
                    <p>Intermediate</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-[100%]">
                  <div className="px-3 py-1 rounded-full bg-[#fea238] text-[#333] font-medium">
                    201
                  </div>
                  <div className="text-white flex items-center gap-2 w-[100%]">
                    <div className="h-px bg-[#ffffff45] w-full" />
                    <RocketIcon className="w-[1.8rem] h-[1.8rem]" />
                    <p>Advanced</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-[100%]">
                  <div className="px-3 py-1 rounded-full bg-[#FE3839] text-white font-medium">
                    501
                  </div>
                  <div className="text-white flex items-center gap-2 w-[100%]">
                    <div className="h-px bg-[#ffffff45] w-full" />
                    <TrophyIcon className="w-[1.4rem] h-[1.4rem]" />
                    <p className="whitespace-nowrap">Cevi Expert</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-[100%]">
                  <div className="px-3 py-1 rounded-full bg-[#FCE83A] text-[#333] font-medium">
                    951
                  </div>
                  <div className="text-white flex items-center gap-2 w-[100%]">
                    <div className="h-px bg-[#ffffff45] w-full" />
                    <DiamondIcon className="w-[1.4rem] h-[1.4rem]" />
                    <p className="whitespace-nowrap">BV Master</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>
      </div>
    </PrivateRoute>
  );
};

export default UserStatisticsPage;

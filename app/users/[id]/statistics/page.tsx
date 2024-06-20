"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { StatisticResponse } from "@/types/StatisticType";
import Lottie from "lottie-react";
import loadingC from "public/loading_c.json";
import { Button } from "@/components/ui/button";
import PrivateRoute from "components/privateRoute";
import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

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

  const { global_score, rank } = statistics.statistic;
  const { games_count, correct_answers_percentage } = statistics;

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
              <Trophy className="w-5 h-5 mr-2" />
              <span>Rang {rank ?? "Beginner"}</span>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">{games_count}</div>
                <div className="text-gray-400">Parties</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-2xl font-bold mb-1">
                  {correct_answers_percentage}%
                </div>
                <div className="text-gray-400">Bonnes réponses</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PrivateRoute>
  );
};

export default UserStatisticsPage;

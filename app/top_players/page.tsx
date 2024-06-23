"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PrivateRoute from "components/privateRoute";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import loadingC from "public/loading_c.json";
import Lottie from "lottie-react";
import { StatisticType } from "@/types/StatisticType";

const TopPlayersPage = () => {
  const [topPlayers, setTopPlayers] = useState<StatisticType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      const token = sessionStorage.getItem("token"); // Récupérer le jeton du sessionStorage
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/statistics/top_players`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Envoyer le jeton dans l'en-tête Authorization
          },
          credentials: "include", // Inclure les cookies dans la requête
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTopPlayers(data);
      } else {
        console.error("Failed to fetch top players");
      }
      setLoading(false);
    };

    fetchTopPlayers();
  }, []);

  if (loading) {
    return (
      <div className="p-6 pt-20 flex flex-col justify-center items-center h-screen">
        <div className="w-20 h-20">
          <Lottie animationData={loadingC} loop={true} />
        </div>
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="p-6 pt-24">
        <Card className="w-full max-w-4xl mx-auto py-12 px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Meilleurs joueurs</h2>
            <p className="text-muted-foreground">
              Big respect si tu vois ton compte ici 🤝
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center"
          >
            <div className="grid grid-cols-1 gap-6 w-full">
              {topPlayers.map((player, index) => {
                let bgColor = "bg-white";
                let textColor = "text-muted-foreground";

                if (index === 0) {
                  bgColor = "bg-[#ffcc00]";
                  textColor = "text-[#333]";
                } else if (index === 1) {
                  bgColor = "bg-[#56b3ff]";
                  textColor = "text-[#333]";
                } else if (index === 2) {
                  bgColor = "bg-[#a556ff]";
                  textColor = "text-[#333]";
                }

                return (
                  <div
                    key={player.user.id}
                    className={`flex items-center gap-4 p-4 ${bgColor} rounded-lg shadow-lg`}
                  >
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={player.user.avatar || "/placeholder-user.jpg"}
                      />
                      <AvatarFallback>P{index + 1}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className={`text-lg font-medium ${textColor}`}>
                        {player.user.username}
                      </h3>
                      <p className={`text-sm ${textColor}`}>
                        Score: {player.global_score}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </Card>
      </div>
    </PrivateRoute>
  );
};

export default TopPlayersPage;

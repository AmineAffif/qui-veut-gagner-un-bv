"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { StatisticType } from "@/types/StatisticType";
import Lottie from "lottie-react";
import loadingC from "public/loading_c.json";
import { Button } from "@/components/ui/button";
import PrivateRoute from "components/privateRoute";

const UserStatisticsPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [statistics, setStatistics] = useState<StatisticType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchStatistics = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/statistics/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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

  return (
    <PrivateRoute>
      <div className="p-6 pt-24">
        <h1 className="text-3xl font-bold mb-6">User Statistics</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Global Score</label>
          <input
            type="text"
            name="global_score"
            value={statistics.global_score ?? ""}
            disabled
            className="w-full mt-2 p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rank</label>
          <input
            type="text"
            name="rank"
            value={statistics.rank}
            disabled
            className="w-full mt-2 p-2 border"
          />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default UserStatisticsPage;

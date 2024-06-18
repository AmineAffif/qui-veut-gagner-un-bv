"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useParams } from "next/navigation";
import { UserType } from "@/types/UserType";
import PrivateRoute from "components/privateRoute";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const UserProfilePage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams(); // Use useParams to get the user ID from the URL

  if (isLoading) {
    return <div>Loading...</div>; // Ou tout autre composant de chargement
  }

  useEffect(() => {
    if (isAuthenticated || !isLoading) {
      const fetchUser = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, // Use the ID from the URL
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Ensure cookies are included in the request
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            const errorData = await response.json();
            console.error("Error fetching user data:", errorData);
            setError(errorData.error || "Failed to fetch user data");
          }
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
          setError("An error occurred while fetching user data");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      router.push("/users/login");
      setLoading(false);
    }
  }, [isAuthenticated, id, router]);

  if (loading) {
    return (
      <div className="p-6 pt-20 flex flex-col justify-center items-center h-screen">
        <div className="w-20 h-20">
          <Lottie
            animationData={require("public/loading_c.json")}
            loop={true}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 pt-20 flex justify-center items-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-6 pt-20 flex justify-center items-center h-screen">
        <p>No user data available</p>
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="p-6 pt-24">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="bg-gray-950 text-white p-6 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-xl font-bold">
                  {userData.first_name} {userData.last_name}
                </div>
                <div className="text-sm text-gray-400">
                  @{userData.username}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Prénom
                </div>
                <div className="text-gray-900 dark:text-gray-100">
                  {userData.first_name}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Nom
                </div>
                <div className="text-gray-900 dark:text-gray-100">
                  {userData.last_name}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </div>
                <div className="text-gray-900 dark:text-gray-100">
                  {userData.email}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PrivateRoute>
  );
};

export default UserProfilePage;

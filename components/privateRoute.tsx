"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import loadingC from "public/loading_c.json";

// Dynamically import Lottie to ensure it only loads on the client
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/users/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="p-6 pt-20 flex flex-col justify-center items-center h-screen">
        <div className="w-20 h-20">
          <Lottie animationData={loadingC} loop={true} />
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/users/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // ou un spinner de chargement si vous préférez
  }

  return children;
};

export default PrivateRoute;

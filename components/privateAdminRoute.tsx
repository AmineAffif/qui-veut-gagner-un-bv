"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "context/AuthContext";

const PrivateAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) {
      router.push("/amine/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user?.is_admin) {
    return null; // ou un spinner de chargement si vous préférez
  }

  return children;
};

export default PrivateAdminRoute;

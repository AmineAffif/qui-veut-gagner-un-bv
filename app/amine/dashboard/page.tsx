"use client";

import PrivateAdminRoute from "components/privateAdminRoute";
import { useAuth } from "context/AuthContext";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <PrivateAdminRoute>
      <div className="p-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Bienvenue, {user?.email}!</p>
        {/* Ajoutez ici le contenu de votre tableau de bord admin */}
      </div>
    </PrivateAdminRoute>
  );
}

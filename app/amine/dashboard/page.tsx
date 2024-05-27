"use client";

import React from "react";
import Link from "next/link";
import PrivateAdminRoute from "components/privateAdminRoute";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="pt-28">Loading...</div>;
  }

  return (
    <PrivateAdminRoute>
      <div className="flex">
        <aside className="w-64 h-screen bg-white border-r pt-28 px-5">
          <h3>Hey {user?.admin_user.first_name} 😁</h3>
          <nav className="mt-10">
            <ul>
              <li className="mb-4">
                <Link
                  href="/amine/questions"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Questions
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          {/* Contenu du tableau de bord */}
        </main>
      </div>
    </PrivateAdminRoute>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import PrivateAdminRoute from "components/privateAdminRoute";
import { useAuth } from "@/context/AuthContext";
import DashboardComponent from "components/dashboardComponent";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="pt-28">Loading...</div>;
  }

  return (
    <PrivateAdminRoute>
      <div className="flex w-screen pt-20">
        {/* <aside className="w-64 h-screen bg-white border-r pt-10 px-5">
          <h3>Hey {user?.first_name} 😁</h3>
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
              <li className="mb-4">
                <Link
                  href="/amine/users"
                  className="text-gray-700 hover:text-blue-500"
                >
                  Users
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </main> */}
        <DashboardComponent />
      </div>
    </PrivateAdminRoute>
  );
}

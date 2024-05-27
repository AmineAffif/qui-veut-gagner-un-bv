"use client";

import PrivateRoute from "components/privateRoute";

export default function HomePage() {
  return (
    <PrivateRoute>
      <div className="p-4">
        <h1 className="text-3xl font-bold">Home Page</h1>
        {/* Ajoutez ici le contenu de votre page d'accueil */}
      </div>
    </PrivateRoute>
  );
}

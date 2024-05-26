"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Créer le contexte
const AuthContext = createContext();

// Créer un fournisseur de contexte
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Simuler une vérification d'authentification (par exemple, vérifier un token dans les cookies)
  useEffect(() => {
    // Remplacer ceci par une vraie logique d'authentification
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const login = (user) => {
    // Logique de connexion (par exemple, définir un token)
    localStorage.setItem("token", user.authentication_token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = async () => {
    // Logique de déconnexion (par exemple, supprimer un token)
    try {
      const response = await fetch("http://localhost:3000/users/sign_out", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

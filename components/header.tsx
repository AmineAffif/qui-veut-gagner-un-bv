"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, loading } = useAuth();

  return (
    <div
      className="absolute w-full bg-white mx-auto px-4 md:px-6 lg:px-8 select-none z-10"
      style={{
        background: "rgb(255 255 255 / 7%)",
        backdropFilter: "blur(2px)",
      }}
    >
      <header className="flex h-20 w-full items-center px-4 md:px-6 lg:px-8">
        <div className="flex items-center w-full">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-16 left-0 w-full py-4 mt-4 bg-white md:bg-transparent md:relative md:top-0 md:flex md:items-center md:justify-start md:w-full md:background-white`}
          >
            <Link
              className="m-4 invert block mr-4 md:inline-block h-9 w-max items-center justify-center rounded-md bg-transparent text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="/"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Home
            </Link>
            <Link
              className="m-4 invert block mr-4 md:inline-block h-9 w-max items-center justify-center rounded-md bg-transparent text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="/games/milhouse"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Milhouse
            </Link>
            {isAuthenticated && (
              <Link
                className="m-4 invert block mr-4 md:inline-block h-9 w-max items-center justify-center rounded-md bg-transparent text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="/games/quiz"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Quiz
              </Link>
            )}
            {user?.is_admin && (
              <Link
                className="m-4 invert block mr-4 md:inline-block h-9 w-max items-center justify-center rounded-md bg-transparent text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="/amine/dashboard"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Admin Dashboard
              </Link>
            )}
          </nav>
          <div className="ml-auto flex gap-2">
            {!loading && (
              <>
                {isAuthenticated ? (
                  <Button
                    className="justify-self-end px-5 py-1 text-sm"
                    variant="outline"
                    onClick={logout}
                  >
                    Se déconnecter
                  </Button>
                ) : (
                  <>
                    <Button
                      className="justify-self-end px-5 py-1 text-sm"
                      variant="outline"
                    >
                      <Link href="/users/login">Se connecter</Link>
                    </Button>
                    <Button className="justify-self-end px-5 py-1 text-sm">
                      <Link href="/users/register">S'inscrire</Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

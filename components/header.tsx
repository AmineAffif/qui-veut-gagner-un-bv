"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, BarChartBig, Trophy } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

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
            } absolute top-16 left-0 w-full py-4 mt-4 md:mt-0 bg-white md:bg-transparent md:relative md:top-0 md:flex md:items-center md:justify-start md:w-full md:background-white`}
          >
            <Link
              className="m-4 invert block mr-1 md:inline-block h-9 w-max items-center justify-center rounded-md bg-transparent text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="/"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Home
            </Link>
            <Link
              className="m-4 invert block mr-1 md:inline-block h-9 w-max items-center justify-center rounded-md bg-transparent text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              href="/games/milhouse"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Milhouse
            </Link>
            {isAuthenticated && (
              <Link
                className="m-4 invert block mr-1 md:inline-block h-9 w-max items-center justify-center rounded-md bg-transparent text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                href="/games/quiz"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Quiz
              </Link>
            )}
            {user?.is_admin && (
              <Link
                className="m-4 invert block mr-1 md:inline-block h-9 w-max items-center justify-center rounded-md bg-transparent text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
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
                  <>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={`/users/${user?.id}/statistics`}
                            className={`justify-self-end px-5 py-1 text-sm ${buttonVariants({ variant: "outline" })}`}
                          >
                            <BarChartBig width={16} height={16} />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Statistiques</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={`/top_players`}
                            className={`justify-self-end px-5 py-1 text-sm ${buttonVariants({ variant: "outline" })}`}
                          >
                            <Trophy className="h-4 w-4" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Classement</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={`/users/${user?.id}`}
                            className={`justify-self-end px-5 py-1 text-sm ${buttonVariants({ variant: "outline" })}`}
                          >
                            <User className="h-4 w-4" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Profil</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button
                      className="justify-self-end px-5 py-1 text-sm"
                      variant="outline"
                      onClick={logout}
                    >
                      Se déconnecter
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/users/login"
                      className={`justify-self-end px-5 py-1 text-sm ${buttonVariants({ variant: "outline" })}`}
                    >
                      Se connecter
                    </Link>
                    <Link
                      href="/users/register"
                      className={`justify-self-end px-5 py-1 text-sm ${buttonVariants({ variant: "default" })}`}
                    >
                      S'inscrire
                    </Link>
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

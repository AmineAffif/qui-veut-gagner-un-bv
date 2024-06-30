import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import {
  GamepadIcon,
  HomeIcon,
  Package2Icon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const getLinkClasses = (href: string) => {
    return currentPath.startsWith(href)
      ? "flex items-center gap-3 rounded-lg bg-blue-500 text-white px-3 py-2 transition-all"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  };

  return (
    <>
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex min-h-screen h-full max-h-screen flex-col gap-2 w-[280px]">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              <Package2Icon className="h-6 w-6" />
              <span className="">Admin Dashboard</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="/amine/dashboard"
                className={getLinkClasses("/amine/dashboard")}
                prefetch={false}
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/amine/users"
                className={getLinkClasses("/amine/users")}
                prefetch={false}
              >
                <UsersIcon className="h-4 w-4" />
                Users
              </Link>
              <Link
                href="/amine/admin_users"
                className={getLinkClasses("/amine/admin_users")}
                prefetch={false}
              >
                <UsersIcon className="h-4 w-4" />
                Admin Users
              </Link>
              <Link
                href="/amine/questions"
                className={getLinkClasses("/amine/questions")}
                prefetch={false}
              >
                <UsersIcon className="h-4 w-4" />
                Questions
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-screen p-6 pt-20">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </div>
    </>
  );
}

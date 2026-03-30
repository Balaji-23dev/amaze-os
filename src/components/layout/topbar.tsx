"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, LogOut, Settings, User } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface TopbarProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
    role: string;
    title?: string | null;
  };
}

export function Topbar({ user }: TopbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    const { signOut } = await import("next-auth/react");
    await signOut({ callbackUrl: "/login" });
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      {/* Search */}
      <div className="flex flex-1 items-center">
        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-200 ${
            searchFocused
              ? "w-80 border-teal-500 ring-2 ring-teal-500/20"
              : "w-64 border-slate-200 dark:border-slate-700"
          } bg-slate-50 dark:bg-slate-800/50`}
        >
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search people, departments..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none dark:text-white dark:placeholder:text-slate-500"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="hidden rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-400 sm:inline-block">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-teal-500 ring-2 ring-white dark:ring-slate-950" />
        </button>

        {/* User dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Avatar name={user.name} src={user.image} size="sm" />
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user.title || user.role}
              </p>
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user.email}
                </p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/dashboard/settings");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/dashboard/settings");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
              </div>
              <div className="border-t border-slate-100 py-1 dark:border-slate-800">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

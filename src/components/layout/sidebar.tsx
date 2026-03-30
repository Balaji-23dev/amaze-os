"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  CalendarOff,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "People", href: "/dashboard/people", icon: Users },
  { name: "Departments", href: "/dashboard/departments", icon: Building2 },
  { name: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck },
  { name: "Leave", href: "/dashboard/leave", icon: CalendarOff },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-navy-600 to-teal-500">
            <Zap className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-base font-bold text-slate-900 dark:text-white truncate">
                AmazOS
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                People Platform
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-navy-50 text-navy-700 dark:bg-teal-500/10 dark:text-teal-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                )}
                title={collapsed ? item.name : undefined}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive
                      ? "text-navy-600 dark:text-teal-400"
                      : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                  )}
                />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={cn(
                "h-5 w-5 transition-transform duration-300",
                collapsed && "rotate-180"
              )}
            />
          </button>
        </div>
      </aside>

      {/* Spacer to push main content */}
      <div className={cn("shrink-0 transition-all duration-300", collapsed ? "w-[72px]" : "w-64")} />
    </>
  );
}

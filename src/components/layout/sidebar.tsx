"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Users,
  Building2,
  Network,
  Briefcase,
  Settings,
  ChevronLeft,
  LogOut,
  User,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownItem, DropdownSeparator } from "@/components/ui/dropdown-menu";
import { Tooltip } from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Inbox", href: "/dashboard/inbox", icon: <Inbox className="h-4 w-4" /> },
];

const peopleNav: NavItem[] = [
  { label: "Directory", href: "/dashboard/people", icon: <Users className="h-4 w-4" /> },
  { label: "Departments", href: "/dashboard/departments", icon: <Building2 className="h-4 w-4" /> },
  { label: "Org Chart", href: "/dashboard/org-chart", icon: <Network className="h-4 w-4" /> },
];

const operationsNav: NavItem[] = [
  { label: "Operations", href: "/dashboard/operations", icon: <Briefcase className="h-4 w-4" /> },
];

const settingsNav: NavItem[] = [
  { label: "Settings", href: "/dashboard/settings", icon: <Settings className="h-4 w-4" /> },
];

function NavSection({
  title,
  items,
  collapsed,
  pathname,
}: {
  title: string;
  items: NavItem[];
  collapsed: boolean;
  pathname: string;
}) {
  return (
    <div className="mb-1">
      {!collapsed && (
        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {title}
        </p>
      )}
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        const link = (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200",
              collapsed && "justify-center px-2"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        );

        if (collapsed) {
          return (
            <Tooltip key={item.href} content={item.label} side="top">
              {link}
            </Tooltip>
          );
        }
        return link;
      })}
    </div>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-200 dark:border-slate-800 dark:bg-slate-950",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className={cn("flex h-14 items-center border-b border-slate-200 dark:border-slate-800", collapsed ? "justify-center px-2" : "justify-between px-4")}>
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-xs font-bold text-white">
              A
            </div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">AmazOS</span>
          </Link>
        )}
        {collapsed && (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-xs font-bold text-white">
            A
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300",
            collapsed && "hidden"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        <NavSection title="Main" items={mainNav} collapsed={collapsed} pathname={pathname} />
        <NavSection title="People" items={peopleNav} collapsed={collapsed} pathname={pathname} />
        <NavSection title="Operations" items={operationsNav} collapsed={collapsed} pathname={pathname} />
        <NavSection title="System" items={settingsNav} collapsed={collapsed} pathname={pathname} />
      </nav>

      {/* Expand button (when collapsed) */}
      {collapsed && (
        <div className="flex justify-center px-2 py-2">
          <button
            onClick={() => setCollapsed(false)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
            aria-label="Expand sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* User */}
      <div className="border-t border-slate-200 p-2 dark:border-slate-800">
        <DropdownMenu
          align="left"
          trigger={
            <button
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md p-2 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                collapsed && "justify-center"
              )}
            >
              <Avatar name="Basha" size="sm" status="online" />
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">Basha</p>
                  <p className="truncate text-xs text-slate-500">Admin</p>
                </div>
              )}
            </button>
          }
        >
          <DropdownItem icon={<User className="h-4 w-4" />}>Profile</DropdownItem>
          <DropdownItem icon={<Settings className="h-4 w-4" />}>Settings</DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={<LogOut className="h-4 w-4" />} destructive>
            Sign out
          </DropdownItem>
        </DropdownMenu>
      </div>
    </aside>
  );
}

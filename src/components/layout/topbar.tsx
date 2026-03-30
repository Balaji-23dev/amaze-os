"use client";

import { Bell, Menu } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { SearchInput } from "@/components/ui/search-input";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Tooltip } from "@/components/ui/tooltip";

interface TopbarProps {
  breadcrumbs?: BreadcrumbItem[];
  onMenuClick?: () => void;
  onSearchClick?: () => void;
}

export function Topbar({ breadcrumbs, onMenuClick, onSearchClick }: TopbarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950 lg:px-6">
      <div className="flex items-center gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      </div>

      <div className="hidden max-w-md flex-1 px-8 md:block">
        <SearchInput
          placeholder="Search employees, departments..."
          shortcutHint="⌘K"
          readOnly
          onClick={onSearchClick}
          className="cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-2">
        <Tooltip content="Notifications">
          <button
            className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </Tooltip>
        <Avatar name="Basha" size="sm" />
      </div>
    </header>
  );
}

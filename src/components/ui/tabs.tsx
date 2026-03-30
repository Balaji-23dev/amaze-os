"use client";

import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex border-b border-slate-200 dark:border-slate-800", className)} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium transition-colors",
            activeTab === tab.id
              ? "text-teal-600 dark:text-teal-400"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-xs",
                  activeTab === tab.id
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                )}
              >
                {tab.count}
              </span>
            )}
          </span>
          {activeTab === tab.id && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-teal-600 dark:bg-teal-400" />
          )}
        </button>
      ))}
    </div>
  );
}

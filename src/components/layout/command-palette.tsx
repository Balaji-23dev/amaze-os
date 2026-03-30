"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Users,
  Building2,
  LayoutDashboard,
  UserPlus,
  Settings,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  href?: string;
  action?: () => void;
  category: string;
}

const staticCommands: CommandItem[] = [
  {
    id: "dashboard",
    label: "Go to Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: "/dashboard",
    category: "Navigation",
  },
  {
    id: "people",
    label: "People Directory",
    icon: <Users className="h-4 w-4" />,
    href: "/dashboard/people",
    category: "Navigation",
  },
  {
    id: "departments",
    label: "Departments",
    icon: <Building2 className="h-4 w-4" />,
    href: "/dashboard/departments",
    category: "Navigation",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
    href: "/dashboard/settings",
    category: "Navigation",
  },
  {
    id: "add-employee",
    label: "Add Employee",
    description: "Create a new employee record",
    icon: <UserPlus className="h-4 w-4" />,
    href: "/dashboard/people/new",
    category: "Quick Actions",
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = staticCommands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      (cmd.description && cmd.description.toLowerCase().includes(query.toLowerCase()))
  );

  const categories = [...new Set(filtered.map((c) => c.category))];

  const handleSelect = useCallback(
    (item: CommandItem) => {
      setOpen(false);
      setQuery("");
      if (item.href) router.push(item.href);
      if (item.action) item.action();
    },
    [router]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, filtered, selectedIndex, handleSelect]);

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Search input */}
        <div className="flex items-center border-b border-slate-200 px-4 dark:border-slate-800">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent px-3 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
          />
          <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-700 dark:bg-slate-800">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-500">No results found</p>
          ) : (
            categories.map((cat) => (
              <div key={cat}>
                <p className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  {cat}
                </p>
                {filtered
                  .filter((c) => c.category === cat)
                  .map((item) => {
                    flatIndex++;
                    const idx = flatIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                          idx === selectedIndex
                            ? "bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300"
                            : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        )}
                      >
                        <span className="shrink-0 text-slate-400">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{item.label}</p>
                          {item.description && (
                            <p className="truncate text-xs text-slate-500">{item.description}</p>
                          )}
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                      </button>
                    );
                  })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-slate-200 px-4 py-2 text-[10px] text-slate-400 dark:border-slate-800">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}

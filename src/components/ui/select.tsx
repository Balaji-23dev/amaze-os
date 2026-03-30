"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  searchable?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  error,
  searchable = false,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const filtered = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setSearch("");
      }
    }
    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  return (
    <div className={cn("flex flex-col gap-1.5", className)} ref={ref}>
      {label && (
        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-sm shadow-sm transition-colors hover:border-slate-300 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600",
          error && "border-red-500",
          !selected && "text-slate-400 dark:text-slate-500"
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={cn(selected ? "text-slate-900 dark:text-slate-100" : "")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="relative z-50">
          <div className="absolute top-1 w-full rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
            {searchable && (
              <div className="flex items-center border-b border-slate-200 px-3 dark:border-slate-700">
                <Search className="h-3.5 w-3.5 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent px-2 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
                  autoFocus
                />
              </div>
            )}
            <div className="max-h-56 overflow-y-auto p-1" role="listbox">
              {filtered.length === 0 ? (
                <div className="px-3 py-2 text-sm text-slate-500">No results found</div>
              ) : (
                filtered.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={option.value === value}
                    onClick={() => {
                      onChange?.(option.value);
                      setOpen(false);
                      setSearch("");
                    }}
                    className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {option.icon}
                    <span className="flex-1 text-left">{option.label}</span>
                    {option.value === value && (
                      <Check className="h-3.5 w-3.5 text-teal-600" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

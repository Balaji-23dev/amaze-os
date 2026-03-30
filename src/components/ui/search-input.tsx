"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  shortcutHint?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, shortcutHint, value, ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          ref={ref}
          type="text"
          value={value}
          className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-20 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          {...props}
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {value && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="rounded p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          {shortcutHint && (
            <kbd className="hidden rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:inline-block dark:border-slate-700 dark:bg-slate-800">
              {shortcutHint}
            </kbd>
          )}
        </div>
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };

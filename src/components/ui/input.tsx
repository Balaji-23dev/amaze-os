import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-teal-500",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-700"
              : "border-slate-300 dark:border-slate-700",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {hint && !error && <p className="text-sm text-slate-500 dark:text-slate-400">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

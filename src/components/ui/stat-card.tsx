import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { value: number; positive: boolean };
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ label, value, trend, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {value}
          </p>
          {trend && (
            <div className="mt-1.5 flex items-center gap-1">
              {trend.positive ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.positive ? "text-emerald-600" : "text-red-600"
                )}
              >
                {trend.value}%
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-teal-50 p-2.5 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export type Role = "ADMIN" | "MANAGER" | "EMPLOYEE";
export type EmployeeStatus = "ACTIVE" | "ON_LEAVE" | "INACTIVE";

export const roleColors: Record<Role, string> = {
  ADMIN: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  MANAGER: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  EMPLOYEE: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export const statusColors: Record<EmployeeStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  ON_LEAVE: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  INACTIVE: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export const statusLabels: Record<EmployeeStatus, string> = {
  ACTIVE: "Active",
  ON_LEAVE: "On Leave",
  INACTIVE: "Inactive",
};

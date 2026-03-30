"use client";

import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-20 w-20 text-xl",
};

const colors = [
  "bg-blue-600",
  "bg-teal-600",
  "bg-indigo-600",
  "bg-purple-600",
  "bg-rose-600",
  "bg-amber-600",
  "bg-emerald-600",
  "bg-cyan-600",
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          "rounded-full object-cover ring-2 ring-white dark:ring-slate-800",
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-white ring-2 ring-white dark:ring-slate-800",
        sizeClasses[size],
        getColorFromName(name),
        className
      )}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}

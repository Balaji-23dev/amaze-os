import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "away" | "offline";
  className?: string;
}

const sizeClasses = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-11 w-11 text-base",
  xl: "h-16 w-16 text-xl",
};

const statusDotSizes = {
  sm: "h-2 w-2 right-0 bottom-0",
  md: "h-2.5 w-2.5 right-0 bottom-0",
  lg: "h-3 w-3 right-0 bottom-0",
  xl: "h-3.5 w-3.5 right-0.5 bottom-0.5",
};

const statusColors = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-slate-400",
};

// Deterministic color from name
function getAvatarColor(name: string): string {
  const colors = [
    "bg-teal-600", "bg-blue-600", "bg-purple-600", "bg-rose-600",
    "bg-amber-600", "bg-indigo-600", "bg-cyan-600", "bg-emerald-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ name, src, size = "md", status, className }: AvatarProps) {
  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            "rounded-full object-cover",
            sizeClasses[size]
          )}
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center rounded-full font-medium text-white",
            sizeClasses[size],
            getAvatarColor(name)
          )}
          aria-label={name}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={cn(
            "absolute rounded-full border-2 border-white dark:border-slate-900",
            statusDotSizes[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
        active: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        "on-leave": "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        inactive: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-500",
        admin: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
        manager: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        department: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
        danger: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "mr-1.5 h-1.5 w-1.5 rounded-full",
            variant === "active" && "bg-emerald-500",
            variant === "on-leave" && "bg-amber-500",
            variant === "inactive" && "bg-slate-400",
            variant === "danger" && "bg-red-500",
            (!variant || variant === "default") && "bg-slate-400"
          )}
        />
      )}
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const variant = status === "ACTIVE" ? "active" : status === "ON_LEAVE" ? "on-leave" : "inactive";
  const label = status === "ACTIVE" ? "Active" : status === "ON_LEAVE" ? "On Leave" : "Inactive";
  return <Badge variant={variant} dot>{label}</Badge>;
}

export function RoleBadge({ role }: { role: string }) {
  const variant = role === "ADMIN" ? "admin" : role === "MANAGER" ? "manager" : "default";
  return <Badge variant={variant}>{role.charAt(0) + role.slice(1).toLowerCase()}</Badge>;
}

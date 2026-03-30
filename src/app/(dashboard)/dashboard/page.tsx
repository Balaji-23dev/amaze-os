import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import {
  Users,
  UserCheck,
  Building2,
  FileText,
  UserPlus,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";

async function getStats() {
  const [totalEmployees, activeEmployees, departmentCount, recentEmployees] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: "ACTIVE" } }),
      prisma.department.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { department: true },
      }),
    ]);

  return {
    totalEmployees,
    activeEmployees,
    departmentCount,
    openRequests: 3, // Placeholder
    recentEmployees,
  };
}

export default async function DashboardPage() {
  const session = await auth();
  const stats = await getStats();

  const statCards = [
    {
      label: "Total Employees",
      value: stats.totalEmployees,
      icon: Users,
      color: "text-navy-600 dark:text-navy-300",
      bg: "bg-navy-50 dark:bg-navy-900/30",
      trend: "+12%",
    },
    {
      label: "Active",
      value: stats.activeEmployees,
      icon: UserCheck,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-900/30",
      trend: "+5%",
    },
    {
      label: "Departments",
      value: stats.departmentCount,
      icon: Building2,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/30",
      trend: null,
    },
    {
      label: "Open Requests",
      value: stats.openRequests,
      icon: FileText,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/30",
      trend: "-2",
    },
  ];

  const quickActions = [
    {
      label: "Add Employee",
      href: "/dashboard/people/new",
      icon: UserPlus,
      description: "Onboard a new team member",
    },
    {
      label: "View People",
      href: "/dashboard/people",
      icon: Users,
      description: "Browse the employee directory",
    },
    {
      label: "Departments",
      href: "/dashboard/departments",
      icon: Building2,
      description: "Manage team structure",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Welcome back, {session?.user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here&apos;s what&apos;s happening with your team today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  {stat.trend && (
                    <div className="mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-teal-500" />
                      <span className="text-xs font-medium text-teal-600 dark:text-teal-400">
                        {stat.trend}
                      </span>
                      <span className="text-xs text-slate-400">vs last month</span>
                    </div>
                  )}
                </div>
                <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Recent Employees
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Latest additions to your team
              </p>
            </div>
            <Link
              href="/dashboard/people"
              className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentEmployees.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">
                No employees yet. Add your first team member!
              </p>
            ) : (
              stats.recentEmployees.map((emp) => (
                <Link
                  key={emp.id}
                  href={`/dashboard/people/${emp.id}`}
                  className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <Avatar name={emp.name} src={emp.avatar} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {emp.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {emp.title || emp.role} · {emp.department?.name || "Unassigned"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="h-3 w-3" />
                    {formatDate(emp.createdAt)}
                  </div>
                  <Badge variant={emp.status === "ACTIVE" ? "success" : emp.status === "ON_LEAVE" ? "warning" : "danger"}>
                    {emp.status === "ACTIVE" ? "Active" : emp.status === "ON_LEAVE" ? "On Leave" : "Inactive"}
                  </Badge>
                </Link>
              ))
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Quick Actions
          </h2>
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50/50 dark:border-slate-700 dark:hover:border-teal-800 dark:hover:bg-teal-900/10"
                >
                  <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                    <Icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {action.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                </Link>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

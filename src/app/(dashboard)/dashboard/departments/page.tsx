"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, Users, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Avatar } from "@/components/ui/avatar";

interface DepartmentMember {
  id: string;
  name: string;
  avatar: string | null;
  title: string | null;
  role: string;
}

interface Department {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  _count: { members: number };
  members: DepartmentMember[];
}

const departmentColors: Record<string, string> = {
  "TMS Operations": "from-blue-500 to-blue-600",
  "Medical Billing": "from-rose-500 to-rose-600",
  Administration: "from-purple-500 to-purple-600",
  HR: "from-teal-500 to-teal-600",
  IT: "from-cyan-500 to-cyan-600",
  Finance: "from-amber-500 to-amber-600",
};

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await fetch("/api/departments?includeMembers=true");
        const data = await res.json();
        setDepartments(data.departments || []);
      } catch {
        console.error("Failed to fetch departments");
      } finally {
        setLoading(false);
      }
    }
    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Departments
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Organizational structure and team breakdown.
        </p>
      </div>

      {departments.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No departments yet"
          description="Departments will appear here once configured."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => {
            const gradient = departmentColors[dept.name] || "from-slate-500 to-slate-600";
            const isExpanded = expanded === dept.id;

            return (
              <Card
                key={dept.id}
                className="overflow-hidden p-0 transition-all duration-200 hover:shadow-md"
              >
                {/* Color bar */}
                <div className={`h-2 bg-gradient-to-r ${gradient}`} />

                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {dept.name}
                      </h3>
                      {dept.description && (
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {dept.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <Users className="h-3.5 w-3.5" />
                      {dept._count.members}
                    </div>
                  </div>

                  {/* Member preview */}
                  {dept.members.length > 0 && (
                    <div className="mt-4">
                      <div className="flex -space-x-2">
                        {dept.members.slice(0, 5).map((m) => (
                          <Avatar key={m.id} name={m.name} src={m.avatar} size="sm" className="ring-2 ring-white dark:ring-slate-900" />
                        ))}
                        {dept._count.members > 5 && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600 ring-2 ring-white dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-900">
                            +{dept._count.members - 5}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Expand to see members */}
                  <button
                    onClick={() => setExpanded(isExpanded ? null : dept.id)}
                    className="mt-4 flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>{isExpanded ? "Hide members" : "View members"}</span>
                    <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                  </button>

                  {isExpanded && dept.members.length > 0 && (
                    <div className="mt-3 space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                      {dept.members.map((m) => (
                        <Link
                          key={m.id}
                          href={`/dashboard/people/${m.id}`}
                          className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <Avatar name={m.name} src={m.avatar} size="sm" />
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{m.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{m.title || m.role}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

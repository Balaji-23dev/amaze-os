"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Users } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Department {
  id: string;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  _count: { members: number };
}

const iconMap: Record<string, string> = {
  truck: "🚛",
  stethoscope: "🏥",
  users: "👥",
  "indian-rupee": "💰",
  monitor: "💻",
  building: "🏢",
};

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/departments");
        const data = await res.json();
        setDepartments(data.departments || []);
      } catch {
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Departments</h1>
        <p className="text-sm text-slate-500">Organizational structure of Amaze Tech Solutions</p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <Link key={dept.id} href={`/dashboard/people?departmentId=${dept.id}`}>
              <Card className="group cursor-pointer transition-all hover:shadow-md">
                <CardBody>
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-xl"
                      style={{
                        backgroundColor: dept.color ? `${dept.color}15` : "#f0fdfa",
                      }}
                    >
                      {dept.icon ? iconMap[dept.icon] || "📁" : <Building2 className="h-5 w-5 text-teal-600" />}
                    </div>
                    <Badge>
                      <Users className="mr-1 h-3 w-3" />
                      {dept._count.members}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-semibold text-slate-900 group-hover:text-teal-600 dark:text-slate-100 dark:group-hover:text-teal-400">
                    {dept.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {dept.description || "No description"}
                  </p>
                  <div
                    className="mt-3 h-1 w-full rounded-full opacity-60"
                    style={{ backgroundColor: dept.color || "#0d9488" }}
                  />
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

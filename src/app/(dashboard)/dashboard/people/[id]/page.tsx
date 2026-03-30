"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  MapPin,
  Edit,
  Briefcase,
  FileText,
  Clock,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate, type Role, type EmployeeStatus, roleColors, statusColors, statusLabels } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  phone: string | null;
  role: string;
  title: string | null;
  status: string;
  startDate: string | null;
  department: { id: string; name: string } | null;
  manager: { id: string; name: string } | null;
  reports: { id: string; name: string; avatar: string | null; title: string | null; role: string }[];
  createdAt: string;
}

const tabs = [
  { id: "overview", label: "Overview", icon: Briefcase },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "attendance", label: "Attendance", icon: Clock },
  { id: "notes", label: "Notes", icon: StickyNote },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function EmployeeProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await fetch(`/api/employees/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setEmployee(data.employee);
      } catch {
        router.push("/dashboard/people");
      } finally {
        setLoading(false);
      }
    }
    fetchEmployee();
  }, [id, router]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center gap-6">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  if (!employee) return null;

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href="/dashboard/people"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to People
      </Link>

      {/* Profile header */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-navy-600 to-teal-600" />
        <div className="relative pt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <Avatar name={employee.name} src={employee.avatar} size="xl" className="ring-4 ring-white dark:ring-slate-900" />
            <div className="pb-1">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {employee.name}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {employee.title || employee.role} · {employee.department?.name || "Unassigned"}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", roleColors[employee.role as Role])}>
                  {employee.role}
                </span>
                <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusColors[employee.status as EmployeeStatus])}>
                  {statusLabels[employee.status as EmployeeStatus] || employee.status}
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <nav className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "border-teal-500 text-teal-600 dark:text-teal-400"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Contact Info */}
          <Card>
            <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                  <Mail className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                  <p className="text-sm text-slate-900 dark:text-white">{employee.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                  <Phone className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                  <p className="text-sm text-slate-900 dark:text-white">{employee.phone || "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                  <Building2 className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Department</p>
                  <p className="text-sm text-slate-900 dark:text-white">{employee.department?.name || "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                  <Calendar className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Start Date</p>
                  <p className="text-sm text-slate-900 dark:text-white">{formatDate(employee.startDate)}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Employment Details */}
          <Card>
            <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
              Employment Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Role</span>
                <Badge>{employee.role}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Title</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{employee.title || "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Status</span>
                <Badge variant={employee.status === "ACTIVE" ? "success" : employee.status === "ON_LEAVE" ? "warning" : "danger"}>
                  {statusLabels[employee.status as EmployeeStatus] || employee.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Manager</span>
                {employee.manager ? (
                  <Link
                    href={`/dashboard/people/${employee.manager.id}`}
                    className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400"
                  >
                    {employee.manager.name}
                  </Link>
                ) : (
                  <span className="text-sm text-slate-400">—</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">Member since</span>
                <span className="text-sm text-slate-900 dark:text-white">{formatDate(employee.createdAt)}</span>
              </div>
            </div>
          </Card>

          {/* Direct Reports */}
          {employee.reports.length > 0 && (
            <Card className="md:col-span-2">
              <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
                Direct Reports ({employee.reports.length})
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {employee.reports.map((report) => (
                  <Link
                    key={report.id}
                    href={`/dashboard/people/${report.id}`}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition-colors hover:border-teal-200 hover:bg-teal-50/50 dark:border-slate-700 dark:hover:border-teal-800 dark:hover:bg-teal-900/10"
                  >
                    <Avatar name={report.name} src={report.avatar} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{report.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{report.title || report.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === "documents" && (
        <Card>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
              <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">No documents yet</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Document management is coming soon.
            </p>
          </div>
        </Card>
      )}

      {activeTab === "attendance" && (
        <Card>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
              <Clock className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Attendance tracking</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Attendance records will appear here once enabled.
            </p>
          </div>
        </Card>
      )}

      {activeTab === "notes" && (
        <Card>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
              <StickyNote className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">No notes yet</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Notes and annotations will be available soon.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

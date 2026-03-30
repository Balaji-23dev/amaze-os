"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  UserX,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Shield,
  Heart,
  FileText,
  Clock,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge, StatusBadge, RoleBadge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { DropdownMenu, DropdownItem, DropdownSeparator } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

interface EmployeeDetail {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  title: string | null;
  role: string;
  status: string;
  avatar: string | null;
  dateOfBirth: string | null;
  address: string | null;
  employeeId: string | null;
  employmentType: string | null;
  startDate: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelation: string | null;
  department: { id: string; name: string; color: string | null } | null;
  manager: { id: string; name: string } | null;
  reports: { id: string; name: string; title: string | null }[];
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null | undefined }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <span className="mt-0.5 text-slate-400">{icon}</span>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-sm text-slate-900 dark:text-slate-100">{value || "—"}</p>
      </div>
    </div>
  );
}

export default function EmployeeProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<EmployeeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/employees/${params.id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setEmployee(data);
      } catch {
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center py-20">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Employee not found</p>
        <Link href="/dashboard/people">
          <Button variant="secondary" className="mt-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "documents", label: "Documents" },
    { id: "attendance", label: "Attendance" },
    { id: "notes", label: "Notes" },
  ];

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/people"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to People
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={employee.name} src={employee.avatar} size="xl" />
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {employee.name}
            </h1>
            <p className="text-sm text-slate-500">{employee.title || "No title"}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {employee.department && (
                <Badge variant="department">{employee.department.name}</Badge>
              )}
              <StatusBadge status={employee.status} />
              <RoleBadge role={employee.role} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
          <DropdownMenu
            trigger={
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
          >
            <DropdownItem icon={<UserX className="h-3.5 w-3.5" />} destructive>
              Deactivate
            </DropdownItem>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardBody className="space-y-1">
              <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value={employee.email} />
              <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={employee.phone} />
              <InfoRow icon={<Calendar className="h-4 w-4" />} label="Date of Birth" value={employee.dateOfBirth ? formatDate(employee.dateOfBirth) : null} />
              <InfoRow icon={<MapPin className="h-4 w-4" />} label="Address" value={employee.address} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
            </CardHeader>
            <CardBody className="space-y-1">
              <InfoRow icon={<Shield className="h-4 w-4" />} label="Employee ID" value={employee.employeeId} />
              <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Department" value={employee.department?.name} />
              <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Title" value={employee.title} />
              <InfoRow icon={<Calendar className="h-4 w-4" />} label="Start Date" value={employee.startDate ? formatDate(employee.startDate) : null} />
              <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Employment Type" value={employee.employmentType?.replace("_", " ")} />
              {employee.manager && (
                <InfoRow icon={<Briefcase className="h-4 w-4" />} label="Manager" value={employee.manager.name} />
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
            </CardHeader>
            <CardBody className="space-y-1">
              <InfoRow icon={<Heart className="h-4 w-4" />} label="Name" value={employee.emergencyContactName} />
              <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={employee.emergencyContactPhone} />
              <InfoRow icon={<Heart className="h-4 w-4" />} label="Relationship" value={employee.emergencyContactRelation} />
            </CardBody>
          </Card>

          {employee.reports.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Direct Reports ({employee.reports.length})</CardTitle>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {employee.reports.map((r) => (
                    <Link
                      key={r.id}
                      href={`/dashboard/people/${r.id}`}
                      className="flex items-center gap-2.5 px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <Avatar name={r.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{r.name}</p>
                        <p className="text-xs text-slate-500">{r.title || "—"}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      )}

      {activeTab === "documents" && (
        <Card>
          <CardBody>
            <div className="flex flex-col items-center py-8 text-center">
              <FileText className="h-8 w-8 text-slate-300" />
              <p className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">No documents yet</p>
              <p className="text-xs text-slate-500">Documents will appear here once uploaded</p>
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === "attendance" && (
        <Card>
          <CardBody>
            <div className="flex flex-col items-center py-8 text-center">
              <Clock className="h-8 w-8 text-slate-300" />
              <p className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">Attendance tracking coming soon</p>
              <p className="text-xs text-slate-500">This feature is under development</p>
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === "notes" && (
        <Card>
          <CardBody>
            <div className="flex flex-col items-center py-8 text-center">
              <StickyNote className="h-8 w-8 text-slate-300" />
              <p className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">No notes yet</p>
              <p className="text-xs text-slate-500">Add notes about this employee</p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

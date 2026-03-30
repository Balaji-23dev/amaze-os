"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, Plus, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Users } from "lucide-react";
import { cn, type Role, type EmployeeStatus, roleColors, statusColors, statusLabels } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  title: string | null;
  status: string;
  phone: string | null;
  department: { id: string; name: string } | null;
}

interface Department {
  id: string;
  name: string;
}

export default function PeoplePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filterDept) params.set("departmentId", filterDept);
      if (filterRole) params.set("role", filterRole);
      if (filterStatus) params.set("status", filterStatus);

      const res = await fetch(`/api/employees?${params.toString()}`);
      const data = await res.json();
      setEmployees(data.employees || []);
    } catch {
      console.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  }, [search, filterDept, filterRole, filterStatus]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await fetch("/api/departments");
        const data = await res.json();
        setDepartments(data.departments || []);
      } catch {
        console.error("Failed to fetch departments");
      }
    }
    fetchDepartments();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            People
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your team members and their information.
          </p>
        </div>
        <Link href="/dashboard/people/new">
          <Button>
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={cn("h-4 w-4 transition-transform", showFilters && "rotate-180")} />
          </Button>
        </div>

        {showFilters && (
          <div className="mt-3 grid grid-cols-1 gap-3 border-t border-slate-100 pt-3 dark:border-slate-800 sm:grid-cols-3">
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="ON_LEAVE">On Leave</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        )}
      </Card>

      {/* Employee Table */}
      <Card className="overflow-hidden p-0">
        {loading ? (
          <div className="space-y-4 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        ) : employees.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No employees found"
            description={search || filterDept || filterRole || filterStatus
              ? "Try adjusting your search or filters."
              : "Get started by adding your first employee."}
            action={
              !search && !filterDept && !filterRole && !filterStatus ? (
                <Link href="/dashboard/people/new">
                  <Button>
                    <Plus className="h-4 w-4" />
                    Add Employee
                  </Button>
                </Link>
              ) : undefined
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/people/${emp.id}`}
                        className="flex items-center gap-3"
                      >
                        <Avatar name={emp.name} src={emp.avatar} size="sm" />
                        <div>
                          <p className="text-sm font-medium text-slate-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400 transition-colors">
                            {emp.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {emp.email}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", roleColors[emp.role as Role] || roleColors.EMPLOYEE)}>
                        {emp.title || emp.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {emp.department?.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusColors[emp.status as EmployeeStatus] || statusColors.ACTIVE)}>
                        {statusLabels[emp.status as EmployeeStatus] || emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {emp.phone || "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

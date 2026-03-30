"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  LayoutGrid,
  List,
  MoreHorizontal,
  Mail,
  Eye,
  Pencil,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Badge, StatusBadge, RoleBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Pagination,
} from "@/components/ui/table";
import { Card, CardBody } from "@/components/ui/card";
import { DropdownMenu, DropdownItem, DropdownSeparator } from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonTable } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  email: string;
  title: string | null;
  role: string;
  status: string;
  phone: string | null;
  avatar: string | null;
  department: { id: string; name: string; color: string | null } | null;
}

export default function PeoplePage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"table" | "grid">("table");
  const [page, setPage] = useState(1);
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const pageSize = 10;

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (departmentFilter) params.set("departmentId", departmentFilter);
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/employees?${params.toString()}`);
      const data = await res.json();
      setEmployees(data.employees || []);
    } catch {
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, [search, departmentFilter, statusFilter]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const filtered = employees;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">People</h1>
          <p className="text-sm text-slate-500">{employees.length} employees</p>
        </div>
        <Link href="/dashboard/people/new">
          <Button size="sm">
            <UserPlus className="h-3.5 w-3.5" />
            Add Employee
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          placeholder="Search by name, email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          onClear={() => {
            setSearch("");
            setPage(1);
          }}
          className="sm:max-w-xs"
        />

        <div className="flex items-center gap-2">
          {/* Status filter chips */}
          {["ACTIVE", "ON_LEAVE", "INACTIVE"].map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(statusFilter === s ? "" : s);
                setPage(1);
              }}
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                statusFilter === s
                  ? "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              )}
            >
              {s === "ON_LEAVE" ? "On Leave" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setView("table")}
            className={cn(
              "rounded-md p-1.5 transition-colors",
              view === "table"
                ? "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            )}
            aria-label="Table view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("grid")}
            className={cn(
              "rounded-md p-1.5 transition-colors",
              view === "grid"
                ? "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Card>
          <SkeletonTable rows={6} />
        </Card>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="No employees found"
          description={search ? "Try adjusting your search or filters" : "Get started by adding your first employee"}
          action={
            !search
              ? { label: "Add Employee", onClick: () => router.push("/dashboard/people/new") }
              : undefined
          }
        />
      ) : view === "table" ? (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <Link
                      href={`/dashboard/people/${emp.id}`}
                      className="flex items-center gap-2.5"
                    >
                      <Avatar name={emp.name} src={emp.avatar} size="sm" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{emp.name}</p>
                        <RoleBadge role={emp.role} />
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>{emp.title || "—"}</TableCell>
                  <TableCell>
                    {emp.department ? (
                      <Badge variant="department">{emp.department.name}</Badge>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={emp.status} />
                  </TableCell>
                  <TableCell className="text-slate-500">{emp.email}</TableCell>
                  <TableCell>
                    <DropdownMenu
                      trigger={
                        <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      }
                    >
                      <DropdownItem
                        icon={<Eye className="h-3.5 w-3.5" />}
                        onClick={() => router.push(`/dashboard/people/${emp.id}`)}
                      >
                        View Profile
                      </DropdownItem>
                      <DropdownItem icon={<Pencil className="h-3.5 w-3.5" />}>
                        Edit
                      </DropdownItem>
                      <DropdownItem icon={<Mail className="h-3.5 w-3.5" />}>
                        Send Email
                      </DropdownItem>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          )}
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginated.map((emp) => (
              <Link key={emp.id} href={`/dashboard/people/${emp.id}`}>
                <Card className="p-4 transition-shadow hover:shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <Avatar name={emp.name} src={emp.avatar} size="lg" />
                    <p className="mt-3 font-medium text-slate-900 dark:text-slate-100">{emp.name}</p>
                    <p className="text-xs text-slate-500">{emp.title || "No title"}</p>
                    {emp.department && (
                      <Badge variant="department" className="mt-2">{emp.department.name}</Badge>
                    )}
                    <StatusBadge status={emp.status} />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={filtered.length}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}

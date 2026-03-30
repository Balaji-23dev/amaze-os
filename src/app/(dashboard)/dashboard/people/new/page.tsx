"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, type SelectOption } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  title: string;
  role: string;
  startDate: string;
  managerId: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  departmentId?: string;
  title?: string;
}

interface DepartmentOption {
  id: string;
  name: string;
}

interface ManagerOption {
  id: string;
  name: string;
}

const roleOptions: SelectOption[] = [
  { value: "EMPLOYEE", label: "Employee" },
  { value: "MANAGER", label: "Manager" },
  { value: "ADMIN", label: "Admin" },
];

export default function NewEmployeePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<SelectOption[]>([]);
  const [managers, setManagers] = useState<SelectOption[]>([]);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    departmentId: "",
    title: "",
    role: "EMPLOYEE",
    startDate: new Date().toISOString().split("T")[0],
    managerId: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    async function loadOptions() {
      try {
        const [deptRes, empRes] = await Promise.all([
          fetch("/api/departments"),
          fetch("/api/employees"),
        ]);
        const deptData = await deptRes.json();
        const empData = await empRes.json();

        setDepartments(
          (deptData.departments || []).map((d: DepartmentOption) => ({
            value: d.id,
            label: d.name,
          }))
        );
        setManagers(
          (empData.employees || [])
            .filter((e: { role: string }) => e.role === "MANAGER" || e.role === "ADMIN")
            .map((e: ManagerOption) => ({
              value: e.id,
              label: e.name,
            }))
        );
      } catch {
        // Silently fail, dropdowns will be empty
      }
    }
    loadOptions();
  }, []);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email address";
    if (!form.title.trim()) newErrors.title = "Title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone || null,
          departmentId: form.departmentId || null,
          title: form.title,
          role: form.role,
          startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
          managerId: form.managerId || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast(data.error || "Failed to create employee", "error");
        return;
      }

      toast("Employee created successfully", "success");
      router.push("/dashboard/people");
    } catch {
      toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/dashboard/people"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to People
      </Link>

      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Add Employee</h1>
        <p className="text-sm text-slate-500">Create a new employee record</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="First Name"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                error={errors.firstName}
                placeholder="John"
                required
              />
              <Input
                label="Last Name"
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                error={errors.lastName}
                placeholder="Doe"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                error={errors.email}
                placeholder="john@amazetech.net"
                required
              />
              <Input
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
          </CardBody>
        </Card>

        {/* Employment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Department"
                options={departments}
                value={form.departmentId}
                onChange={(v) => updateField("departmentId", v)}
                placeholder="Select department"
                searchable
              />
              <Input
                label="Title"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                error={errors.title}
                placeholder="Software Engineer"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Role"
                options={roleOptions}
                value={form.role}
                onChange={(v) => updateField("role", v)}
              />
              <Input
                label="Start Date"
                type="date"
                value={form.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
              />
            </div>
            <Select
              label="Manager"
              options={managers}
              value={form.managerId}
              onChange={(v) => updateField("managerId", v)}
              placeholder="Select manager (optional)"
              searchable
            />
          </CardBody>
        </Card>

        {/* Avatar placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-200 py-8 dark:border-slate-700">
              <p className="text-sm text-slate-400">Avatar upload coming soon</p>
            </div>
          </CardBody>
        </Card>

        {/* Actions */}
        <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 py-4 dark:border-slate-800 dark:bg-slate-950">
          <Link href="/dashboard/people">
            <Button variant="secondary" type="button">Cancel</Button>
          </Link>
          <Button type="submit" loading={loading}>
            Create Employee
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

interface Department {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  name: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  departmentId?: string;
  role?: string;
  title?: string;
  startDate?: string;
}

export default function AddEmployeePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [managers, setManagers] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    departmentId: "",
    role: "EMPLOYEE",
    title: "",
    startDate: "",
    managerId: "",
    password: "welcome123",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [deptRes, empRes] = await Promise.all([
          fetch("/api/departments"),
          fetch("/api/employees?role=MANAGER&role=ADMIN"),
        ]);
        const deptData = await deptRes.json();
        const empData = await empRes.json();
        setDepartments(deptData.departments || []);
        setManagers(empData.employees || []);
      } catch {
        console.error("Failed to fetch data");
      }
    }
    fetchData();
  }, []);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";
    if (form.phone && !/^[\d\s\-+()]*$/.test(form.phone))
      newErrors.phone = "Invalid phone number";
    if (!form.departmentId) newErrors.departmentId = "Department is required";
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
          ...form,
          startDate: form.startDate || null,
          managerId: form.managerId || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast(data.error || "Failed to create employee", "error");
        return;
      }

      toast("Employee created successfully!", "success");
      router.push("/dashboard/people");
    } catch {
      toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/dashboard/people"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to People
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Add Employee
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Fill in the details to onboard a new team member.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input
                  id="name"
                  label="Full Name *"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  error={errors.name}
                />
              </div>
              <Input
                id="email"
                type="email"
                label="Email Address *"
                placeholder="john@amazetech.net"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                error={errors.email}
              />
              <Input
                id="phone"
                type="tel"
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                error={errors.phone}
              />
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Work Information */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
              Work Information
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Department *
                </label>
                <select
                  value={form.departmentId}
                  onChange={(e) => updateField("departmentId", e.target.value)}
                  className={`block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm shadow-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:bg-slate-800 dark:text-white ${
                    errors.departmentId
                      ? "border-red-300 dark:border-red-700"
                      : "border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
                {errors.departmentId && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.departmentId}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => updateField("role", e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm shadow-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="EMPLOYEE">Employee</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <Input
                id="title"
                label="Job Title"
                placeholder="Software Engineer"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
              />

              <Input
                id="startDate"
                type="date"
                label="Start Date"
                value={form.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
              />

              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Manager
                </label>
                <select
                  value={form.managerId}
                  onChange={(e) => updateField("managerId", e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm shadow-sm transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">No manager</option>
                  {managers.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Account */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
              Account
            </h3>
            <Input
              id="password"
              label="Initial Password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              hint="The employee can change this after first login."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Link href="/dashboard/people">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </Link>
            <Button type="submit" isLoading={loading}>
              <UserPlus className="h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

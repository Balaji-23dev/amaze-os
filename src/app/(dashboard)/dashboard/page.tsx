"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, UserCheck, Building2, FileText, UserPlus, ArrowRight, Cake, Award } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getGreeting } from "@/lib/utils";
import { getAllEmployees, getAllDepartments } from "@/lib/mock-data";

export default function DashboardPage() {
  const [stats, setStats] = useState<{ totalEmployees: number; activeToday: number; departments: number; openRequests: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const employees = getAllEmployees();
    const depts = getAllDepartments();
    setStats({ totalEmployees: employees.length, activeToday: employees.filter(e => e.status === "ACTIVE").length, departments: depts.length, openRequests: 3 });
    setLoading(false);
  }, []);

  const recentActivity = [
    { id: "1", message: "joined TMS Operations", time: "2 hours ago", userName: "Rahul Kumar" },
    { id: "2", message: "updated department info", time: "4 hours ago", userName: "Priya Sharma" },
    { id: "3", message: "marked attendance", time: "5 hours ago", userName: "Arjun Patel" },
    { id: "4", message: "joined Medical Billing & RCM", time: "1 day ago", userName: "Sneha Reddy" },
    { id: "5", message: "completed onboarding", time: "2 days ago", userName: "Vikram Singh" },
  ];

  const upcomingBirthdays = [
    { name: "Priya Sharma", date: "Apr 2", department: "HR" },
    { name: "Arjun Patel", date: "Apr 5", department: "TMS" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{getGreeting()}, Basha</h1>
        <p className="text-sm text-slate-500">Here&apos;s what&apos;s happening at Amaze Tech today</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-lg" />) : stats ? (
          <>
            <StatCard label="Total Employees" value={stats.totalEmployees} trend={{ value: 12, positive: true }} icon={<Users className="h-5 w-5" />} />
            <StatCard label="Active Today" value={stats.activeToday} trend={{ value: 5, positive: true }} icon={<UserCheck className="h-5 w-5" />} />
            <StatCard label="Departments" value={stats.departments} icon={<Building2 className="h-5 w-5" />} />
            <StatCard label="Open Requests" value={stats.openRequests} icon={<FileText className="h-5 w-5" />} />
          </>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/dashboard/people/new"><Button size="sm" variant="secondary"><UserPlus className="h-3.5 w-3.5" />Add Employee</Button></Link>
        <Link href="/dashboard/people"><Button size="sm" variant="secondary"><Users className="h-3.5 w-3.5" />View Directory</Button></Link>
        <Link href="/dashboard/departments"><Button size="sm" variant="secondary"><Building2 className="h-3.5 w-3.5" />Manage Departments</Button></Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Recent Activity</CardTitle><Button variant="ghost" size="sm">View all <ArrowRight className="h-3.5 w-3.5" /></Button></CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex items-center gap-3 px-5 py-3">
                  <Avatar name={a.userName} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300"><span className="font-medium text-slate-900 dark:text-slate-100">{a.userName}</span> {a.message}</p>
                    <p className="text-xs text-slate-400">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle><span className="inline-flex items-center gap-1.5"><Cake className="h-4 w-4 text-pink-500" />Birthdays This Week</span></CardTitle></CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {upcomingBirthdays.map((b, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-2.5">
                    <div className="flex items-center gap-2.5"><Avatar name={b.name} size="sm" /><div><p className="text-sm font-medium text-slate-900 dark:text-slate-100">{b.name}</p><p className="text-xs text-slate-500">{b.department}</p></div></div>
                    <Badge>{b.date}</Badge>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader><CardTitle><span className="inline-flex items-center gap-1.5"><Award className="h-4 w-4 text-amber-500" />Work Anniversaries</span></CardTitle></CardHeader>
            <CardBody><p className="text-center text-sm text-slate-400 py-4">No anniversaries this week</p></CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

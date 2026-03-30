"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const settingsTabs = [
  { id: "profile", label: "Profile" },
  { id: "appearance", label: "Appearance" },
  { id: "company", label: "Company" },
];

const themeOptions = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

const accentColors = [
  { name: "Teal", value: "#0D9488" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Rose", value: "#F43F5E" },
  { name: "Amber", value: "#F59E0B" },
  { name: "Green", value: "#22C55E" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("system");
  const [accent, setAccent] = useState("#0D9488");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
        <p className="text-sm text-slate-500">Manage your account and preferences</p>
      </div>

      <Tabs tabs={settingsTabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "profile" && (
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar name="Basha" size="xl" />
              <div>
                <Button variant="secondary" size="sm">Change Avatar</Button>
                <p className="mt-1 text-xs text-slate-500">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Name" defaultValue="Basha" />
              <Input label="Email" type="email" defaultValue="basha@amazetech.net" />
            </div>
            <Input label="Phone" type="tel" defaultValue="+91 98765 43210" />
            <div className="flex justify-end">
              <Button size="sm">Save Changes</Button>
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === "appearance" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex gap-3">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTheme(opt.id)}
                    className={cn(
                      "flex-1 rounded-lg border-2 p-4 text-center text-sm font-medium transition-colors",
                      theme === opt.id
                        ? "border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accent Color</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-3">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setAccent(color.value)}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full transition-transform",
                      accent === color.value && "ring-2 ring-offset-2 ring-slate-900 scale-110 dark:ring-slate-100"
                    )}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                    title={color.name}
                  />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === "company" && (
        <Card>
          <CardHeader>
            <CardTitle>Company Settings</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input label="Company Name" defaultValue="Amaze Tech Solutions Pvt Ltd" />
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Company Logo
              </label>
              <div className="mt-1.5 flex items-center justify-center rounded-lg border-2 border-dashed border-slate-200 py-8 dark:border-slate-700">
                <p className="text-sm text-slate-400">Logo upload coming soon</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm">Save Changes</Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

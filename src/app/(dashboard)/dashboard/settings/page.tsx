"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useToast } from "@/components/ui/toast";
import { Save, Palette, Shield } from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      toast("Settings saved successfully!", "success");
      setSaving(false);
    }, 800);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-navy-50 p-2 dark:bg-navy-900/30">
            <Shield className="h-5 w-5 text-navy-600 dark:text-navy-300" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Profile</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Update your personal information</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            id="name"
            label="Full Name"
            placeholder="Your name"
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
          />
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="you@company.com"
            value={profile.email}
            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
          />
          <Input
            id="phone"
            type="tel"
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            value={profile.phone}
            onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
          />

          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} isLoading={saving}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card>
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-900/30">
            <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Appearance</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Customize the look and feel</p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Toggle between light and dark themes</p>
          </div>
          <ThemeToggle />
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-900/50">
        <h2 className="text-base font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Irreversible actions. Be careful.
        </p>
        <div className="mt-4">
          <Button variant="danger" size="sm">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-navy-600 via-navy-700 to-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDE4YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-60" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <Zap className="h-7 w-7 text-teal-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AmazOS</h1>
              <p className="text-sm text-teal-300/80">People Platform</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Manage your team<br />
            with confidence.
          </h2>
          <p className="text-lg text-slate-300 max-w-md">
            A modern people management platform built for growing teams. Track employees, departments, and more — all in one place.
          </p>
          <div className="mt-12 flex gap-8">
            {[
              { label: "Employees", value: "500+" },
              { label: "Departments", value: "25+" },
              { label: "Uptime", value: "99.9%" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 bg-white dark:bg-slate-950">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-navy-600 to-teal-500">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              AmazOS
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <Input
              id="email"
              type="email"
              label="Email address"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
            />

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={loading}
            >
              Sign in
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
            Powered by{" "}
            <span className="font-medium text-teal-600 dark:text-teal-400">
              Amaze Tech
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

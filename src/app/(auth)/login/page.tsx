"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateLogin } from "@/lib/mock-data";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = validateLogin(email, password);
      if (!user) { setError("Invalid credentials"); return; }
      sessionStorage.setItem("amazos-user", JSON.stringify(user));
      router.push("/dashboard");
    } catch { setError("Something went wrong."); } finally { setLoading(false); }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50 dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)]" />
      <div className="relative z-10 w-full max-w-sm px-4">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-lg font-bold text-white">A</div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Welcome to AmazOS</h1>
            <p className="mt-1 text-sm text-slate-500">Amaze Tech Solutions Pvt Ltd</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" placeholder="you@amazetech.net" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" autoFocus />
            <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
            <Button type="submit" className="w-full" loading={loading}>Sign in</Button>
          </form>
          <div className="mt-4 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-400 dark:bg-slate-800">
            <p className="font-medium text-slate-500">Demo credentials:</p>
            <p>basha@amazetech.net / admin123</p>
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">Internal platform — authorized access only</p>
        </div>
      </div>
    </div>
  );
}

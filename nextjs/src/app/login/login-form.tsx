"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "@/components/ui/Alert";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      setLoading(false);
      setError(data?.error || "Login failed. Please try again.");
      return;
    }

    const next = searchParams.get("next") || "/donation";
    router.push(next);
  }

  return (
    <form action={onSubmit} className="space-y-4">
      {error ? <Alert kind="error">{error}</Alert> : null}

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Email address</span>
        <input
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[color:var(--sec)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--sec)_30%,transparent)]"
        />
      </label>

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</span>
        <input
          name="password"
          type="password"
          required
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[color:var(--sec)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--sec)_30%,transparent)]"
        />
      </label>

      <div className="flex items-center justify-end">
        <a href="/forgot-password" className="text-sm font-extrabold text-(--sec) hover:underline">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-2xl bg-[color:var(--sec)] px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}


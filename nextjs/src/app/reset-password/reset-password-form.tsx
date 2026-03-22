"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/Alert";

type Props = {
  token: string;
};

/**
 * Client-side password reset form.
 */
export function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const missingToken = useMemo(() => !token, [token]);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!token) {
      setLoading(false);
      setError("Reset token is missing. Please use the link from your email.");
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/auth/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password, confirmPassword }),
    });

    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      setLoading(false);
      setError(data?.error || "Password reset failed. Please try again.");
      return;
    }

    setLoading(false);
    setSuccess(true);

    // Give the user a moment to read the success state.
    setTimeout(() => router.push("/login"), 900);
  }

  return (
    <form action={onSubmit} className="space-y-4">
      {missingToken ? (
        <Alert kind="info">Reset token is missing. Please open the reset link you received.</Alert>
      ) : null}
      {error ? <Alert kind="error">{error}</Alert> : null}
      {success ? <Alert kind="success">Password updated. Redirecting to sign in…</Alert> : null}

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">New password</span>
        <input
          name="password"
          type="password"
          minLength={8}
          maxLength={64}
          required
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[color:var(--sec)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--sec)_30%,transparent)]"
        />
      </label>

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Confirm password</span>
        <input
          name="confirmPassword"
          type="password"
          minLength={8}
          maxLength={64}
          required
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[color:var(--sec)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--sec)_30%,transparent)]"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-2xl bg-[color:var(--sec)] px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}


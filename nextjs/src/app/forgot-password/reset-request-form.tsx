"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";

/**
 * Password reset request form.
 *
 * In production, this should send an email. For now (dev) the API returns `resetUrl`.
 */
export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setResetUrl(null);

    const email = String(formData.get("email") ?? "").trim();
    const res = await fetch("/api/auth/password/request-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string; resetUrl?: string }
      | null;

    if (!res.ok || !data?.ok) {
      setLoading(false);
      setError(data?.error || "Could not generate reset link. Please try again.");
      return;
    }

    setLoading(false);
    setResetUrl(data.resetUrl || null);
  }

  return (
    <form action={onSubmit} className="space-y-4">
      {error ? <Alert kind="error">{error}</Alert> : null}
      {resetUrl ? (
        <Alert kind="info">
          <span className="font-extrabold">Dev link:</span>{" "}
          <a className="font-extrabold underline" href={resetUrl}>
            Reset password
          </a>
        </Alert>
      ) : null}

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Email address</span>
        <input
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[color:var(--sec)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--sec)_30%,transparent)]"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-2xl bg-[color:var(--sec)] px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}


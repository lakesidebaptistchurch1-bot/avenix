"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/Alert";

/**
 * Contact form UI.
 *
 * Posts to `/api/contact` (Node backend) and displays a success/error state.
 */
export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, phone, message }),
    });

    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      setLoading(false);
      setError(data?.error || "We could not send your message right now. Please try again.");
      return;
    }

    setLoading(false);
    setSuccess(true);
  }

  return (
    <form action={onSubmit} className="space-y-4">
      {error ? <Alert kind="error">{error}</Alert> : null}
      {success ? <Alert kind="success">Thanks! We received your message and will respond soon.</Alert> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">First name</span>
          <input
            name="firstName"
            type="text"
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--sec) focus:bg-white focus:ring-4 focus:ring-[color-mix(in_oklab,var(--sec)_16%,transparent)]"
          />
        </label>

        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Last name</span>
          <input
            name="lastName"
            type="text"
            required
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--sec) focus:bg-white focus:ring-4 focus:ring-[color-mix(in_oklab,var(--sec)_16%,transparent)]"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Email address</span>
        <input
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--sec) focus:bg-white focus:ring-4 focus:ring-[color-mix(in_oklab,var(--sec)_16%,transparent)]"
        />
      </label>

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone (optional)</span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--sec) focus:bg-white focus:ring-4 focus:ring-[color-mix(in_oklab,var(--sec)_16%,transparent)]"
        />
      </label>

      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={6}
          className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--sec) focus:bg-white focus:ring-4 focus:ring-[color-mix(in_oklab,var(--sec)_16%,transparent)]"
        />
        <p className="mt-2 text-xs text-slate-400">Please include enough details so we can respond effectively.</p>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-2xl bg-[linear-gradient(135deg,var(--sec),#7b5a43)] px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}


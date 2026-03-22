"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/Alert";

/**
 * Client-side donation form.
 *
 * Why client-side:
 * - We need instant amount selection (preset buttons + custom amount).
 * - We want a smooth redirect into the payment flow.
 */
const PRESETS = [100, 200, 300, 400, 500, 600] as const;

type Props = {
  prefill: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export function DonationForm({ prefill }: Props) {
  const router = useRouter();
  const [selectedPreset, setSelectedPreset] = useState<number>(PRESETS[0]);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolvedAmount = useMemo(() => {
    const raw = customAmount.trim();
    if (!raw) return selectedPreset;

    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : NaN;
  }, [customAmount, selectedPreset]);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();

    if (!firstName || !lastName || !email) {
      setLoading(false);
      setError("First name, last name, and email are required.");
      return;
    }

    if (!Number.isFinite(resolvedAmount) || resolvedAmount <= 0) {
      setLoading(false);
      setError("Please select or enter a valid donation amount.");
      return;
    }

    const res = await fetch("/api/donations/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: resolvedAmount,
        firstName,
        lastName,
        email,
        note: note || undefined,
      }),
    });

    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string; requiresLogin?: boolean }
      | null;

    if (!res.ok || !data?.ok) {
      setLoading(false);
      setError(data?.error || "We could not start your donation. Please try again.");
      return;
    }

    const next = "/payment";
    router.push(data.requiresLogin ? `/login?next=${encodeURIComponent(next)}` : next);
  }

  return (
    <form action={onSubmit} className="">
      {error ? <Alert kind="error">{error}</Alert> : null}

      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Select amount (GH₵)</div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {PRESETS.map((amt) => {
            const active = !customAmount.trim() && selectedPreset === amt;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setSelectedPreset(amt);
                  setCustomAmount("");
                }}
                className={[
                  "rounded-2xl border px-3 py-3 text-sm font-extrabold transition",
                  active
                    ? "border-(--sec) bg-(--sec) text-white shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-(--sec) hover:bg-white",
                ].join(" ")}
              >
                GH₵ {amt}
              </button>
            );
          })}
        </div>

        <label className=" block">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Other amount</span>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-(--sec) focus-within:bg-white focus-within:ring-4 focus-within:ring-[color-mix(in_oklab,var(--sec)_16%,transparent)]">
            <span className="text-sm font-extrabold text-slate-500">GH₵</span>
            <input
              inputMode="decimal"
              type="number"
              min={1}
              step="0.01"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-transparent text-sm text-slate-900 outline-none"
              aria-label="Custom donation amount"
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            You’ll be charged{" "}
            <span className="font-bold text-slate-600">
              {Number.isFinite(resolvedAmount) ? `GH₵ ${resolvedAmount.toFixed(2)}` : "—"}
            </span>
            .
          </p>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-7 items-center md:grid-cols-2">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">First name</span>
          <input
            name="firstName"
            type="text"
            required
            defaultValue={prefill.firstName}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--sec) focus:bg-white focus:ring-4 focus:ring-[color-mix(in_oklab,var(--sec)_16%,transparent)]"
          />
        </label>

        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Last name</span>
          <input
            name="lastName"
            // type="text"
            required
            defaultValue={prefill.lastName}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--sec) focus:bg-white focus:ring-4 focus:ring-[color-mix(in_oklab,var(--sec)_16%,transparent)]"
          />
        </label>
      </div>

      <label className="block mt-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Email address</span>
        <input
          name="email"
          type="email"
          required
          defaultValue={prefill.email}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--sec) focus:bg-white focus:ring-4 focus:ring-[color-mix(in_oklab,var(--sec)_16%,transparent)]"
        />
      </label>

      <label className="block mt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Note (optional)</span>
        <textarea
          name="note"
          rows={4}
          placeholder="Add a note or dedication"
          className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--sec) focus:bg-white focus:ring-4 focus:ring-[color-mix(in_oklab,var(--sec)_16%,transparent)]"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-[linear-gradient(135deg,var(--sec),#7b5a43)] px-4 py-3 mt-3 text-sm font-extrabold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Starting checkout..." : "Continue to payment"}
      </button>

      <p className="text-center text-xs text-slate-400">
        Secure, encrypted checkout. Your amount is locked on the server for safety.
      </p>
    </form>
  );
}


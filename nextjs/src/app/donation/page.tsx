import { BodyClass } from "@/components/BodyClass";
import { getSessionUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { DonationForm } from "./donation-form";

/**
 * Donation start page.
 *
 * Legacy equivalent: `lbc_project/donation.php`
 */
export default async function DonationPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect(`/signup?next=${encodeURIComponent("/donation")}`);
  }
  const fullName = user?.name ?? "";
  const parts = fullName.split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");

  return (
    <>
      <BodyClass className="donation-page-ui" />

      <main id="donate-section" className="flex min-h-dvh items-center justify-center overflow-hidden bg-[#f7f7f8] px-4 py-10 sm:px-6 lg:px-8">
        <section className="w-full max-w-2xl">
          <div className="mx-auto w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:p-8">
            <header className="text-center md:text-left">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 sm:text-3xl">Make a donation</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">Fill in your details and continue to payment.</p>
            </header>

            <div className="mt-6">
              <DonationForm
                prefill={{
                  firstName,
                  lastName,
                  email: user?.email ?? "",
                }}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}


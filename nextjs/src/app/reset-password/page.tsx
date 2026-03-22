import Link from "next/link";
import { BodyClass } from "@/components/BodyClass";
import { ResetPasswordForm } from "./reset-password-form";

/**
 * Reset password page.
 *
 * Legacy equivalent: `lbc_project/reset-password.php`
 */
export default async function ResetPasswordPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await props.searchParams) ?? {};
  const token = typeof sp.token === "string" ? sp.token : "";

  return (
    <>
      <BodyClass className="auth-page-ui" />

      <main className="flex min-h-dvh items-center justify-center overflow-hidden bg-[#f8f5f0] px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-[0_28px_70px_rgba(15,23,42,0.10)] sm:p-8 md:p-10">
          <header className="text-center md:text-left">
            <h1 className="text-2xl font-extrabold tracking-tight text-(--pri) sm:text-3xl">
              Create a new password
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Enter a secure password to continue.
            </p>
          </header>

          <div className="mt-6">
            <ResetPasswordForm token={token} />
          </div>

          <p className="mt-6 text-sm text-slate-600 sm:text-base">
            Back to{" "}
            <Link href="/login" className="font-extrabold text-(--sec) hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}


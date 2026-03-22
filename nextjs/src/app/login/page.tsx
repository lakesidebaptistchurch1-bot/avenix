import Link from "next/link";
import { BodyClass } from "@/components/BodyClass";
import { LoginForm } from "./login-form";

export default async function LoginPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await props.searchParams) ?? {};
  const next = typeof sp.next === "string" ? sp.next : undefined;
  const signupHref = next ? `/signup?next=${encodeURIComponent(next)}` : "/signup";

  return (
    <>
      <BodyClass className="auth-page-ui" />

      <main className="flex min-h-dvh items-center justify-center overflow-hidden bg-[#f8f5f0] px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-[0_28px_70px_rgba(15,23,42,0.10)] sm:p-8 md:p-10">
          <header className="text-center md:text-left">
            <h1 className="text-2xl font-extrabold tracking-tight text-(--pri) sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
              Sign in to continue securely.
            </p>
          </header>

          <div className="mt-6">
            <LoginForm />
          </div>

          <p className="mt-10 text-sm text-slate-600 sm:text-base">
            New here?{" "}
            <Link href={signupHref} className="font-extrabold text-(--sec) hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}


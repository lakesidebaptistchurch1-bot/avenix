"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const mainNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
];

const pagesDropdownItems = [
  { href: "/blog", label: "Blog" },
  { href: "/sermons", label: "Sermons" },
  { href: "/sermons-single", label: "Sermon Details" },
  { href: "/event", label: "Event" },
  { href: "/donation", label: "Donation" },
  { href: "/ministries", label: "Ministries" },
  { href: "/pastor", label: "Pastor" },
  { href: "/gallery", label: "Gallery" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [initials, setInitials] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let ignore = false;
    async function loadMe() {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const name: string | undefined = data?.user?.name;
        if (!name) return;
        const parts = name.split(/\s+/).filter(Boolean);
        const first = parts[0] || "";
        const last = parts.slice(1).join(" ") || "";
        const inits = (first[0] || "").toUpperCase() + (last[0] || (first[1] || "").toUpperCase());
        if (!ignore) setInitials(inits || null);
      } catch {}
    }
    loadMe();
    return () => { ignore = true; };
  }, []);

  const headerClasses = scrolled
    ? "fixed inset-x-0 top-0 z-50 md:border-b md:border-slate-900 bg-slate-900/90 backdrop-blur"
    : "fixed inset-x-0 top-0 z-50 md:border-b md:border-transparent bg-transparent";

  const desktopLinkBase = "text-sm font-medium transition-colors";

  const getDesktopLinkClasses = (href: string) => {
    const isActive = pathname === href;
    if (scrolled) {
      return `${desktopLinkBase} ${
        isActive ? "text-amber-600" : "text-slate-100 hover:text-amber-600"
      }`;
    }
    return `${desktopLinkBase} ${
      isActive ? "text-amber-300" : "text-white/80 hover:text-white"
    }`;
  };

  return (
    <header className={headerClasses}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/church_logo_blue-removebg-preview (1).png"
            alt="Lakeside Baptist Church"
            className="h-10 w-auto"
          />
          <span
            className={`text-base font-semibold tracking-wide ${
              scrolled ? "text-white" : "text-white"
            }`}
          >
            Lakeside Baptist Church
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getDesktopLinkClasses(item.href)}
              >
                {item.label}
              </Link>
            ))}

            <div className="relative">
              <button
                type="button"
                className={`${desktopLinkBase} inline-flex items-center gap-1 ${
                  scrolled ? "text-slate-100 hover:text-amber-600" : "text-white/80 hover:text-white"
                }`}
                onClick={() => setPagesOpen((open) => !open)}
              >
                Pages
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div
                className={`absolute right-0 mt-3 w-56 rounded-lg bg-white py-2 text-sm shadow-lg ring-1 ring-black/5 transition-all duration-150 ${
                  pagesOpen
                    ? "visible opacity-100 translate-y-0"
                    : "invisible opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                {pagesDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 text-left text-slate-700 hover:bg-slate-50 hover:text-amber-600 ${
                      pathname === item.href ? "bg-amber-50 text-amber-700" : ""
                    }`}
                    onClick={() => setPagesOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className={getDesktopLinkClasses("/contact")}
            >
              Contact Us
            </Link>
          </div>

          <div className="ml-6 flex items-center gap-3">
            {initials ? (
              <div title="Account" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-xs font-bold uppercase text-white shadow-sm">
                {initials}
              </div>
            ) : (
              <Link
                href="/signup"
                className="rounded-full border border-amber-500 px-4 py-1.5 text-sm font-semibold text-amber-600 transition hover:bg-amber-50"
              >
                Sign up
              </Link>
            )}
            <Link
              href="/donation#donate-section"
              className="rounded-full bg-amber-500 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
            >
              Donate now
            </Link>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <nav className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pb-4 pt-2">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-amber-50 text-amber-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-amber-600"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-2 rounded-md bg-slate-50 px-3 py-2">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Pages
              </p>
              {pagesDropdownItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-md px-2 py-1 text-sm transition ${
                      isActive
                        ? "bg-amber-50 text-amber-700"
                        : "text-slate-700 hover:bg-slate-100 hover:text-amber-600"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/contact"
              className={`mt-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                pathname === "/contact"
                  ? "bg-amber-50 text-amber-700"
                  : "text-slate-700 hover:bg-slate-50 hover:text-amber-600"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>

            <div className="mt-3 flex flex-col gap-2">
              {initials ? (
                <div title="Account" className="flex items-center justify-center rounded-full bg-amber-600 px-4 py-2 text-center text-sm font-bold uppercase text-white shadow-sm">
                  {initials}
                </div>
              ) : (
                <Link
                  href="/signup"
                  className="rounded-full border border-amber-500 px-4 py-2 text-center text-sm font-semibold text-amber-600 transition hover:bg-amber-50"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign up
                </Link>
              )}
              <Link
                href="/donation#donate-section"
                className="rounded-full bg-amber-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
                onClick={() => setMobileOpen(false)}
              >
                Donate now
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

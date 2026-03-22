import Link from "next/link";
import { ContactForm } from "./contact-form";

/**
 * Contact page (marketing/content).
 *
 * Legacy content source: `lbc_project/contact.html`
 */
export default function ContactPage() {
  return (
    <div className="min-h-dvh">
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">
                  Contact Us
                </h1>
                <nav className="wow fadeInUp" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_28px_70px_rgba(15,23,42,0.10)] md:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-(--pri)">Contact information</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              If you’re new, planning a visit, or need prayer/support, we’d love to hear from you.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Give us a call</div>
                <div className="mt-2 text-lg font-extrabold text-(--pri)">(+01) 789 859 654</div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Send a message</div>
                <div className="mt-2 text-lg font-extrabold text-(--pri)">edjayden2@gmail.com</div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Visit our location</div>
                <div className="mt-2 text-lg font-extrabold text-(--pri)">Lakeside Estate, Com. 6</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="rounded-2xl bg-black/5 px-5 py-3 text-sm font-extrabold text-(--pri) hover:bg-black/10"
              >
                View services
              </Link>
              <Link
                href="/donation"
                className="rounded-2xl bg-(--sec) px-5 py-3 text-sm font-extrabold text-white hover:brightness-110"
              >
                Donate now
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_28px_70px_rgba(15,23,42,0.10)] md:p-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-(--pri)">Send us a message</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Fill out the form and we’ll respond as soon as we can.
            </p>

            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


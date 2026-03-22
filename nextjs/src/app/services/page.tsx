import Link from "next/link";
import { PageHero } from "@/components/PageHero";

/**
 * Services page (marketing/content).
 *
 * Legacy content source: `lbc_project/service.html`
 */
export default function ServicesPage() {
  return (
    <div className="min-h-dvh">
      <PageHero
        eyebrow="Services"
        title="Worship, care, and community all week long"
        subtitle="Step into uplifting worship, meaningful teaching, and a welcoming community. Every service is designed to help you grow, connect, and experience God in a fresh, life-giving way."
        imageSrc="/images/page-header-bg.jpg"
      />

      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { title: "3 Worship gatherings", desc: "Sunday 7:00am, 9:00am, 11:00am" },
            { title: "Midweek prayer", desc: "Wednesdays 7:00pm on campus" },
            { title: "Live online", desc: "Join our livestream every Sunday" },
          ].map((m) => (
            <div
              key={m.title}
              className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_28px_70px_rgba(15,23,42,0.08)]"
            >
              <div className="text-sm font-extrabold uppercase tracking-wider text-slate-500">{m.title}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{m.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 md:mt-14">
          <header className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-(--pri)">What to expect</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Whether it’s your first visit or your hundredth, we want you to feel at home. Here are a few things
              we’re intentional about every time we gather.
            </p>
          </header>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                title: "Welcome experience",
                body: "Friendly hosts, quick check‑in, and a clear guide so your first visit feels effortless.",
                meta: ["Guest lounge", "Parking help"],
              },
              {
                title: "Kids + teens arena",
                body: "Safe, fun, and faith-filled environments with dedicated leaders and age‑based programs.",
                meta: ["Nursery", "Youth zone"],
              },
              {
                title: "Powerful worship flow",
                body: "Music that lifts, teaching that equips, and prayer moments that refresh your soul.",
                meta: ["Live band", "Prayer team"],
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-black/10 bg-white p-7 shadow-[0_28px_70px_rgba(15,23,42,0.08)]"
              >
                <h3 className="text-xl font-extrabold tracking-tight text-(--pri)">{c.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{c.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.meta.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-extrabold text-slate-700"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-2xl bg-(--sec) px-5 py-3 text-sm font-extrabold text-white hover:brightness-110"
            >
              Plan your visit
            </Link>
            <Link
              href="/donation"
              className="rounded-2xl bg-black/5 px-5 py-3 text-sm font-extrabold text-(--pri) hover:bg-black/10"
            >
              Donate now
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}


import Image from "next/image";

/**
 * A reusable hero/header section for content pages (About/Services/Contact).
 *
 * This keeps page files small and makes it easy to keep typography and spacing consistent
 * across different routes and screen sizes.
 */
type Props = {
  title: string;
  subtitle?: string;
  /** Optional small label shown above the title. */
  eyebrow?: string;
  /** Background image placed behind the gradient overlay. */
  imageSrc?: string;
};

export function PageHero({ title, subtitle, eyebrow, imageSrc }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-black/10">
      {/* Background image (optional) */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
      ) : null}

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(44,62,80,0.92),rgba(44,62,80,0.62))]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_220px_at_85%_15%,rgba(201,166,107,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
        {eyebrow ? (
          <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white/85">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 md:text-base">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}


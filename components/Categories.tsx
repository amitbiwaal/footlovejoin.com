import { AFFILIATE_LINK_PROPS } from "./affiliate";

const CATEGORIES = [
  { name: "Soles", count: "4.2k", hot: true },
  { name: "Painted Toes", count: "3.1k" },
  { name: "High Heels", count: "2.7k", hot: true },
  { name: "Arches", count: "2.2k" },
  { name: "Barefoot", count: "1.9k" },
  { name: "Pedicure", count: "3.6k" },
  { name: "Sandals", count: "1.4k" },
  { name: "Ankles", count: "1.1k" },
  { name: "Custom Sets", count: "980" },
  { name: "Beach & Sand", count: "5.0k", hot: true },
  { name: "Toes", count: "1.3k" },
  { name: "Videos", count: "2.9k" },
];

export default function Categories() {
  return (
    <section id="categories" className="py-16 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Categories</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Explore popular{" "}
            <span className="text-gradient">feet pic categories</span> on Foot
            Love
          </h2>
          <p className="mt-4 text-ink-muted">
            Whatever your style, there&apos;s an audience for it. Pick a niche —
            or sell across all of them — on Foot Love.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <a
              key={c.name}
              {...AFFILIATE_LINK_PROPS}
              className="group flex items-center gap-2.5 rounded-2xl border border-white/10 bg-bg-card/60 px-5 py-3 transition-all hover:-translate-y-0.5 hover:border-coral/30 hover:bg-bg-card2/70"
            >
              <span className="font-semibold">{c.name}</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-ink-faint">
                {c.count}
              </span>
              {c.hot && (
                <span className="rounded-full bg-coral/15 px-2 py-0.5 text-xs font-bold text-coral">
                  Hot
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

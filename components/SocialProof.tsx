import { Star, Check } from "./Icons";

const STATS = [
  { value: "5,000+", label: "Verified buyers" },
  { value: "12,000+", label: "Active sellers" },
  { value: "$2.4M+", label: "Paid to sellers" },
  { value: "4.9/5", label: "Average rating" },
];

const REVIEWS = [
  {
    name: "Jasmine K.",
    handle: "@jazzsoles",
    text: "Easily the best place to sell feet pics online. I listed on a Sunday and had my first sale before the weekend was over.",
    rating: 5,
  },
  {
    name: "Chloe M.",
    handle: "@chloe.feet",
    text: "I tried a few feet selling apps first. Foot Love actually sends real, verified buyers — my payouts have tripled.",
    rating: 5,
  },
  {
    name: "Riya S.",
    handle: "@bellatoes",
    text: "Selling feet pics for free to start was the whole reason I signed up. No fees up front, and my face stays private.",
    rating: 5,
  },
  {
    name: "Dana P.",
    handle: "@sofisoles",
    text: "Custom sets and video clips are where I make the most. Buyers know what they want and they pay for it.",
    rating: 5,
  },
];

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <figure className="w-[300px] shrink-0 rounded-3xl border border-white/10 bg-bg-card/70 p-5">
      <div className="mb-3 flex items-center gap-1 text-rose-gold">
        {Array.from({ length: r.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4" />
        ))}
      </div>
      <blockquote className="text-sm leading-relaxed text-ink-muted">
        “{r.text}”
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span
          className="h-9 w-9 rounded-full"
          style={{ background: "linear-gradient(135deg,#FF6B5A,#241F30)" }}
        />
        <div>
          <p className="flex items-center gap-1 text-sm font-bold">
            {r.name}
            <span className="grid h-4 w-4 place-items-center rounded-full bg-coral text-[#2a0f0a]">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
          </p>
          <p className="text-xs text-ink-faint">{r.handle}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function SocialProof() {
  return (
    <section className="border-y border-white/10 bg-bg-soft/60 py-16 sm:py-20">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Sell feet pics to{" "}
            <span className="text-gradient">5,000+ verified buyers</span> on Foot Love
          </h2>
          <p className="mt-4 text-ink-muted">
            Foot Love connects feet sellers with real, payout-ready buyers.
            Here&apos;s why creators trust Foot Love to sell feet pictures online
            and get paid.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="flex items-center gap-1 text-rose-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </span>
            <span className="text-sm font-semibold">Rated Excellent</span>
            <span className="text-sm text-ink-faint">· 3,100+ reviews</span>
          </div>
        </div>

        {/* stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-white/10 bg-bg-card/60 p-4 text-center sm:p-6"
            >
              <p className="text-2xl font-extrabold tracking-tight text-gradient sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* testimonials marquee */}
      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-soft to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-soft to-transparent" />
        <div className="flex w-max animate-marquee gap-4 pl-4">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

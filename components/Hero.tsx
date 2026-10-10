import { Star, Check, ArrowRight, Play, Bolt, Shield, Wallet, Heart } from "./Icons";
import { AFFILIATE_LINK_PROPS } from "./affiliate";

const CHIPS = ["100% anonymous", "Verified buyers", "Instant payouts", "Keep more per sale"];

const NOTIFS = [
  {
    icon: Wallet,
    title: "New sale — soles set",
    meta: "just now · verified buyer",
    accent: "from-coral to-coral-soft",
  },
  {
    icon: Heart,
    title: "Custom request unlocked",
    meta: "painted toes · themed set",
    accent: "from-rose to-rose-gold",
  },
  {
    icon: Bolt,
    title: "Tip received",
    meta: "private · anonymous",
    accent: "from-coral-bright to-rose",
  },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div className="animate-fade-up">
            <span className="eyebrow mb-5">
              <Star className="h-3.5 w-3.5 text-rose-gold" />
              #1 Feet Selling App &amp; Site
            </span>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              #1 Feet Pics Selling{" "}
              <span className="text-gradient">App &amp; Website</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              Foot Love is the simplest, safest place to sell feet pics online.
              Sell feet pictures and videos to thousands of verified buyers, stay
              100% anonymous, keep control of your content, and get paid fast —
              all in one place.
            </p>

            {/* Feature chips */}
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {CHIPS.map((c) => (
                <li key={c} className="chip">
                  <Check className="h-3.5 w-3.5 text-coral" />
                  {c}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-3">
              <a {...AFFILIATE_LINK_PROPS} className="btn-primary">
                Start selling — it&apos;s free
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#gallery" className="btn-ghost">
                <Play className="h-4 w-4 text-coral" />
                How Foot Love works
              </a>
            </div>
          </div>

          {/* Right — earnings preview card */}
          <div className="relative animate-fade-up [animation-delay:120ms]">
            {/* glow */}
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand-radial blur-2xl" />

            <div className="card overflow-hidden p-5 shadow-card sm:p-6">
              {/* header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient">
                    <Wallet className="h-5 w-5 text-[#2a0f0a]" />
                  </span>
                  <div>
                    <p className="text-sm text-ink-faint">This week</p>
                    <p className="text-2xl font-extrabold tracking-tight">
                      $486.00
                    </p>
                  </div>
                </div>
                <span className="chip border-coral/30 bg-coral/10 text-coral">
                  <Bolt className="h-3.5 w-3.5" />
                  +24%
                </span>
              </div>

              {/* mini bars */}
              <div className="mt-6 flex h-24 items-end gap-2">
                {[38, 55, 42, 70, 60, 88, 100].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-coral/30 to-coral"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              {/* notifications */}
              <div className="mt-6 space-y-3">
                {NOTIFS.map((n) => (
                  <div
                    key={n.title}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-bg-card2/60 p-3"
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${n.accent} text-[#2a0f0a]`}
                    >
                      <n.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{n.title}</p>
                      <p className="truncate text-xs text-ink-faint">{n.meta}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* footer */}
              <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-xs font-medium text-ink-muted">
                <Shield className="h-4 w-4 text-coral" />
                Encrypted &amp; anonymous — your identity stays private
              </div>
            </div>

            {/* floating badge */}
            <div className="absolute -left-4 bottom-8 hidden animate-float rounded-2xl border border-white/10 bg-bg-card/90 px-4 py-3 shadow-card backdrop-blur-md sm:block">
              <p className="text-xs text-ink-faint">Payout sent</p>
              <p className="text-sm font-bold text-coral">$1,240 → your bank</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

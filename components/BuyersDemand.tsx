import { Check, Sparkle } from "./Icons";
import { AFFILIATE_LINK_PROPS } from "./affiliate";

const DEMAND = [
  { label: "Soles & arches close-ups", pct: 92 },
  { label: "Painted toenails & pedicure sets", pct: 80 },
  { label: "Custom personalized requests", pct: 74 },
  { label: "Video clips & short vids", pct: 66 },
  { label: "Themed sets: heels, socks, sand", pct: 58 },
];

export default function BuyersDemand() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left copy */}
          <div>
            <span className="eyebrow mb-4">
              <Sparkle className="h-3.5 w-3.5" />
              Buyer demand
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              What buyers{" "}
              <span className="text-gradient">pay for</span> when you sell feet
              pics on Foot Love
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              Buyers on Foot Love come with a clear idea of what they want — and
              they pay a premium for quality. From simple soles and painted toes
              to fully custom sets, there&apos;s demand for every style. Upload
              the feet pics you already have, price them your way, and start
              earning from feet pics that sell.
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {[
                "Set your own prices",
                "Approve every buyer",
                "No face required",
                "Sell photos, videos & customs",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-ink-muted">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-coral/15 text-coral">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a {...AFFILIATE_LINK_PROPS} className="btn-primary mt-8">
              Start earning today
            </a>
          </div>

          {/* Right — demand meters */}
          <div className="card p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">Most in-demand right now</h3>
              <span className="chip border-coral/30 bg-coral/10 text-coral">
                Live
              </span>
            </div>
            <div className="space-y-5">
              {DEMAND.map((d) => (
                <div key={d.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{d.label}</span>
                    <span className="font-bold text-rose-gold">{d.pct}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-brand-gradient"
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-ink-faint">
              Based on buyer activity across Foot Love in the last 30 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import CheckItem from "./CheckItem";
import { Sparkle } from "../Icons";

const SETUP = [
  "Open near the bottom of the range to bank early reviews, then climb as demand shows up.",
  "Price bundles at roughly two-thirds of the à-la-carte total to lift average order size.",
  "Bill customs at 2–3× and take payment before a single frame is shot.",
  "Add a subscription to convert one-off buyers into monthly income.",
  "Look after regulars with perks instead of blanket discounts.",
];

const MISTAKES = [
  'Racing to the bottom to "compete" — it just trains buyers to expect cheap.',
  "Never raising prices, even after the reviews and demand are clearly there.",
  "Giving away customs at standard rates instead of charging the premium they earn.",
  "Ignoring your effective hourly return and mistaking gross sales for profit.",
];

export default function GuidePricing() {
  return (
    <section id="pricing" className="py-16 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Charge What It&apos;s Worth</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How to Price Your Sets{" "}
            <span className="text-gradient">Without Underselling</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            Nearly every newcomer opens too cheap. The ranges above are a place
            to start testing — then move with your own signal: views, purchases,
            repeat orders, and the time each set eats.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-bg-card/60 p-6 sm:p-7">
            <h3 className="text-lg font-bold">How to set it up</h3>
            <ul className="mt-5 space-y-3.5">
              {SETUP.map((s) => (
                <CheckItem key={s}>{s}</CheckItem>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-bg-card/60 p-6 sm:p-7">
            <h3 className="text-lg font-bold">
              Pricing mistakes that cost you money
            </h3>
            <ul className="mt-5 space-y-3.5">
              {MISTAKES.map((m) => (
                <CheckItem key={m}>{m}</CheckItem>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 border-l-4 border-l-coral bg-bg-soft/60 p-5 text-sm leading-relaxed text-ink-muted">
          <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
          <p>
            These are testing ideas, not fixed market rates. Your own numbers
            are the real guide — track what buyers actually pay for and price
            toward a fair return on your time.
          </p>
        </div>
      </div>
    </section>
  );
}

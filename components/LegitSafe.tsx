import { Shield, Check } from "./Icons";

const POINTS = [
  {
    n: "1",
    title: "Transparent fees on every feet pic you sell",
    text: "No hidden charges or surprise deductions. See your rate up front and keep the majority on every single sale.",
  },
  {
    n: "2",
    title: "Advanced protection for your feet pics",
    text: "Watermarking, secure delivery, and active takedown support work together to protect your photos and videos.",
  },
  {
    n: "3",
    title: "Sell feet pics legally — 18+ verified",
    text: "Every creator confirms they're 18+ and ID-verified, so the whole community stays real, safe, and compliant.",
  },
  {
    n: "4",
    title: "Private payments & data on Foot Love",
    text: "Discreet billing and personal information stay encrypted and are never shown to buyers. It all stays private, always.",
  },
];

export default function LegitSafe() {
  return (
    <section className="border-y border-white/10 bg-bg-soft/60 py-16 sm:py-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <span className="eyebrow mb-4">
              <Shield className="h-3.5 w-3.5" />
              Trust &amp; safety
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Is selling feet pics on Foot Love{" "}
              <span className="text-gradient">legit &amp; safe?</span>
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              Short answer: yes. Foot Love is a fully legitimate platform built
              around creator safety. We take privacy, payments, and content
              protection seriously — so you can earn with total peace of mind.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-coral/20 bg-coral/10 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-[#2a0f0a]">
                <Check className="h-5 w-5" strokeWidth={3} />
              </span>
              <p className="text-sm font-medium text-ink">
                12,000+ creators sell feet pics on Foot Love
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {POINTS.map((p) => (
              <div
                key={p.n}
                className="flex gap-4 rounded-3xl border border-white/10 bg-bg-card/60 p-6"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-coral/20 bg-coral/10 text-lg font-black text-coral">
                  {p.n}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import CheckItem from "./CheckItem";
import { Scale, Sparkle } from "../Icons";

const CONDITIONS = [
  "You have to be 18+ and able to prove it.",
  "Sell only what you shot and have the right to distribute.",
  "Anyone in frame must be a consenting adult, with any required records kept.",
  "Laws, platform rules, and tax treatment differ by country and region.",
];

const TAX = [
  "Feet-pic income is generally taxable — even part-time, even with no form issued.",
  "In the US, many report on Schedule C, and self-employment tax can kick in once net earnings hit $400.",
  "Parking ~25–30% aside is a sensible habit, not an official rule.",
  "Keep records from sale one and check the current rules where you live.",
];

export default function GuideLegal() {
  return (
    <section
      id="legal"
      className="border-y border-white/10 bg-bg-soft/60 py-16 sm:py-24"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">
            <Scale className="h-3.5 w-3.5" />
            The Rules
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Is It Legal to Sell Feet Pics —{" "}
            <span className="text-gradient">and Is It Taxable?</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            For adults 18 and up, selling your own feet photos is legal in the
            US, UK, and most places — feet aren&apos;t explicit content, which
            is a big part of why the door is so open. The details, though, come
            down to your circumstances.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-bg-card/60 p-6 sm:p-7">
              <h3 className="text-lg font-bold">The conditions that count</h3>
              <ul className="mt-5 space-y-3.5">
                {CONDITIONS.map((c) => (
                  <CheckItem key={c}>{c}</CheckItem>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-bg-card/60 p-6 sm:p-7">
              <h3 className="text-lg font-bold">Staying straight with tax</h3>
              <ul className="mt-5 space-y-3.5">
                {TAX.map((t) => (
                  <CheckItem key={t}>{t}</CheckItem>
                ))}
              </ul>
            </div>
          </div>

          {/* supporting image */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E8A87C] via-[#FF8F73] to-[#241F30]" />
            <div
              className="relative min-h-[280px] bg-cover bg-center lg:h-full"
              style={{
                backgroundImage: "url(/images/profiles_113290_image.webp)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 border-l-4 border-l-coral bg-bg/60 p-5 text-sm leading-relaxed text-ink-muted">
          <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
          <p>
            This is general information, not legal or tax advice. Rules change
            and vary by location — confirm what applies to you, and talk to a
            qualified professional if you&apos;re unsure.
          </p>
        </div>
      </div>
    </section>
  );
}

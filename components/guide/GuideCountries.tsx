import { Globe } from "../Icons";

const COUNTRIES = [
  {
    flag: "🇺🇸",
    code: "US",
    text: "Legal at 18+. Treat earnings as self-employment income (often Schedule C) and set money aside for tax.",
  },
  {
    flag: "🇬🇧",
    code: "GB",
    text: "Legal at 18+. Declare to HMRC as self-employed once you pass the trading allowance.",
  },
  {
    flag: "🇦🇺",
    code: "AU",
    text: "Legal at 18+. Report to the ATO; an ABN can help if you run it as a business.",
  },
  {
    flag: "🇨🇦",
    code: "CA",
    text: "Legal at 18+. Report as self-employment/business income and hold on to expense records.",
  },
];

export default function GuideCountries() {
  return (
    <section id="countries" className="py-16 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">
            <Globe className="h-3.5 w-3.5" />
            By Location
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Country-Specific{" "}
            <span className="text-gradient">Quick Guides</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            The steps don&apos;t change from place to place, but payout options
            and tax rules do. Here&apos;s the short version — full detail lives
            in our dedicated country guides.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COUNTRIES.map((c) => (
            <div
              key={c.code}
              className="rounded-3xl border border-white/10 bg-bg-card/60 p-6 transition-colors hover:border-coral/30"
            >
              <h3 className="flex items-center gap-2.5 text-lg font-bold">
                <span className="text-2xl leading-none" aria-hidden>
                  {c.flag}
                </span>
                {c.code}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {c.text}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-ink-faint">
          General guidance only — thresholds and rules move. Confirm the current
          requirements with your local tax authority or an adviser.
        </p>
      </div>
    </section>
  );
}

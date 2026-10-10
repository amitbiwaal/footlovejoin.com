import CheckItem from "./CheckItem";

const ROWS: [string, string, string][] = [
  ["Single photo", "$5–$20+", "Sharpness, exclusivity, personalization"],
  ["Set / bundle", "$15–$60", "How many shots, theme, effort"],
  ["Short clip", "$10–$100+", "Runtime and exclusivity"],
  ["Custom order", "2–3× base", "Requested poses, props, personalization"],
  ["Subscription", "$10–$25/mo", "Consistency and perks for regulars"],
];

const TIMELINE: [string, string][] = [
  [
    "Weeks 1–4:",
    "setup, a starter library, and your first handful of sales — often modest.",
  ],
  [
    "Months 2–3:",
    "a posting rhythm and a few repeat buyers start to compound.",
  ],
  [
    "Months 4–6:",
    "a recognizable niche, custom orders, and a small regular base do the heavy lifting.",
  ],
  [
    "Throughout:",
    "the sellers who stick to a weekly cadence pull away from the ones who post in bursts.",
  ],
];

export default function GuideEarnings() {
  return (
    <section
      id="earnings"
      className="border-y border-white/10 bg-bg-soft/60 py-16 sm:py-24"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">The Money, Honestly</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How Much Can You Earn{" "}
            <span className="text-gradient">Selling Feet Pics?</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            Straight talk: what you earn selling feet pics rides on effort,
            rhythm, and audience. Individual shots usually land between $5 and
            $25, and sets, clips, and subscriptions build on top. These are
            realistic opening ranges.
          </p>
        </div>

        {/* price table */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60">
          {/* On phones each row stacks (type + price, then the note) so no
              column is hidden off-screen; from sm up it is a regular table. */}
          <div>
            <table className="block w-full text-left text-sm sm:table">
              <thead className="hidden sm:table-header-group">
                <tr className="border-b border-white/10 bg-bg/60">
                  <th className="px-5 py-4 font-bold text-rose-gold">
                    Content type
                  </th>
                  <th className="px-5 py-4 font-bold text-rose-gold">
                    Typical range
                  </th>
                  <th className="px-5 py-4 font-bold text-rose-gold">
                    What moves the number
                  </th>
                </tr>
              </thead>
              <tbody className="block sm:table-row-group">
                {ROWS.map(([type, range, driver]) => (
                  <tr
                    key={type}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-white/5 px-5 py-4 transition-colors last:border-0 hover:bg-white/5 sm:table-row sm:p-0"
                  >
                    <td className="font-semibold text-ink sm:px-5 sm:py-4 sm:font-normal sm:text-ink-muted">
                      {type}
                    </td>
                    <td className="whitespace-nowrap font-bold text-coral sm:px-5 sm:py-4">
                      {range}
                    </td>
                    <td className="w-full text-ink-muted sm:w-auto sm:px-5 sm:py-4">
                      {driver}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-faint">
          Treat these as testing figures, not promises. A lot of beginners earn
          little early on — and some earn nothing for the first stretch — with
          income that comes and goes. No dependable &quot;average&quot; exists,
          so read every number as a starting point rather than a guarantee.
        </p>

        {/* realistic timeline */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-bg-card/60 p-6 sm:p-7">
          <h3 className="text-lg font-bold">
            What a realistic first six months looks like
          </h3>
          <ul className="mt-5 space-y-3.5">
            {TIMELINE.map(([bold, rest]) => (
              <CheckItem key={bold}>
                <strong className="text-ink">{bold}</strong> {rest}
              </CheckItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import CheckItem from "./CheckItem";

const NEEDS: [string, string][] = [
  ["Your phone camera.", "A current handset out-shoots the studios of a decade ago."],
  ["A bright window.", "Soft, indirect daylight flatters feet far more than a flash."],
  ["A stage name.", "Choose it once, then use it everywhere without exception."],
  [
    "A trustworthy marketplace.",
    "Real buyers, locked-down payments, verified accounts.",
  ],
  [
    "Honest patience.",
    "The first sale can take days; the momentum arrives after.",
  ],
];

const CHECKLIST_A = [
  "Prep your feet — trimmed nails, smooth skin, maybe a fresh coat of polish.",
  "Shoot a batch of a dozen angles so day one already looks established.",
  "Clear the frame of anything that hints at where or who you are.",
];

const CHECKLIST_B = [
  "Spin up a fresh email and handle before your profile goes public.",
  "Log out and preview your own page to see exactly what buyers see.",
  "Decide your niche and boundaries up front, not on the fly.",
];

export default function GuideWhatYouNeed() {
  return (
    <section
      id="what-you-need"
      className="border-y border-white/10 bg-bg-soft/60 py-16 sm:py-24"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Before You Post</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What You Actually{" "}
            <span className="text-gradient">Need to Start</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            Forget the shopping list you&apos;re picturing. The real cost of
            entry is close to zero — a phone and a little care handle most of
            it.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          {/* photo */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B5A] via-[#E8A87C] to-[#241F30]" />
            <div
              className="relative aspect-[4/3] bg-cover bg-center"
              style={{
                backgroundImage: "url(/images/profiles_113201_image.webp)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* the five things */}
          <div className="rounded-3xl border border-white/10 bg-bg-card/60 p-6 sm:p-7">
            <h3 className="text-lg font-bold">The five things that matter</h3>
            <ul className="mt-5 space-y-3.5">
              {NEEDS.map(([bold, rest]) => (
                <CheckItem key={bold}>
                  <strong className="text-ink">{bold}</strong> {rest}
                </CheckItem>
              ))}
            </ul>
          </div>
        </div>

        {/* checklist */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-bg-card/60 p-6 sm:p-7">
          <h3 className="text-lg font-bold">A simple first-check checklist</h3>
          <div className="mt-5 grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
            <ul className="space-y-3.5">
              {CHECKLIST_A.map((c) => (
                <CheckItem key={c}>{c}</CheckItem>
              ))}
            </ul>
            <ul className="space-y-3.5">
              {CHECKLIST_B.map((c) => (
                <CheckItem key={c}>{c}</CheckItem>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Users, Camera, Eye, Wallet, ArrowRight } from "../Icons";
import { AFFILIATE_LINK_PROPS } from "../affiliate";

export const STEPS = [
  {
    n: "1",
    icon: Users,
    title: "Open a private profile",
    text: "Register under a nickname, write a short bio, and tag your categories. Your real identity never enters the picture.",
    schemaText:
      "Register under a nickname, write a short bio, and tag your categories; your identity stays hidden.",
  },
  {
    n: "2",
    icon: Camera,
    title: "Post your first sets",
    text: "Drop a handful of sharp, bright shots. Leave a couple free as a hook and keep the rest locked behind a price.",
    schemaText:
      "Upload sharp, bright shots with a couple free as a hook and the rest locked behind a price.",
  },
  {
    n: "3",
    icon: Eye,
    title: "Let buyers come to you",
    text: "Verified members discover, follow, and unlock your work — you don't need an existing audience to make the first sale.",
    schemaText:
      "Verified members discover, follow, and unlock your work through built-in discovery.",
  },
  {
    n: "4",
    icon: Wallet,
    title: "Cash out quietly",
    text: "Your balance builds and lands in your bank on schedule. Neither side ever sees a real name or contact detail.",
    schemaText:
      "Your balance pays out to your bank while neither side sees a real name.",
  },
];

export default function GuideSteps() {
  return (
    <section id="steps" className="py-16 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">The Loop</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How to Sell Feet Pics in{" "}
            <span className="text-gradient">4 Steps</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            Cut through the noise and the whole thing is a four-part loop you
            repeat each week. Here it is end to end.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="group relative rounded-3xl border border-white/10 bg-bg-card/60 p-6 transition-colors hover:border-coral/30"
            >
              <span className="text-4xl font-black text-white/10 transition-colors group-hover:text-coral/25">
                {s.n}
              </span>
              <span className="mt-3 grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-[#2a0f0a]">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a {...AFFILIATE_LINK_PROPS} className="btn-primary">
            Open your free profile
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

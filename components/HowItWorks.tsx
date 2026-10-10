import { Users, Camera, Dollar, Wallet, ArrowRight } from "./Icons";
import { AFFILIATE_LINK_PROPS } from "./affiliate";

const STEPS = [
  {
    n: "01",
    icon: Users,
    title: "Create your free Foot Love account",
    text: "Sign up in minutes with just an email. Stay anonymous — no real name and no face are ever required to start selling feet pics for free.",
  },
  {
    n: "02",
    icon: Camera,
    title: "Upload feet pics & videos to sell",
    text: "Add feet pics, videos, and custom sets. Set your own prices, choose what to showcase, and build your feet page in a few taps.",
  },
  {
    n: "03",
    icon: Dollar,
    title: "Get discovered & sell feet pictures",
    text: "Verified buyers browse, follow, and unlock your content. Take custom requests, message safely, and sell feet pictures on repeat.",
  },
  {
    n: "04",
    icon: Wallet,
    title: "Get paid fast for your feet pics",
    text: "Withdraw your earnings quickly to your preferred method. Low fees and private payouts go straight to your account.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">How it works</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Start selling feet pics on Foot Love in{" "}
            <span className="text-gradient">4 simple steps</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            From sign-up to your first payout, the whole process is built to be
            fast, private, and beginner-friendly. Here&apos;s exactly how to
            sell feet pics on Foot Love.
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
            Create free account
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

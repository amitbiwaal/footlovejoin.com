import {
  Lock,
  Wallet,
  Shield,
  Users,
  Bolt,
  Heart,
  Message,
} from "./Icons";

const FEATURES = [
  {
    icon: Lock,
    title: "Sell feet pics 100% anonymously",
    text: "No face, no real name, no buyer contacts shared. Sell feet pics anonymously online — you control who sees your content.",
  },
  {
    icon: Wallet,
    title: "Keep more when you sell feet pics",
    text: "Industry-low, transparent fees mean you keep more of every feet pic you sell. No surprise cuts and no subscription to start.",
  },
  {
    icon: Shield,
    title: "Foot Love protects your content",
    text: "Watermarking, screenshot deterrents, and takedown support help keep your photos and videos where they belong.",
  },
  {
    icon: Users,
    title: "Verified buyers only on Foot Love",
    text: "Every buyer is screened, so you deal with real paying customers — not spammers or time-wasters.",
  },
  {
    icon: Bolt,
    title: "Start selling feet pics in minutes",
    text: "No sign-up fee and no app to install. Get set up in minutes and list your first feet pics for sale today.",
  },
  {
    icon: Message,
    title: "24/7 support from the Foot Love team",
    text: "A real support team is on hand any time you need help with payouts, custom requests, or your account.",
  },
];

export default function WhyChoose() {
  return (
    <section id="why-choose" className="py-16 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">
            <Heart className="h-3.5 w-3.5" />
            Why Foot Love
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Why sellers choose Foot Love to{" "}
            <span className="text-gradient">sell feet pics online</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            Everything you need to sell feet pics safely — privacy, protection,
            and payouts handled, so you can focus on creating.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-white/10 bg-bg-card/60 p-6 transition-all hover:-translate-y-1 hover:border-coral/30 hover:bg-bg-card2/70"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-coral/20 bg-coral/10 text-coral transition-colors group-hover:bg-brand-gradient group-hover:text-[#2a0f0a]">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

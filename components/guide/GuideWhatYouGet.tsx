import { Dollar, Lock, Users, Shield, Wallet, Globe } from "../Icons";

const FEATURES = [
  {
    icon: Dollar,
    title: "Keep more of every sale",
    text: "A generous split with no quiet deductions skimming your payout on the way out.",
  },
  {
    icon: Lock,
    title: "Anonymous by default",
    text: "No face, no legal name in front of buyers. You stay a persona from first post to withdrawal.",
  },
  {
    icon: Users,
    title: "Only verified buyers",
    text: "Accounts are checked, so you spend your time on real, ready-to-pay people — not tire-kickers.",
  },
  {
    icon: Shield,
    title: "Leak protection built in",
    text: "Blurred previews and watermarking make it harder for paid content to escape into the wild.",
  },
  {
    icon: Wallet,
    title: "Discreet on statements",
    text: "Purchases land under a low-key descriptor, so buying and selling both stay private.",
  },
  {
    icon: Globe,
    title: "No lock-in",
    text: "List here and anywhere else too. Every follower you build stays yours to keep.",
  },
];

export default function GuideWhatYouGet() {
  return (
    <section
      id="what-you-get"
      className="border-y border-white/10 bg-bg-soft/60 py-16 sm:py-24"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Why Sell Here</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What You Get on <span className="text-gradient">Foot Love</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            Every feature points at the same goal: more of your money, less of
            your identity, and buyers who actually show up.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-white/10 bg-bg-card/60 p-6 transition-colors hover:border-coral/30 hover:bg-bg-card2/60"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gradient text-[#2a0f0a]">
                <f.icon className="h-5 w-5" />
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

import {
  Users,
  Globe,
  Dollar,
  Bolt,
  Wallet,
  Shield,
  Heart,
  Message,
  Lock,
  Star,
  Eye,
  Camera,
} from "./Icons";

const BENEFITS = [
  { icon: Users, title: "Sell feet pics with no barriers", text: "Anyone can start. No studio, no gym, no experience needed to sell feet pics." },
  { icon: Star, title: "Be your own boss on Foot Love", text: "Set your prices, pick your buyers, and post on your own schedule." },
  { icon: Globe, title: "Sell feet pics from anywhere", text: "All you need is a phone and Wi-Fi — sell feet pics from home or on the go." },
  { icon: Camera, title: "Sell feet pictures, no contact", text: "It's 100% content-based. No meetups, ever — everything happens online." },
  { icon: Dollar, title: "High margins on every feet pic", text: "Your feet pics cost nothing to make and can sell again and again." },
  { icon: Wallet, title: "Passive income from feet pics", text: "Older sets keep selling while you sleep. Build a library once, earn on repeat." },
  { icon: Bolt, title: "Low startup cost to sell feet pics", text: "No inventory, no equipment. Start free with the phone in your pocket." },
  { icon: Heart, title: "Loyal, repeat buyers on Foot Love", text: "Build a fanbase that subscribes, tips, and comes back for more." },
  { icon: Message, title: "Private messaging for feet pic sales", text: "Chat with buyers securely to close custom requests and upsells." },
  { icon: Eye, title: "Smart discovery on Foot Love", text: "Our search puts your feet content in front of buyers who want it." },
  { icon: Shield, title: "Verified feet pic sellers only", text: "Every member is verified, keeping the community genuine and safe." },
  { icon: Lock, title: "Upload & sell feet pics privately", text: "Upload feet pics privately — your content, controlled and protected." },
];

export default function Benefits() {
  return (
    <section className="border-y border-white/10 bg-bg-soft/60 py-16 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">The upside</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Why choose Foot Love to{" "}
            <span className="text-gradient">sell feet pictures online?</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            Selling feet pics is one of the simplest, most flexible ways to earn
            online. Here&apos;s what makes it work on Foot Love.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-bg-card/60 p-5 transition-colors hover:border-coral/25"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-coral/20 bg-coral/10 text-coral">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-bold">{b.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {b.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

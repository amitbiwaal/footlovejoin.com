import { Instagram, Tiktok, XSocial, Globe, Heart, Users } from "./Icons";

const PLATFORMS = [
  { name: "Instagram", icon: Instagram },
  { name: "Twitter", icon: Tiktok },
  { name: "X", icon: XSocial },
  { name: "Reddit", icon: Globe },
  { name: "Threads", icon: Users },
  { name: "Feetly", icon: Heart },
];

export default function MediaCoverage() {
  return (
    <section className="border-y border-white/10 bg-bg-soft/60 py-14">
      <div className="container-x text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
          Promote your Foot Love feet pics across every platform
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-bg-card/50 px-4 py-4 text-ink-muted transition-colors hover:text-ink"
            >
              <p.icon className="h-5 w-5" />
              <span className="text-sm font-semibold">{p.name}</span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-sm text-ink-faint">
          Promote your Foot Love profile with a single link and drive buyers
          from wherever your audience already is.
        </p>
      </div>
    </section>
  );
}

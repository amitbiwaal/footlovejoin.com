import { Star, Check, ArrowRight } from "../Icons";
import { AFFILIATE_LINK_PROPS } from "../affiliate";

const CHIPS = [
  "Stay anonymous",
  "Verified, paying buyers",
  "Fast, discreet payouts",
  "No upfront cost",
];

export default function GuideHero() {
  return (
    <section id="top" className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <span className="eyebrow mb-5">
            <Star className="h-3.5 w-3.5 text-rose-gold" />
            Beginner-Friendly · 2026
          </span>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            How to Sell <span className="text-gradient">Feet Pics</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Plenty of people quietly turn their feet photos into real income —
            and the on-ramp is far shorter than most assume. This is the
            practical playbook for how to sell feet pics from a standing start:
            opening a private profile, reaching buyers who actually pay, pricing
            your work sensibly, and cashing out without ever putting your name
            to it.
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
            {CHIPS.map((c) => (
              <li key={c} className="chip">
                <Check className="h-3.5 w-3.5 text-coral" />
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center">
            <a {...AFFILIATE_LINK_PROPS} className="btn-primary">
              Sell Feet Pics
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

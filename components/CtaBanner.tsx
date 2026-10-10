import { ArrowRight, Sparkle } from "./Icons";
import { AFFILIATE_LINK_PROPS } from "./affiliate";

type Props = {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: string;
  primary?: string;
  secondary?: string;
  /** Small reassurance line under the buttons. */
  note?: string;
};

export default function CtaBanner({
  id,
  eyebrow = "Get started",
  title,
  subtitle,
  primary = "Start selling for free",
  secondary,
  note,
}: Props) {
  return (
    <section id={id} className="py-8 sm:py-12">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-4xl border border-coral/20 bg-brand-gradient p-8 text-center sm:p-14">
          {/* texture overlays */}
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(0,0,0,0.35),transparent_45%)]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2a0f0a]">
              <Sparkle className="h-3.5 w-3.5" />
              {eyebrow}
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-extrabold leading-tight tracking-tight text-[#1a0d0a] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-[#3a1a12] sm:text-lg">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                {...AFFILIATE_LINK_PROPS}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a0d0a] px-7 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-95"
              >
                {primary}
                <ArrowRight className="h-4 w-4" />
              </a>
              {secondary && (
                <a
                  href="#faq"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2a0f0a]/30 bg-white/25 px-7 py-3.5 text-sm font-bold text-[#1a0d0a] transition-colors hover:bg-white/40"
                >
                  {secondary}
                </a>
              )}
            </div>
            {note && (
              <p className="mt-4 text-xs font-semibold text-[#5A2E12]">{note}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

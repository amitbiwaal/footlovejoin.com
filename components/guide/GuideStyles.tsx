import { Sparkle } from "../Icons";
import { AFFILIATE_LINK_PROPS } from "../affiliate";

const STYLES = [
  {
    name: "Painted pedicures",
    note: "Glossy, well-kept nails in bold color — perennially one of the first things buyers filter for.",
    img: "/images/profiles_113141_image.webp",
    gradient: "from-[#F4C89A] via-[#FF8F73] to-[#2a2536]",
  },
  {
    name: "Soles & arches",
    note: "Top-down and low angles that put clean soles and a high arch front and center.",
    img: "/images/profiles_113040_image.webp",
    gradient: "from-[#FF6B5A] via-[#E8A87C] to-[#3a2b3a]",
  },
  {
    name: "Hosiery & socks",
    note: "Sheer nylons and cozy socks — the slow reveal is worth a premium to a lot of buyers.",
    img: "/images/profiles_113290_image.webp",
    gradient: "from-[#E8A87C] via-[#a9708a] to-[#1C1926]",
  },
  {
    name: "Shoes & heels",
    note: "Feet in heels, flats, or trainers pull in a wider crowd than bare shots alone.",
    img: "/images/profiles_113201_image.webp",
    gradient: "from-[#FF7E5F] via-[#c76a6a] to-[#241F30]",
  },
  {
    name: "Seasonal & props",
    note: "Holiday themes, jewelry, and small props hand your regulars a reason to buy again.",
    img: "/images/profiles_113385_image.webp",
    gradient: "from-[#FF6B5A] via-[#9a5b7a] to-[#241F30]",
  },
  {
    name: "Made-to-order",
    note: "Personalized poses and requests are the richest-margin work you can take on.",
    img: "/images/profiles_113511_image.webp",
    gradient: "from-[#FFA07A] via-[#E8A87C] to-[#2a2536]",
  },
];

const TAGS = [
  "Pedicure",
  "Soles",
  "Arches",
  "Heels",
  "Ballet Flats",
  "Nylons",
  "Socks",
  "Nail Art",
  "Athletic",
  "Beach",
  "Toe Rings",
  "Seasonal",
  "Male Feet",
  "Ink & Tattoos",
  "Sneakers",
];

export default function GuideStyles() {
  return (
    <>
      {/* ---- What sells ---- */}
      <section
        id="styles"
        className="border-y border-white/10 bg-bg-soft/60 py-16 sm:py-24"
      >
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mb-4">Read the Demand</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              The Feet Pic Styles{" "}
              <span className="text-gradient">Buyers Search For</span>
            </h2>
            <p className="mt-4 text-ink-muted">
              Buyers shop by taste, and sellers who commit to a clear look get
              found faster. These are the styles that keep moving on
              feet-content marketplaces.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STYLES.map((s) => (
              <div
                key={s.name}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-bg-card/60"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${s.gradient}`}
                  />
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${s.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold">{s.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {s.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 border-l-4 border-l-coral bg-bg/60 p-5 text-sm leading-relaxed text-ink-muted">
            <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
            <p>
              You don&apos;t need to cover every style. Own one or two, shoot
              them well, and let a recognizable niche do the marketing for you.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Pick your niche ---- */}
      <section id="niche" className="py-16 sm:py-24">
        <div className="container-x">
          <div className="max-w-4xl">
            <span className="eyebrow mb-4">Stake Your Claim</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Pick Your <span className="text-gradient">Niche</span>
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              Because buyers browse by category, claiming a lane puts you in
              front of the right people sooner. Begin with whatever feels most
              like you — nothing stops you adding more later.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {TAGS.map((t) => (
              <a
                key={t}
                {...AFFILIATE_LINK_PROPS}
                className="rounded-2xl border border-white/10 bg-bg-card/60 px-4 py-2.5 text-sm font-semibold text-rose-gold transition-all hover:-translate-y-0.5 hover:border-coral/30 hover:bg-bg-card2/70"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

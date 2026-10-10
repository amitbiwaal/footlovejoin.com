import { Lock, Heart, Check, Eye } from "./Icons";

type Tile = {
  name: string;
  handle: string;
  price: string;
  likes: string;
  verified?: boolean;
  gradient: string;
  img: string;
};

const TILES: Tile[] = [
  { name: "Mia", handle: "@mia.soles", price: "$8", likes: "2.4k", verified: true, gradient: "from-[#FF6B5A] via-[#E8A87C] to-[#3a2b3a]", img: "/images/profiles_113040_image.webp" },
  { name: "Lena", handle: "@lunafeet", price: "$12", likes: "1.1k", verified: true, gradient: "from-[#F4C89A] via-[#FF8F73] to-[#2a2536]", img: "/images/profiles_113141_image.webp" },
  { name: "Aria", handle: "@aria.toes", price: "$6", likes: "3.8k", verified: true, gradient: "from-[#FF7E5F] via-[#c76a6a] to-[#241F30]", img: "/images/profiles_113201_image.webp" },
  { name: "Nova", handle: "@novasoles", price: "$15", likes: "980", verified: true, gradient: "from-[#E8A87C] via-[#a9708a] to-[#1C1926]", img: "/images/profiles_113290_image.webp" },
  { name: "Zoe", handle: "@zoe.feet", price: "$9", likes: "5.2k", verified: true, gradient: "from-[#FF6B5A] via-[#9a5b7a] to-[#241F30]", img: "/images/profiles_113385_image.webp" },
  { name: "Ivy", handle: "@ivytoes", price: "$7", likes: "1.7k", verified: true, gradient: "from-[#FFA07A] via-[#E8A87C] to-[#2a2536]", img: "/images/profiles_113511_image.webp" },
];

function GalleryTile({ t }: { t: Tile }) {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
      {/* gradient base — shows through until a real photo is dropped in /public/images */}
      <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient}`} />
      {/* real photo (shown blurred as a locked preview) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${t.img})` }}
      />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* lock badge */}
      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
        <Lock className="h-3.5 w-3.5" />
        {t.price}
      </div>

      {/* likes */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
        <Heart className="h-3.5 w-3.5 text-coral" />
        {t.likes}
      </div>

      {/* seller footer */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4">
        <span
          className="h-9 w-9 shrink-0 rounded-full border-2 border-white/70"
          style={{ background: "linear-gradient(135deg,#FF6B5A,#241F30)" }}
        />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-sm font-bold text-white">
            {t.name}
            {t.verified && (
              <span className="grid h-4 w-4 place-items-center rounded-full bg-coral text-[#2a0f0a]">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
            )}
          </p>
          <p className="truncate text-xs text-white/70">{t.handle}</p>
        </div>
        <button className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#1a0d0a] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Unlock
        </button>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-24">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow mb-4">
              <Eye className="h-3.5 w-3.5" />
              Live now
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Fresh feet pics for sale on <span className="text-gradient">Foot Love</span>, updated daily
            </h2>
            <p className="mt-3 max-w-xl text-ink-muted">
              Thousands of verified creators post new feet pics for sale every day — from soles and arches to painted toenails, custom sets, and short video clips. Browse trending, new, verified, and top-rated feet content, or discover sellers near you.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-coral" />
            <span className="font-semibold">1,284</span>
            <span className="text-ink-faint">creators online</span>
          </div>
        </div>

        {/* grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {TILES.map((t) => (
            <GalleryTile key={t.handle} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

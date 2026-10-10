import CheckItem from "./CheckItem";
import { Shield } from "../Icons";

const BLOCK = [
  '"I\'ll pay once you send it" — they take the content and disappear.',
  'Screenshots of a "payment" — a picture isn\'t money in your account.',
  'Requests for a "verification" or "unlock" fee — no real buyer asks you to pay.',
  "Being pushed onto Cash App, PayPal friends-and-family, or Telegram to dodge protection.",
  '"Send a freebie to prove it\'s really you" — a classic vanish.',
];

const LOCKDOWN = [
  "Use a stage name with no link to your real accounts.",
  "Stay faceless and scrub the frame of anything identifying.",
  "Strip location data from files and watermark your previews.",
  "Turn on regional blocking where offered to hide your home area.",
  "Run a separate inbox and dedicated socials, never your personal ones.",
];

export default function GuideSafety() {
  return (
    <section
      id="safety"
      className="relative overflow-hidden border-y border-white/10 bg-bg-soft/60 py-16 sm:py-24"
    >
      {/* warm radial glow, mirroring the hero */}
      <div className="pointer-events-none absolute inset-0 bg-brand-radial opacity-80" />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">
            <Shield className="h-3.5 w-3.5" />
            Protect Yourself
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How to Sell Feet Pics Safely and{" "}
            <span className="text-gradient">Stay Anonymous</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            The most common horror stories from new sellers are scams — and
            almost all of them rhyme. A single rule blocks the majority:{" "}
            <strong className="text-ink">
              money first, content second, and never leave the platform.
            </strong>
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-bg-card/70 p-6 sm:p-7">
            <h3 className="text-lg font-bold">Block these on sight</h3>
            <ul className="mt-5 space-y-3.5">
              {BLOCK.map((b) => (
                <CheckItem key={b}>{b}</CheckItem>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-bg-card/70 p-6 sm:p-7">
            <h3 className="text-lg font-bold">Keep your identity locked down</h3>
            <ul className="mt-5 space-y-3.5">
              {LOCKDOWN.map((l) => (
                <CheckItem key={l}>{l}</CheckItem>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 leading-relaxed text-ink-muted">
          <strong className="text-ink">
            A quick reality check on &quot;anonymous&quot;:
          </strong>{" "}
          hiding your face keeps you private to buyers, but you&apos;re never
          invisible to the marketplace, your bank, or the tax office — a
          verified service still holds your true identity, payout, and tax
          details. Buyer-facing privacy and being off the grid are not the same
          thing.
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";
import PageShell from "@/components/PageShell";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import { Shield, Lock, Chart, Heart } from "@/components/Icons";
import { buildMetadata, breadcrumbLd, webPageLd } from "@/lib/seo";

const page = {
  title: "About Foot Love",
  description:
    "What Foot Love Join is and how it works: honest guides for adults who want to sell feet pics safely, plus a free sign-up path to a verified marketplace.",
  path: "/about/",
};

export const metadata = buildMetadata(page);

const crumbs = [{ name: "About", path: page.path }];

const PRINCIPLES = [
  {
    icon: Chart,
    title: "Realistic numbers, not hype",
    text: "We talk about earnings as ranges and starting points. Selling feet pics is a side income that rewards consistency — nobody can promise you a figure, and we don't.",
  },
  {
    icon: Lock,
    title: "Privacy comes first",
    text: "Every guide assumes you want to stay anonymous: no face, no real name, clean metadata, and payments that stay on a platform built to protect sellers.",
  },
  {
    icon: Shield,
    title: "Safety over shortcuts",
    text: "We steer readers away from off-platform deals, upfront “unlock” fees, and anything else that puts creators at risk — even when a shortcut looks tempting.",
  },
  {
    icon: Heart,
    title: "Adults only, always",
    text: "Foot Love is strictly 18+. Selling feet content is legal work for consenting adults, and age and identity verification is a non-negotiable part of that.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      crumbs={crumbs}
      eyebrow="About us"
      title={
        <>
          The straightforward way to start{" "}
          <span className="text-gradient">selling feet pics</span>
        </>
      }
      intro="Foot Love Join exists for one reason: to give adults a clear, safe, no-nonsense path into selling feet content — from the first question to the first payout."
    >
      <section className="pb-6 pt-10">
        <div className="container-x">
          <div className="prose-article mx-auto max-w-3xl">
            <h2>What Foot Love Join is</h2>
            <p>
              Foot Love Join (footlovejoin.com) is a guide and sign-up hub for
              people who want to sell feet pics online. We publish practical,
              beginner-friendly material — how the process works, what buyers
              look for, how to price your work, and how to protect your
              identity — and we point you to a dedicated, verified marketplace
              where the selling actually happens.
            </p>
            <p>
              If you&apos;re new, start with our{" "}
              <Link href="/how-to-sell-feet-pics/">
                step-by-step guide to selling feet pics
              </Link>
              , then browse the <Link href="/blog/">blog</Link> for deeper
              dives on photography, pricing, and staying safe.
            </p>

            <h2>How it works</h2>
            <p>
              This website doesn&apos;t hold your account, your content, or
              your money. When you tap a &ldquo;Sell Feet Pics&rdquo; or
              &ldquo;Join&rdquo; button, you&apos;re taken to our partner
              marketplace&apos;s secure platform. That&apos;s where you create
              your free account, verify that you&apos;re 18 or older, upload
              your content, talk to buyers, and withdraw your earnings.
            </p>
            <p>
              Those buttons are affiliate links: if you sign up through them,
              we may earn a commission at no extra cost to you. That&apos;s how
              we keep the guides free. The full details are in our{" "}
              <Link href="/affiliate-disclosure/">affiliate disclosure</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container-x">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
              What we <span className="text-gradient">stand for</span>
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="rounded-3xl border border-white/10 bg-bg-card/60 p-6"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-coral/20 bg-coral/10 text-coral">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6 pt-4">
        <div className="container-x">
          <div className="prose-article mx-auto max-w-3xl">
            <h2>Who this site is for</h2>
            <ul>
              <li>
                <strong>Complete beginners</strong> who want to know whether
                selling feet pics is legitimate, legal, and worth their time.
              </li>
              <li>
                <strong>New sellers</strong> looking for pricing ranges, photo
                tips, and a realistic picture of the first few months.
              </li>
              <li>
                <strong>Privacy-minded creators</strong> who want to earn
                without ever showing their face or using their real name.
              </li>
            </ul>

            <h2>Get in touch</h2>
            <p>
              Spotted something out of date, or have a question we haven&apos;t
              answered? We&apos;d like to hear it — head to the{" "}
              <Link href="/contact/">contact page</Link>.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Free to join"
        title="Ready when you are"
        subtitle="Open a free, anonymous seller profile in minutes — no face, no real name, and no upfront cost."
        primary="Start selling — it's free"
        note="18+ only · Verification required · Stay anonymous"
      />

      <JsonLd graph={[breadcrumbLd(crumbs), webPageLd("AboutPage", page)]} />
    </PageShell>
  );
}

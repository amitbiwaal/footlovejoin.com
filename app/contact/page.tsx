import Link from "next/link";
import PageShell from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import { Message, Shield, Lock, Users, ArrowRight } from "@/components/Icons";
import { buildMetadata, breadcrumbLd, webPageLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const page = {
  title: "Contact Us",
  description:
    "Get in touch with the Foot Love Join team — general questions, content removal and copyright requests, privacy requests, and partnership enquiries.",
  path: "/contact/",
};

export const metadata = buildMetadata(page);

const crumbs = [{ name: "Contact", path: page.path }];

const mailto = (subject: string) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;

const TOPICS = [
  {
    icon: Message,
    title: "General questions",
    text: "Feedback on a guide, a correction, or something we haven't covered yet.",
    subject: "General question",
  },
  {
    icon: Shield,
    title: "Content removal & copyright",
    text: "Report content on this website that you believe infringes your rights or shouldn't be here.",
    subject: "Content removal request",
  },
  {
    icon: Lock,
    title: "Privacy requests",
    text: "Questions about how this website handles data, or a request to exercise your privacy rights.",
    subject: "Privacy request",
  },
  {
    icon: Users,
    title: "Partnerships & press",
    text: "Collaborations, media enquiries, and business proposals.",
    subject: "Partnership enquiry",
  },
];

export default function ContactPage() {
  return (
    <PageShell
      crumbs={crumbs}
      eyebrow="Contact"
      title={
        <>
          Get in <span className="text-gradient">touch</span>
        </>
      }
      intro="Pick the topic that fits and send us an email."
    >
      <section className="pb-16 pt-10 sm:pb-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {TOPICS.map((t) => (
                <a
                  key={t.title}
                  href={mailto(t.subject)}
                  className="group flex flex-col rounded-3xl border border-white/10 bg-bg-card/60 p-6 transition-colors hover:border-coral/30 hover:bg-bg-card2/70"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-coral/20 bg-coral/10 text-coral">
                    <t.icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 text-lg font-bold">{t.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                    {t.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-coral-soft">
                    Email us
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-bg-card/60 p-6 text-center sm:p-8">
              <p className="text-sm text-ink-faint">Or write to us directly</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 inline-block break-all text-xl font-extrabold tracking-tight text-gradient sm:text-2xl"
              >
                {SITE.email}
              </a>
            </div>

            <div className="prose-article mt-10">
              <h2>Before you write</h2>
              <ul>
                <li>
                  <strong>Account, verification, or payout problems:</strong>{" "}
                  seller accounts live on our partner marketplace, not on this
                  website, so we can&apos;t see or change them. Please use the
                  support option inside your account there.
                </li>
                <li>
                  <strong>New to selling?</strong> Most first questions are
                  answered in our{" "}
                  <Link href="/how-to-sell-feet-pics/">
                    guide to selling feet pics
                  </Link>{" "}
                  and on the <Link href="/blog/">blog</Link>.
                </li>
                <li>
                  <strong>18+ only:</strong> this site is for adults. We
                  don&apos;t respond to enquiries from anyone under 18.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <JsonLd graph={[breadcrumbLd(crumbs), webPageLd("ContactPage", page)]} />
    </PageShell>
  );
}

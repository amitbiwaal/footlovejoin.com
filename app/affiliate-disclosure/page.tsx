import Link from "next/link";
import PageShell, { ProseSection } from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbLd, webPageLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const page = {
  title: "Affiliate Disclosure & Disclaimer",
  description:
    "How footlovejoin.com earns money: our sign-up buttons are affiliate links to a third-party marketplace. Plus our earnings and advice disclaimers.",
  path: "/affiliate-disclosure/",
};

export const metadata = buildMetadata(page);

const crumbs = [{ name: "Affiliate Disclosure", path: page.path }];

export default function AffiliateDisclosurePage() {
  return (
    <PageShell
      crumbs={crumbs}
      eyebrow="Legal"
      title="Affiliate Disclosure & Disclaimer"
      intro="We believe you should know exactly how this website makes money and how to read the numbers on it."
      updated={SITE.legalUpdated}
    >
      <ProseSection>
        <h2>How this site earns money</h2>
        <p>
          The sign-up buttons and links on footlovejoin.com — such as
          &ldquo;Sell Feet Pics&rdquo;, &ldquo;Start selling&rdquo;, and
          &ldquo;Join&rdquo; — are <strong>affiliate links</strong>. They take
          you to a third-party marketplace where adults can open a seller
          account. If you create an account after clicking one of our links, we
          may receive a commission from that platform.
        </p>
        <ul>
          <li>
            <strong>It costs you nothing extra.</strong> You pay the same
            whether or not you arrive through our link.
          </li>
          <li>
            <strong>Your account is not with us.</strong> Registration,
            verification, content, buyers, fees, and payouts are all handled by
            the third-party platform under its own terms.
          </li>
          <li>
            <strong>Links are labelled for search engines.</strong> Our
            affiliate links carry the <code>rel=&quot;sponsored&quot;</code>{" "}
            attribute.
          </li>
        </ul>
        <p>
          This disclosure is made in line with the U.S. Federal Trade
          Commission&apos;s guidance on endorsements and similar rules
          elsewhere.
        </p>

        <h2>Earnings disclaimer</h2>
        <p>
          Earnings figures, price ranges, statistics, ratings, and
          testimonials shown on this website are{" "}
          <strong>illustrative examples only</strong>. They do not represent
          typical or guaranteed results. Income from selling feet content
          varies widely and depends on your effort, consistency, content
          quality, pricing, and buyer demand. Many new sellers earn little, and
          some earn nothing, especially at the start.
        </p>

        <h2>Information, not advice</h2>
        <p>
          Our guides are general information. They are not legal, tax, or
          financial advice, and they may not reflect the rules where you live.
          Platform features, fees, and payout terms also change — always
          confirm the current details on the platform itself before you rely on
          them.
        </p>

        <h2>Adults only</h2>
        <p>
          This website and the platform it links to are for adults aged 18 or
          over. See our{" "}
          <Link href="/2257-compliance/">18+ &amp; 2257 compliance statement</Link>
          .
        </p>

        <h2>Questions</h2>
        <p>
          If anything here is unclear, email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or use the{" "}
          <Link href="/contact/">contact page</Link>.
        </p>
      </ProseSection>

      <JsonLd graph={[breadcrumbLd(crumbs), webPageLd("WebPage", page)]} />
    </PageShell>
  );
}

import Link from "next/link";
import PageShell, { ProseSection } from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbLd, webPageLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const page = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use footlovejoin.com: 18+ eligibility, how our guides and affiliate links work, earnings disclaimers, and acceptable use.",
  path: "/terms/",
};

export const metadata = buildMetadata(page);

const crumbs = [{ name: "Terms of Service", path: page.path }];

export default function TermsPage() {
  return (
    <PageShell
      crumbs={crumbs}
      eyebrow="Legal"
      title="Terms of Service"
      intro="Please read these terms before using this website. By using footlovejoin.com you agree to them."
      updated={SITE.legalUpdated}
    >
      <ProseSection>
        <h2>1. About these terms</h2>
        <p>
          These terms govern your use of footlovejoin.com (&ldquo;Foot Love
          Join&rdquo;, the &ldquo;site&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;). If you do not agree with them, please do not use
          the site.
        </p>

        <h2>2. Adults only</h2>
        <p>
          This site discusses the sale of adult-oriented feet content and is
          intended solely for people who are at least 18 years old, or the age
          of majority where they live, whichever is higher. By using the site
          you confirm that you meet this requirement and that viewing this
          material is lawful where you are.
        </p>

        <h2>3. What this site provides</h2>
        <p>
          The site provides general information and guides about selling feet
          content, and links to a third-party marketplace where adults can
          create a seller account. We do not host seller accounts, process
          payments, or deliver content on this site.
        </p>
        <p>
          If you sign up through one of our links, your account and everything
          you do with it are governed by that platform&apos;s own terms,
          policies, fees, and verification requirements. Check them on the
          platform before relying on anything described here — they change over
          time, and the platform&apos;s current terms always take priority over
          our descriptions.
        </p>

        <h2>4. Affiliate relationship</h2>
        <p>
          Sign-up links on this site are affiliate links, and we may earn a
          commission when you register through them. See our{" "}
          <Link href="/affiliate-disclosure/">affiliate disclosure</Link>.
        </p>

        <h2>5. No guarantee of earnings</h2>
        <p>
          Any earnings figures, price ranges, statistics, ratings, and
          testimonials on this site are illustrative examples only. They are
          not typical results and not a promise of income. What a seller earns
          depends on their own effort, content, pricing, and demand, and many
          new sellers earn little or nothing at first.
        </p>

        <h2>6. Not professional advice</h2>
        <p>
          Content on this site is general information, not legal, tax, or
          financial advice. Laws and tax rules differ by country and change
          over time. You are responsible for complying with the laws that apply
          to you, including reporting and paying tax on your income; speak to a
          qualified professional if you are unsure.
        </p>

        <h2>7. Acceptable use</h2>
        <p>When using this site, you agree not to:</p>
        <ul>
          <li>use it if you are under 18;</li>
          <li>use it for any unlawful purpose;</li>
          <li>
            copy, scrape, or republish substantial parts of the site without
            our written permission;
          </li>
          <li>
            attempt to disrupt, damage, or gain unauthorised access to the site
            or its hosting.
          </li>
        </ul>

        <h2>8. Intellectual property</h2>
        <p>
          The text, design, graphics, and logos on this site belong to us or
          our licensors and are protected by intellectual-property laws. You
          may view the site and share links to it for personal, non-commercial
          use. Third-party names and trademarks belong to their respective
          owners.
        </p>
        <p>
          If you believe something on this site infringes your rights, tell us
          through the <Link href="/contact/">contact page</Link> and we will
          look into it.
        </p>

        <h2>9. Third-party links</h2>
        <p>
          The site links to websites we do not control. We are not responsible
          for their content, security, or practices, and a link is not an
          endorsement of everything on the destination.
        </p>

        <h2>10. Disclaimer and limitation of liability</h2>
        <p>
          The site is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;. We work to keep the information accurate and
          current but make no warranties that it is complete, error-free, or
          suitable for your circumstances. To the fullest extent permitted by
          law, we are not liable for any loss or damage arising from your use
          of the site, your reliance on its content, or your dealings with any
          third-party platform. Nothing in these terms limits liability that
          cannot be limited by law.
        </p>

        <h2>11. Changes</h2>
        <p>
          We may update these terms from time to time. The &ldquo;Last
          updated&rdquo; date at the top shows the latest revision, and
          continuing to use the site means you accept the current version.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      </ProseSection>

      <JsonLd graph={[breadcrumbLd(crumbs), webPageLd("WebPage", page)]} />
    </PageShell>
  );
}

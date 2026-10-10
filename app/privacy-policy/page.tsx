import Link from "next/link";
import PageShell, { ProseSection } from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbLd, webPageLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const page = {
  title: "Privacy Policy",
  description:
    "How Foot Love Join (footlovejoin.com) handles data: what this website collects, how analytics and affiliate links work, and the choices and rights you have.",
  path: "/privacy-policy/",
};

export const metadata = buildMetadata(page);

const crumbs = [{ name: "Privacy Policy", path: page.path }];

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      crumbs={crumbs}
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy explains what information this website collects when you visit, why, and what you can do about it."
      updated={SITE.legalUpdated}
    >
      <ProseSection>
        <h2>1. Who we are</h2>
        <p>
          This website, footlovejoin.com (&ldquo;Foot Love Join&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;), publishes guides about selling
          feet content and links to a third-party marketplace where adults can
          open a seller account. You can reach us at{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <p>
          This website is intended only for adults aged 18 or over. We do not
          knowingly collect information from anyone under 18.
        </p>

        <h2>2. What this website does not collect</h2>
        <p>
          You cannot create an account, upload content, or make a payment on
          this website. We do not ask for your name, identity documents, or
          payment details here. All of that happens on the third-party
          marketplace our sign-up links lead to, under that platform&apos;s own
          privacy policy (see section 5).
        </p>

        <h2>3. Information we do collect</h2>
        <h3>Analytics data</h3>
        <p>
          We use Google Analytics 4 to understand how visitors use the site —
          for example which pages are read and which links are clicked. Google
          Analytics uses cookies and similar identifiers and collects
          information such as pages viewed, approximate location (country or
          city level), device and browser type, and the site that referred you.
          We use this data in aggregate; we do not use it to identify you
          personally.
        </p>
        <h3>Server logs</h3>
        <p>
          Like almost every website, our hosting provider automatically records
          technical request data — IP address, browser user agent, the page
          requested, and the time of the request — to keep the service secure
          and working.
        </p>
        <h3>Emails you send us</h3>
        <p>
          If you email us, we receive your email address and whatever you
          choose to include in your message, and we use it to reply to you.
        </p>

        <h2>4. Cookies</h2>
        <p>
          The cookies set through this website come from Google Analytics. You
          can block or delete cookies in your browser settings, and you can
          opt out of Google Analytics across all websites with Google&apos;s{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener"
          >
            Analytics opt-out browser add-on
          </a>
          . The site works normally without these cookies.
        </p>

        <h2>5. Affiliate links and third-party platforms</h2>
        <p>
          Sign-up buttons on this website are affiliate links. When you click
          one you leave footlovejoin.com and arrive at a third-party
          marketplace. The link carries a referral identifier so that the
          platform can attribute your visit to us, and that platform may set
          its own cookies. Anything you do there — creating an account,
          verifying your identity, uploading content, receiving payouts — is
          governed by that platform&apos;s terms and privacy policy, not this
          one. We do not receive your account details, identity documents, or
          payment information. See our{" "}
          <Link href="/affiliate-disclosure/">affiliate disclosure</Link> for
          more.
        </p>

        <h2>6. How we use information</h2>
        <ul>
          <li>To operate, secure, and maintain the website.</li>
          <li>To understand which content is useful and improve it.</li>
          <li>To measure how our referral links perform.</li>
          <li>To respond to messages you send us.</li>
        </ul>
        <p>
          Where data-protection law requires a legal basis, we rely on our
          legitimate interest in running and improving the website, on your
          consent where the law requires it, and on legal obligations where
          they apply. We do not sell your personal information.
        </p>

        <h2>7. Who we share information with</h2>
        <p>
          We share information only with the service providers that help us run
          the site — our hosting provider and Google (analytics) — and with
          authorities when the law requires it. These providers may process
          data in countries other than your own.
        </p>

        <h2>8. How long we keep it</h2>
        <p>
          Analytics data is kept for the retention period configured in our
          Google Analytics account, server logs for the period set by our
          hosting provider, and emails for as long as needed to handle your
          enquiry and keep reasonable records.
        </p>

        <h2>9. Your rights</h2>
        <p>
          Depending on where you live (for example the EEA, the UK, or
          California), you may have the right to access, correct, delete, or
          restrict the use of your personal information, to object to certain
          processing, and to complain to your local data-protection authority.
          To make a request, email{" "}
          <a href={`mailto:${SITE.email}?subject=Privacy%20request`}>
            {SITE.email}
          </a>
          .
        </p>

        <h2>10. Changes to this policy</h2>
        <p>
          We may update this policy as the site changes. The &ldquo;Last
          updated&rdquo; date at the top shows when it was last revised.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or visit our{" "}
          <Link href="/contact/">contact page</Link>.
        </p>
      </ProseSection>

      <JsonLd graph={[breadcrumbLd(crumbs), webPageLd("WebPage", page)]} />
    </PageShell>
  );
}

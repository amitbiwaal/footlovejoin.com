import Link from "next/link";
import PageShell, { ProseSection } from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, breadcrumbLd, webPageLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

const page = {
  title: "18+ & 2257 Compliance Statement",
  description:
    "Foot Love Join is an adults-only website. Read our 18+ policy and our statement regarding 18 U.S.C. § 2257 record-keeping requirements.",
  path: "/2257-compliance/",
};

export const metadata = buildMetadata(page);

const crumbs = [{ name: "18+ & 2257 Compliance", path: page.path }];

export default function CompliancePage() {
  return (
    <PageShell
      crumbs={crumbs}
      eyebrow="Legal"
      title="18+ & 2257 Compliance Statement"
      intro="This website is for adults only. This page explains our age policy and how record-keeping requirements apply."
      updated={SITE.legalUpdated}
    >
      <ProseSection>
        <h2>Adults only (18+)</h2>
        <p>
          footlovejoin.com is intended solely for individuals who are at least
          18 years old, or the age of majority in their jurisdiction, whichever
          is higher. If you are under that age, you must leave this website.
        </p>
        <p>
          Selling feet content is something only adults may do. Nobody under 18
          may sell, appear in, or purchase such content, and nothing on this
          website should be read as encouraging otherwise.
        </p>

        <h2>No user-uploaded content on this website</h2>
        <p>
          This website does not offer accounts and does not accept, host, or
          sell user-uploaded photos or videos. Creator content is uploaded and
          sold on the third-party marketplace that our sign-up links lead to.
          That platform operates its own age- and identity-verification process
          for creators and is responsible for the content on its service and
          for any records it is required to keep.
        </p>

        <h2>18 U.S.C. § 2257 statement</h2>
        <p>
          The images displayed on this website are non-explicit promotional
          and illustrative images. They do not contain visual depictions of
          actual sexually explicit conduct as defined in 18 U.S.C. § 2256, and
          are therefore exempt from the record-keeping requirements of 18
          U.S.C. § 2257 and 28 C.F.R. Part 75.
        </p>
        <p>
          For content hosted on a third-party platform, record-keeping
          enquiries should be directed to the operator of that platform.
        </p>

        <h2>Reporting a concern</h2>
        <p>
          If you believe any image or text on this website depicts or involves
          a minor, infringes your rights, or was published without consent,
          contact us immediately at{" "}
          <a href={`mailto:${SITE.email}?subject=Content%20report`}>
            {SITE.email}
          </a>{" "}
          so we can review and remove it. You can also use the{" "}
          <Link href="/contact/">contact page</Link>.
        </p>
      </ProseSection>

      <JsonLd graph={[breadcrumbLd(crumbs), webPageLd("WebPage", page)]} />
    </PageShell>
  );
}

import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBanner from "@/components/CtaBanner";

import GuideHero from "@/components/guide/GuideHero";
import GuideSteps, { STEPS } from "@/components/guide/GuideSteps";
import GuideWhatYouNeed from "@/components/guide/GuideWhatYouNeed";
import GuideWhereToSell from "@/components/guide/GuideWhereToSell";
import GuideWhatYouGet from "@/components/guide/GuideWhatYouGet";
import GuideStyles from "@/components/guide/GuideStyles";
import GuideEarnings from "@/components/guide/GuideEarnings";
import GuidePricing from "@/components/guide/GuidePricing";
import GuideSafety from "@/components/guide/GuideSafety";
import GuideLegal from "@/components/guide/GuideLegal";
import GuideCountries from "@/components/guide/GuideCountries";
import GuideFaq, { GUIDE_FAQS } from "@/components/guide/GuideFaq";

const siteUrl = "https://footlovejoin.com";
const pageUrl = `${siteUrl}/how-to-sell-feet-pics/`;

// The root layout appends " | Foot Love" via its title template.
const title = "How to Sell Feet Pics: 2026 Step-by-Step Playbook";
const description =
  "Everything on how to sell feet pics in 2026: realistic earnings, safe platforms, pricing that doesn't undersell, and privacy tips. Beginner-friendly, free to start.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "how to sell feet pics",
    "how to sell feet pictures online",
    "where to sell feet pics",
    "sell feet pics for beginners",
    "sell feet pics anonymously",
    "how much do feet pics sell for",
    "how much can you earn selling feet pics",
    "is it legal to sell feet pics",
    "sell feet pics safely",
    "sell feet pics for free",
  ],
  alternates: {
    canonical: "/how-to-sell-feet-pics/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    siteName: "Foot Love",
    locale: "en_US",
    title: `${title} | Foot Love`,
    description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "How to sell feet pics — the beginner's playbook",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Foot Love`,
    description,
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        {
          "@type": "ListItem",
          position: 2,
          name: "How to Sell Feet Pics",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: "How to Sell Feet Pics: 2026 Step-by-Step Playbook",
      description,
      inLanguage: "en",
      mainEntityOfPage: pageUrl,
      image: `${siteUrl}/og-image.jpg`,
      datePublished: "2026-08-06",
      dateModified: "2026-08-06",
      author: { "@id": `${siteUrl}/#organization` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "HowTo",
      "@id": `${pageUrl}#howto`,
      name: "How to Sell Feet Pics in 4 Steps",
      step: STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.schemaText,
        url: `${pageUrl}#steps`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: GUIDE_FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function HowToSellFeetPicsPage() {
  return (
    <>
      <Header />
      <main>
        <GuideHero />
        <GuideSteps />
        <GuideWhatYouNeed />
        <GuideWhereToSell />
        <GuideWhatYouGet />

        <CtaBanner
          eyebrow="No equipment needed"
          title="The Photos Are Already on Your Phone"
          subtitle="There's nothing to buy and no perfect moment to wait for. Open a free, anonymous profile and turn shots you can take tonight into income."
          primary="Get started free"
        />

        <GuideStyles />
        <GuideEarnings />
        <GuidePricing />
        <GuideSafety />
        <GuideLegal />
        <GuideCountries />
        <GuideFaq />

        <CtaBanner
          id="start"
          eyebrow="Your feet, your income"
          title="Ready to Start Selling Feet Pics?"
          subtitle="Set up a free, anonymous Foot Love profile in minutes, upload your first set, and start earning from verified buyers — privacy protected from the first click to the payout."
          primary="Join Foot Love"
          note="Free to join · Verify in minutes · Stay anonymous"
        />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

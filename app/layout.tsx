import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_NOINDEX } from "@/lib/site";

const siteUrl = "https://footlovejoin.com";
const gaId = "G-Z50LS4SRBF";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Foot Love - #1 App & Website to Sell Feet Pics 2026",
    template: "%s | Foot Love",
  },
  description:
    "Foot Love: Is it the best app to sell feet pics? We tested its features, fees, verification, earning potential, safety, pros, cons, and top alternatives.",
  keywords: [
    "sell feet pics",
    "sell feet pics online",
    "sell feet pictures online",
    "selling feet pics",
    "feet pics for sale",
    "how to sell feet pics",
    "where to sell feet pics",
    "feet selling app",
    "feet selling website",
    "sell feet pics for money",
    "sell feet pics for free",
    "sell feet pics anonymously",
  ],
  authors: [{ name: "Foot Love" }],
  // No canonical here: it would be inherited by every page. Each page sets its own.
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Foot Love",
    locale: "en_US",
    title: "Foot Love - #1 App & Website to Sell Feet Pics 2026",
    description:
      "Foot Love: Is it the best app to sell feet pics? We tested its features, fees, verification, earning potential, safety, pros, cons, and top alternatives.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Foot Love — sell feet pics online safely to verified buyers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foot Love - #1 App & Website to Sell Feet Pics 2026",
    description:
      "Foot Love: Is it the best app to sell feet pics? We tested its features, fees, verification, earning potential, safety, pros, cons, and top alternatives.",
    images: ["/og-image.jpg"],
  },
  robots: SITE_NOINDEX
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
  verification: {
    google: "rX49LvCRu4uRf23klIcdEuKSKWz1Yc_ulzkgYsV2jc8",
  },
  manifest: "/site.webmanifest",
  other: { rating: "adult" },
};

export const viewport: Viewport = {
  themeColor: "#0E0D12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Foot Love",
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
      },
      description:
        "Foot Love is a safe, anonymous online marketplace and app where verified adult creators sell feet pics and videos to thousands of verified buyers.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Foot Love",
      description:
        "Sell feet pics online safely to 5,000+ verified buyers. 100% anonymous, low fees, fast payouts.",
      inLanguage: "en-US",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaId}');
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

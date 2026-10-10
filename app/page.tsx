import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import SocialProof from "@/components/SocialProof";
import BuyersDemand from "@/components/BuyersDemand";
import MediaCoverage from "@/components/MediaCoverage";
import HowItWorks from "@/components/HowItWorks";
import CtaBanner from "@/components/CtaBanner";
import WhyChoose from "@/components/WhyChoose";
import LegitSafe from "@/components/LegitSafe";
import Categories from "@/components/Categories";
import Benefits from "@/components/Benefits";
import Faq, { FAQS } from "@/components/Faq";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { faqLd } from "@/lib/seo";

// Title, description and Open Graph come from the root layout defaults.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Gallery />
        <SocialProof />
        <BuyersDemand />
        <MediaCoverage />
        <HowItWorks />

        <CtaBanner
          id="start"
          eyebrow="Join Foot Love free"
          title="Ready to sell feet pictures? Join Foot Love today"
          subtitle="Create your free account in minutes and start earning from the feet content you already have. No fees to start, and no face required."
          primary="Start selling — it's free"
          secondary="Read the FAQ"
        />

        <WhyChoose />
        <LegitSafe />
        <Categories />
        <Benefits />

        <CtaBanner
          eyebrow="Your feet, your income"
          title="Ready to start selling feet pics on Foot Love?"
          subtitle="Thousands of creators are already earning on Foot Love. Your first sale could be today — join the #1 feet-selling platform now."
          primary="Create your free account"
        />

        <Faq />
      </main>
      <Footer />

      <JsonLd graph={[faqLd("/", FAQS)]} />
    </>
  );
}

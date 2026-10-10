import FaqAccordion, { type FaqItem } from "./FaqAccordion";

export const FAQS: FaqItem[] = [
  {
    q: "What is Foot Love?",
    a: "Foot Love is an online marketplace where you can sell feet pics and videos to thousands of verified buyers. It works as both a feet pics app and a website, giving creators a safe, anonymous place to sell feet pictures online and get paid fast — no matter where you are.",
  },
  {
    q: "Is selling feet pics legal?",
    a: "Yes. Selling feet pics is completely legal for anyone aged 18 or over. Foot Love verifies every creator's age and identity so the community stays genuine and compliant, and your content, payments, and personal details stay private.",
  },
  {
    q: "How much can I make selling feet pics?",
    a: "It varies. Many creators make a few hundred dollars a month from feet pics for sale, while top sellers earn several thousand. You set your own prices for single photos, custom sets, and video clips, and keep the majority of every sale — so how much you make is largely up to you.",
  },
  {
    q: "Do I have to show my face to sell feet pics?",
    a: "No. You can sell feet pics anonymously on Foot Love. No real name and no face are ever required, so your identity stays private while you sell feet pictures online.",
  },
  {
    q: "Where can I sell feet pics online?",
    a: "Foot Love is one of the best places to sell feet pics online. Instead of juggling several feet selling apps, websites, and sites, you list once, reach verified buyers, and manage everything — messages, custom requests, and payouts — in one place.",
  },
  {
    q: "How do I start selling feet pics for free?",
    a: "Create your free Foot Love account in minutes, upload your feet pics and videos, set your prices, and start selling. There's no sign-up fee, so you can start selling feet pics for free with just your phone — you only ever share a small, transparent fee when you make a sale.",
  },
  {
    q: "What feet content can I sell on Foot Love?",
    a: "You can sell soles and arches close-ups, painted toenails and pedicure sets, barefoot and high-heel shots, sandal and beach-and-sand themed sets, custom personalized requests, and short video clips. If it fits your style, there's a buyer for it.",
  },
  {
    q: "How do I get paid for selling feet pics?",
    a: "You withdraw your earnings quickly to your preferred payout method. Payments are private and discreet, with low fees, so you keep more of every feet pic you sell.",
  },
  {
    q: "Is my privacy protected when I sell feet pics?",
    a: "Yes. Discreet billing, encrypted data, and private uploads keep your personal information hidden from buyers. Watermarking and takedown support protect your content, so you can sell feet pics anonymously and safely.",
  },
  {
    q: "Can men sell feet pics too?",
    a: "Absolutely. There's steady demand for men's feet pics for sale on Foot Love. The process is identical: create a free account, upload your feet pictures, and sell to verified buyers anonymously.",
  },
  {
    q: "What is the best app or website to sell feet pics?",
    a: "Foot Love is built specifically for selling feet content, which makes it one of the best feet pic selling websites and apps available. Verified buyers, content protection, low fees, and fast payouts are all built in — so you don't have to piece together several tools.",
  },
  {
    q: "How much does it cost to join Foot Love?",
    a: "Joining Foot Love is free. There's no cost to create an account and list your first feet pics for sale — you only ever share a small, transparent fee when you make a sale.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">FAQ</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Selling feet pics on Foot Love —{" "}
            <span className="text-gradient">your questions answered</span>
          </h2>
          <p className="mt-4 text-ink-muted">
            Everything you need to know before you start earning on Foot Love.
          </p>
        </div>

        <div className="mt-12">
          <FaqAccordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}

import FaqAccordion, { type FaqItem } from "../FaqAccordion";

export const GUIDE_FAQS: FaqItem[] = [
  {
    q: "Can you actually make money selling feet pics?",
    a: "You can, but think side income earned through effort, not a jackpot. Early on many sellers make little and some make nothing, while those who post consistently and promote themselves build toward steady monthly earnings. The people who treat it like a small business are the ones who see results.",
  },
  {
    q: "How much do feet pics sell for?",
    a: "Single shots usually go for about $5–$20+, bundles $15–$60, clips $10–$100+, and customs at two to three times your base rate. A subscription ($10–$25/month) layers on recurring income. Every figure depends on quality, niche, and demand, so treat them as ranges.",
  },
  {
    q: "Where can I sell feet pics?",
    a: "Use a purpose-built, verified feet-content marketplace where buyers already gather and payments stay on-platform — that's safer than chasing sales in social DMs. Prioritize verified buyers, built-in discovery, secure payouts, and privacy tools.",
  },
  {
    q: "Can guys or men sell feet pics?",
    a: "Absolutely. There's genuine demand for male feet, and it's a category buyers filter for. The way you set up and protect yourself is identical no matter your gender.",
  },
  {
    q: "How do I sell feet pics without getting scammed?",
    a: "Live by one rule: money first, content second, and never move off the platform. Dismiss fake payment screenshots, \"unlock fee\" requests, and anyone steering you to Cash App or Telegram. Keep everything in the platform's payment system and report red flags.",
  },
  {
    q: "How do I sell feet pics anonymously?",
    a: "Adopt a stage name unconnected to your real accounts, keep your face out of shots, remove identifying details from the frame, strip file metadata, and watermark previews. Run a separate email and socials, and use regional blocking if it's available.",
  },
  {
    q: "Can I sell feet pics for free, with no subscription?",
    a: "On many platforms you can create a seller profile at no cost and only pay a cut when a sale happens, so there's nothing to spend up front. Always double-check a platform's live fees and payout terms before you commit.",
  },
  {
    q: "Is it illegal to sell feet pics?",
    a: "For adults 18 and over selling their own foot photos, it's legal in the US, UK, and most countries, since feet pictures aren't explicit content. You must be able to verify you're 18+, and the earnings are taxable.",
  },
  {
    q: "What kind of feet pics sell best?",
    a: "Painted pedicures, clean soles and arches, hosiery and socks, feet in heels or sneakers, and themed or custom work tend to move best. Commit to one or two looks, shoot them well, and let a clear niche become your calling card.",
  },
  {
    q: "How do I actually get paid?",
    a: "Your earnings collect in your account and pay out to your bank on the platform's schedule. Buyers check out through secure payments, never see who you are, and their statement usually shows a discreet descriptor rather than anything obvious.",
  },
];

export default function GuideFaq() {
  return (
    <section
      id="faq"
      className="border-y border-white/10 bg-bg-soft/60 py-16 sm:py-24"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Straight Answers</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How to Sell Feet Pics —{" "}
            <span className="text-gradient">Frequently Asked Questions</span>
          </h2>
        </div>

        <div className="mt-12">
          <FaqAccordion items={GUIDE_FAQS} />
        </div>
      </div>
    </section>
  );
}

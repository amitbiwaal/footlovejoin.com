import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt — a plain-language site summary for AI crawlers; lists every published post. */
export function GET() {
  const posts = getPublishedPosts();

  const blogLines = posts.length
    ? posts
        .map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}/`)}): ${p.excerpt}`)
        .join("\n")
    : "- No articles published yet.";

  const body = `# Foot Love

> Foot Love (https://footlovejoin.com) is a premium, safe, and anonymous online marketplace and app where verified adult creators (18+) sell feet photos and short videos to thousands of verified buyers. Creators keep full control of their content, stay anonymous, pay low transparent fees, and get paid fast.

Foot Love is built specifically for buying and selling feet content. It works as both a website and an app, giving creators one place to list feet pics and videos, take custom requests, message buyers securely, and withdraw earnings privately. Selling feet pics is legal for adults aged 18 or older; every creator is age- and identity-verified, and every buyer is screened.

## Key facts
- Audience: adults 18+ only; all creators and buyers are verified.
- What creators sell: feet photos, custom sets, and short video clips — soles, arches, painted toenails, pedicures, high heels, barefoot, sandals, beach & sand, and custom personalized requests.
- Anonymity: no real name or face required; sell feet pics 100% anonymously.
- Payments: low, transparent fees; fast, private, discreet payouts.
- Safety: watermarking, secure delivery, screenshot deterrents, and takedown support protect creator content.
- Cost to join: free to sign up and list; a small, transparent fee applies only when a sale is made.
- Sign-up links on footlovejoin.com are affiliate links to a third-party marketplace, where accounts, verification, sales, and payouts are handled.

## Pages
- [Home / Landing page](https://footlovejoin.com/): how Foot Love works, categories, seller benefits, trust & safety, and FAQ.
- [How to Sell Feet Pics](https://footlovejoin.com/how-to-sell-feet-pics/): step-by-step beginner's guide — the 4-step process, what you need to start, a first-shoot checklist, the styles buyers search for, typical price ranges and realistic earnings, pricing strategy, safety and anonymity rules, legal and tax basics, and country-specific notes for the USA, UK, Australia, and Canada.
- [Blog](https://footlovejoin.com/blog/): tips and guides on photography, pricing, anonymity, and avoiding scams.
- [About](https://footlovejoin.com/about/): what Foot Love Join is, who it's for, and how it works.
- [Contact](https://footlovejoin.com/contact/): how to reach the team.

## Blog articles
${blogLines}

## Common topics Foot Love answers
- How to sell feet pics online (and how to start for free)
- Where to sell feet pics safely and anonymously
- How much you can make selling feet pics
- Whether selling feet pics is legal (yes, for adults 18+)
- Selling feet pics without showing your face
- Whether men can sell feet pics (yes)

## Policies
- [Privacy Policy](https://footlovejoin.com/privacy-policy/)
- [Terms of Service](https://footlovejoin.com/terms/)
- [Affiliate Disclosure & Disclaimer](https://footlovejoin.com/affiliate-disclosure/)
- [18+ & 2257 Compliance Statement](https://footlovejoin.com/2257-compliance/)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

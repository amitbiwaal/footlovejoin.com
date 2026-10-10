import Link from "next/link";
import { LEGAL_NAV, MAIN_NAV } from "@/lib/site";

const linkClass = "inline-block py-1.5 text-ink-muted transition-colors hover:text-ink";
const inlineLinkClass = "underline underline-offset-2 transition-colors hover:text-ink";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-soft/80">
      <div className="container-x py-14">
        {/* Site + legal links */}
        <nav
          aria-label="Footer"
          className="mx-auto mb-10 max-w-3xl space-y-1 border-b border-white/10 pb-10 text-sm"
        >
          <ul className="flex flex-wrap justify-center gap-x-6 font-medium">
            {MAIN_NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkClass}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap justify-center gap-x-6">
            {LEGAL_NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkClass}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mx-auto max-w-3xl space-y-4 text-center text-xs leading-relaxed text-ink-faint sm:text-sm">
          <p>
            <strong>18+ Adults Only.</strong> Foot Love is an adults-only
            platform intended solely for individuals who are at least 18 years
            of age (or the age of majority in their jurisdiction). By accessing
            this website you confirm that you are 18 or older. All creators are
            age- and identity-verified as 18+, and all content is created and
            sold by independent, consenting adults in compliance with applicable
            record-keeping requirements (18 U.S.C. § 2257).
          </p>
          <p>
            Foot Love is an online marketplace that connects independent
            creators with verified buyers of feet photos and videos. Creators
            set their own prices and operate independently; Foot Love does not
            guarantee any specific level of income. Earnings figures,
            statistics, ratings, and testimonials shown on this page are
            illustrative examples only and do not represent typical or
            guaranteed results.
          </p>
          <p>
            Nothing on this website constitutes legal, financial, or tax advice.
            Use of Foot Love is subject to our{" "}
            <Link href="/terms/" className={inlineLinkClass}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy/" className={inlineLinkClass}>
              Privacy Policy
            </Link>
            . Sign-up links on this site are affiliate links — see our{" "}
            <Link href="/affiliate-disclosure/" className={inlineLinkClass}>
              Affiliate Disclosure
            </Link>
            . All trademarks, names, and content are the property of their
            respective owners.
          </p>
          <p className="text-ink-muted">
            © 2026 Foot Love. All rights reserved. 18+ only.
          </p>
        </div>
      </div>
    </footer>
  );
}

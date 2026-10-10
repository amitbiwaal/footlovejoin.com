import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import type { Crumb } from "@/lib/seo";
import { formatDate } from "@/lib/site";

type Props = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** ISO date shown as "Last updated …" (legal pages). */
  updated?: string;
  children: React.ReactNode;
};

/** Header + breadcrumb/title hero + footer for the simple content pages. */
export default function PageShell({
  crumbs,
  eyebrow,
  title,
  intro,
  updated,
  children,
}: Props) {
  return (
    <>
      <Header />
      <main>
        <section className="pt-10 sm:pt-14">
          <div className="container-x">
            <div className="mx-auto max-w-3xl">
              <Breadcrumbs crumbs={crumbs} />
              {eyebrow && <span className="eyebrow mt-6">{eyebrow}</span>}
              <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                {title}
              </h1>
              {intro && (
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                  {intro}
                </p>
              )}
              {updated && (
                <p className="mt-4 text-sm text-ink-faint">
                  Last updated:{" "}
                  <time dateTime={updated}>{formatDate(updated)}</time>
                </p>
              )}
            </div>
          </div>
        </section>

        {children}
      </main>
      <Footer />
    </>
  );
}

/** Readable text column used by the legal/about pages. */
export function ProseSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="pb-16 pt-10 sm:pb-24">
      <div className="container-x">
        <div className="prose-article mx-auto max-w-3xl">{children}</div>
      </div>
    </section>
  );
}

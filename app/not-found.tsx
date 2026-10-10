import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

const LINKS = [
  { label: "How to Sell Feet Pics", href: "/how-to-sell-feet-pics/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28">
          <div className="container-x">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-7xl font-black tracking-tight text-gradient sm:text-8xl">
                404
              </p>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                This page took a wrong step
              </h1>
              <p className="mt-4 text-ink-muted">
                The page you&apos;re looking for doesn&apos;t exist or has
                moved. Try one of these instead.
              </p>

              <div className="mt-8 flex justify-center">
                <Link href="/" className="btn-primary">
                  Back to home
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="btn-ghost">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

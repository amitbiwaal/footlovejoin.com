"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Close, Footprint, ArrowRight } from "./Icons";
import { AFFILIATE_LINK_PROPS } from "./affiliate";
import { MAIN_NAV } from "@/lib/site";

// "/blog/" stays highlighted on "/blog/some-post/"; "/" only on the homepage.
const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the mobile menu after navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" aria-label="Foot Love Join — home" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-gradient shadow-glow">
            <Footprint className="h-5 w-5 text-[#2a0f0a]" />
          </span>
          <span className="whitespace-nowrap text-lg font-extrabold leading-none tracking-tight">
            Foot Love <span className="text-gradient">Join</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {MAIN_NAV.map((n) => {
            const active = isActive(pathname, n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-ink ${
                  active ? "bg-white/5 text-ink" : "text-ink-muted"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a {...AFFILIATE_LINK_PROPS} className="btn-primary">
            Sell Feet Pics
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
        >
          {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="lg:hidden">
          <nav
            aria-label="Mobile"
            className="container-x flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto border-t border-white/10 bg-bg/95 pb-6 pt-3 backdrop-blur-xl"
          >
            {MAIN_NAV.map((n) => {
              const active = isActive(pathname, n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-white/5 hover:text-ink ${
                    active ? "bg-white/5 text-ink" : "text-ink-muted"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <div className="mt-3">
              <a
                {...AFFILIATE_LINK_PROPS}
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Sell Feet Pics
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

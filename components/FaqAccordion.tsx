"use client";

import { useState } from "react";
import { ChevronDown } from "./Icons";

export type FaqItem = { q: string; a: string };

function Item({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-bg-card/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-semibold">{q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-coral transition-transform duration-300 ${
            open ? "rotate-180 bg-coral/10" : ""
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="mx-auto grid max-w-3xl gap-3">
      {items.map((f) => (
        <Item key={f.q} {...f} />
      ))}
    </div>
  );
}

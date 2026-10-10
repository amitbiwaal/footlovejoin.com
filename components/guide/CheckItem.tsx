import { Check } from "../Icons";

/** Gradient check bullet used by every list in the guide. */
export default function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-[#2a0f0a]">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      <span className="text-sm leading-relaxed text-ink-muted">{children}</span>
    </li>
  );
}

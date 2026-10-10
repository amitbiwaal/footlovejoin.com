import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const Star = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.9l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95L12 2.5z" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const Shield = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
    <path d="M9.5 12l1.8 1.8L15 10" />
  </svg>
);

export const Lock = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 018 0v2.5" />
  </svg>
);

export const Bolt = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z" />
  </svg>
);

export const Users = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M16 4.2a3.2 3.2 0 010 6.2M18 20c0-2.3-.9-4.4-2.4-5.7" />
  </svg>
);

export const Camera = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 8.5A2 2 0 016 6.5h1.5l1-2h5l1 2H18a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9z" />
    <circle cx="12" cy="12.5" r="3.2" />
  </svg>
);

export const Dollar = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2v20M16.5 6.5c-.8-1.3-2.4-2-4.5-2-2.8 0-4.5 1.3-4.5 3.3 0 4.6 9 2.3 9 6.9 0 2-1.9 3.3-4.9 3.3-2.3 0-4-.8-4.8-2.2" />
  </svg>
);

export const Globe = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z" />
  </svg>
);

export const Heart = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M12 20.5l-1.4-1.3C5.4 14.4 2.5 11.8 2.5 8.5 2.5 6 4.5 4 7 4c1.7 0 3.2.9 4 2.2C11.8 4.9 13.3 4 15 4c2.5 0 4.5 2 4.5 4.5 0 3.3-2.9 5.9-8.1 10.7L12 20.5z" />
  </svg>
);

// Foot / footprint — the brand mark (matches /app/icon.svg)
export const Footprint = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <ellipse cx="10.4" cy="15.6" rx="4.6" ry="5.7" />
    <circle cx="17" cy="12.8" r="1.95" />
    <circle cx="17.4" cy="8.6" r="1.6" />
    <circle cx="15" cy="6.2" r="1.5" />
    <circle cx="12" cy="5.2" r="1.3" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Play = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M8 5.5v13l11-6.5-11-6.5z" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" />
  </svg>
);

export const Eye = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Message = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1H8l-4 4V6a1 1 0 011-1z" />
  </svg>
);

export const Wallet = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 7a2 2 0 012-2h12a2 2 0 012 2v0H5a2 2 0 00-2 2v0" />
    <path d="M3 9a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <circle cx="16.5" cy="13" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
    <path d="M10.5 5.5h3" />
    <path d="M11 18.5h2" />
  </svg>
);

export const Sun = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
  </svg>
);

export const Tag = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3.5 11.2V4.5a1 1 0 011-1h6.7a1 1 0 01.7.3l8.3 8.3a1 1 0 010 1.4l-6.7 6.7a1 1 0 01-1.4 0L3.8 11.9a1 1 0 01-.3-.7z" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const Chart = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 20V4" />
    <path d="M4 20h16" />
    <path d="M8 16v-4M12.5 16V8M17 16v-6" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.3l3.3 2" />
  </svg>
);

export const Warning = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3.5l9 15.5H3l9-15.5z" />
    <path d="M12 9.5v4" />
    <circle cx="12" cy="16.4" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const Scale = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 4v16M7 20h10" />
    <path d="M4 9l4-4 4 4M4 9c0 1.9 1.8 3.2 4 3.2S12 10.9 12 9" />
    <path d="M12 9l4-4 4 4M12 9c0 1.9 1.8 3.2 4 3.2S20 10.9 20 9" />
  </svg>
);

export const Instagram = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const XSocial = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
);

export const Tiktok = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M15 4c.5 2.4 2 4 4.5 4.2M15 4v9.5a4 4 0 11-3.2-3.9" />
  </svg>
);

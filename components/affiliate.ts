// Single source of truth for the outbound affiliate destination.
// Every conversion CTA on the site points here.
export const AFFILIATE_URL =
  "https://app.feetfinder.com/affiliate/link?af_id=97c365207f4d8-615933c06e600f70fe8-024240575f3229cc-1909bce247abe2cc48";

// Spread onto any <a> that sends traffic to the affiliate link.
// rel="sponsored" is what Google requires for paid/affiliate links;
// noopener hardens the new-tab handoff.
export const AFFILIATE_LINK_PROPS = {
  href: AFFILIATE_URL,
  target: "_blank",
  rel: "sponsored noopener",
} as const;

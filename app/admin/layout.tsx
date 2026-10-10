import type { Metadata } from "next";

// The whole admin area is private: never indexed, never followed.
export const metadata: Metadata = {
  title: "Blog Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}

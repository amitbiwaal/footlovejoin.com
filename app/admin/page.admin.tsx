// Dev-only route (see `pageExtensions` in next.config.mjs): the local blog CMS.
// Open http://localhost:3000/admin/ while `npm run dev` is running.
import type { Metadata } from "next";
import AdminApp from "@/components/admin/AdminApp";

export const metadata: Metadata = {
  title: "Blog Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}

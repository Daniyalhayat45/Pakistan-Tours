import { AdminSidebar } from "@/components/admin/sidebar";
import { Toaster } from "sonner";
import "../globals.css";

// Admin pages show live, per-request data behind auth and must never be
// statically pre-rendered at build time (that would also make the build
// depend on the database being reachable at build time, which is fragile).
export const dynamic = "force-dynamic";

export const metadata = { title: "Admin | Pakistan Tourism Gateway" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AdminSidebar />
        <div className="md:pl-64">{children}</div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

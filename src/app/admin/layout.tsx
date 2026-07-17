import { AdminSidebar } from "@/components/admin/sidebar";
import { Toaster } from "sonner";
import "../globals.css";

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

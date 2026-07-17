"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, MapPin, Compass, Hotel, Car, Newspaper, Images,
  HelpCircle, GalleryHorizontal, Inbox, Users, Settings, LogOut, Mountain,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero-slides", label: "Hero Slides", icon: GalleryHorizontal },
  { href: "/admin/destinations", label: "Destinations", icon: MapPin },
  { href: "/admin/tours", label: "Tours", icon: Compass },
  { href: "/admin/hotels", label: "Hotels", icon: Hotel },
  { href: "/admin/vehicles", label: "Vehicles", icon: Car },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/10 bg-onyx text-white md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
        <Mountain className="h-6 w-6 text-gold" />
        <span className="font-display text-sm font-bold">PTG Admin</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active ? "bg-gold text-onyx font-medium" : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <l.icon className="h-4 w-4" /> {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}

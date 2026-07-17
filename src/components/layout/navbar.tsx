"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Menu, X, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/destinations`, label: t("destinations") },
    { href: `/${locale}/tours`, label: t("tours") },
    { href: `/${locale}/hotels`, label: t("hotels") },
    { href: `/${locale}/vehicles`, label: t("vehicles") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/gallery`, label: t("gallery") },
    { href: `/${locale}/faqs`, label: t("faqs") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled ? "bg-onyx/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2 text-white">
          <Mountain className="h-7 w-7 text-gold" />
          <span className="font-display text-lg font-bold tracking-wide">
            PAKISTAN <span className="text-gold">TOURISM</span> GATEWAY
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium text-white/80 transition-colors hover:text-gold",
                pathname === l.href && "text-gold"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button asChild size="sm">
            <Link href={`/${locale}/contact`}>{t("inquireNow")}</Link>
          </Button>
        </div>

        <button className="text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="bg-onyx/95 backdrop-blur-md lg:hidden">
          <nav className="container flex flex-col gap-4 py-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-white/90 hover:text-gold" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <Button asChild size="sm" className="w-full">
              <Link href={`/${locale}/contact`}>{t("inquireNow")}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

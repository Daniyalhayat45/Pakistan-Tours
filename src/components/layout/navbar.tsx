"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  // Only the home page has a dark hero image behind the navbar, so only there
  // can it start fully transparent with light text. Every other page has a
  // plain light background right at the top, so the navbar needs its solid
  // dark background from the very start there, not just after scrolling.
  const isHome = pathname === `/${locale}`;
  const solid = scrolled || !isHome;

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        solid
          ? "border-b border-gold/20 bg-onyx/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
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

        <button className="relative h-6 w-6 text-white lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={open ? "close" : "menu"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {open ? <X /> : <Menu />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative z-40 overflow-hidden bg-onyx/98 backdrop-blur-md lg:hidden"
          >
            <nav className="container flex flex-col gap-1 py-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                >
                  <Link
                    href={l.href}
                    className={cn(
                      "block rounded-md px-3 py-3.5 text-base text-white/90 transition-all active:scale-[0.98] active:bg-white/10 hover:bg-white/5 hover:text-gold",
                      pathname === l.href && "text-gold"
                    )}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-2 flex items-center justify-between px-2">
                <LanguageSwitcher />
              </div>
              <Button asChild size="sm" className="mt-2 w-full">
                <Link href={`/${locale}/contact`}>{t("inquireNow")}</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

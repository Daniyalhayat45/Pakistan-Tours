import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { Instagram, Facebook, Youtube, Mountain } from "lucide-react";
import { prisma } from "@/lib/db";
import { NewsletterForm } from "./newsletter-form";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const locale = await getLocale();
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } }).catch(() => null);

  return (
    <footer className="bg-onyx text-white/80">
      <div className="container grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Mountain className="h-7 w-7 text-gold" />
            <span className="font-display text-lg font-bold text-white">Pakistan Tourism Gateway</span>
          </div>
          <p className="text-sm">{t("tagline")}</p>
          <p className="mt-2 text-xs text-white/50">{t("since")}</p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">{t("quickLinks")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}/destinations`} className="hover:text-gold">{nav("destinations")}</Link></li>
            <li><Link href={`/${locale}/tours`} className="hover:text-gold">{nav("tours")}</Link></li>
            <li><Link href={`/${locale}/hotels`} className="hover:text-gold">{nav("hotels")}</Link></li>
            <li><Link href={`/${locale}/blog`} className="hover:text-gold">{nav("blog")}</Link></li>
            <li><Link href={`/${locale}/faqs`} className="hover:text-gold">{nav("faqs")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">{t("followUs")}</h4>
          <div className="flex gap-3">
            {settings?.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 p-2 hover:border-gold hover:text-gold">
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {settings?.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 p-2 hover:border-gold hover:text-gold">
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {settings?.youtubeUrl && (
              <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 p-2 hover:border-gold hover:text-gold">
                <Youtube className="h-4 w-4" />
              </a>
            )}
          </div>
          <div className="mt-6 space-y-1 text-sm">
            <p>{settings?.contactEmail}</p>
            <p>{settings?.contactPhone}</p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">{t("newsletter")}</h4>
          <NewsletterForm placeholder={t("newsletterPlaceholder")} label={t("subscribe")} />
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        &copy; {new Date().getFullYear()} Pakistan Tourism Gateway. {t("rights")}
      </div>
    </footer>
  );
}

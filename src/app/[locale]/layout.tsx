import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { locales, type Locale } from "@/i18n/config";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/db";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } }).catch(() => null);
  return {
    title: settings?.metaTitle || "Pakistan Tourism Gateway | Gateway to Adventure and Culture",
    description: settings?.metaDesc || "Premium curated tours across Pakistan since 2019.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();
  const dir = locale === "ur" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className={locale === "ur" ? "font-urdu" : "font-sans"}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

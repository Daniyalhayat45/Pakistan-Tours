import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { locales, type Locale } from "@/i18n/config";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/db";
import "../globals.css";

// All content here comes from the database (admin-editable) and next-intl reads
// request headers to resolve the locale, so this whole tree renders per-request
// rather than being statically pre-built. (generateStaticParams is intentionally
// omitted — combining it with force-dynamic caused a React streaming error.)
export const dynamic = "force-dynamic";

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
  setRequestLocale(locale);

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

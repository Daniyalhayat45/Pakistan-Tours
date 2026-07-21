import { Mail, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/db";
import { InquiryForm } from "@/components/shared/inquiry-form";
import { setRequestLocale } from "next-intl/server";

export const metadata = { title: "Contact | Pakistan Tourism Gateway" };

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } }).catch(() => null);
  return (
    <div className="container py-32">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-dark">Get in Touch</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Tell us what you have in mind and our team will get back to you shortly.</p>
      </div>
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 text-gold-dark" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{settings?.contactEmail}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 text-gold-dark" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">{settings?.contactPhone}</p>
            </div>
          </div>
          {settings?.address && (
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-gold-dark" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{settings.address}</p>
              </div>
            </div>
          )}
        </div>
        <div className="rounded-lg border border-border p-6 lg:col-span-2">
          <InquiryForm type="GENERAL" title="Send us a Message" />
        </div>
      </div>
    </div>
  );
}

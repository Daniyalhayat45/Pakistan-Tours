import { useTranslations } from "next-intl";
import { InquiryForm } from "@/components/shared/inquiry-form";

export function CtaSection() {
  const t = useTranslations("home");
  return (
    <section className="bg-onyx py-24 text-white">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">Get Started</p>
          <h2 className="font-display text-3xl font-bold md:text-5xl">{t("readyForAdventure")}</h2>
          <p className="mt-4 max-w-md text-white/60">{t("readySubtitle")}</p>
        </div>
        <div className="rounded-lg bg-white p-6 text-foreground md:p-8">
          <InquiryForm type="GENERAL" title={t("sendInquiry")} />
        </div>
      </div>
    </section>
  );
}

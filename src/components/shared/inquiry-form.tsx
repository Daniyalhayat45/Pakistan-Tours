"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitInquiry } from "@/app/actions/public";

type InquiryFormProps = {
  type?: "TOUR" | "HOTEL" | "VEHICLE" | "CUSTOM" | "GENERAL";
  tourId?: string;
  hotelId?: string;
  vehicleId?: string;
  title?: string;
};

export function InquiryForm({ type = "GENERAL", tourId, hotelId, vehicleId, title }: InquiryFormProps) {
  const t = useTranslations("common");
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", travelDate: "", guests: "" });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await submitInquiry({ ...form, type, tourId, hotelId, vehicleId });
      if (res.success) {
        setSubmitted(true);
        toast.success(t("inquirySuccess"));
      } else {
        toast.error(res.error || "Something went wrong.");
      }
    });
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-gold/30 bg-gold/10 p-6 text-center">
        <p className="font-medium text-gold-dark">{t("inquirySuccess")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input id="phone" required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="guests">{t("guests")}</Label>
          <Input id="guests" type="number" min={1} value={form.guests} onChange={(e) => update("guests", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="travelDate">{t("travelDate")}</Label>
          <Input id="travelDate" type="date" value={form.travelDate} onChange={(e) => update("travelDate", e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">{t("message")}</Label>
          <Textarea id="message" rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} />
        </div>
      </div>
      <Button type="submit" disabled={pending} className="w-full" size="lg">
        {t("submit")}
      </Button>
    </form>
  );
}

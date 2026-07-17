"use client";
import { updateSettings } from "@/app/actions/admin";
import { EntityForm } from "@/components/admin/entity-form";
import { Field, FieldGrid } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { SiteSettings } from "@prisma/client";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  return (
    <EntityForm action={(data) => updateSettings(data)} redirectTo="/admin/settings" submitLabel="Save Settings">
      <FieldGrid>
        <Field label="Site Name" name="siteName"><Input name="siteName" defaultValue={settings.siteName} required /></Field>
        <Field label="Contact Email" name="contactEmail"><Input name="contactEmail" type="email" defaultValue={settings.contactEmail} required /></Field>
        <Field label="Contact Phone" name="contactPhone"><Input name="contactPhone" defaultValue={settings.contactPhone} required /></Field>
        <Field label="WhatsApp Number" name="whatsapp"><Input name="whatsapp" defaultValue={settings.whatsapp ?? ""} /></Field>
        <Field label="Instagram URL" name="instagramUrl"><Input name="instagramUrl" defaultValue={settings.instagramUrl ?? ""} /></Field>
        <Field label="Facebook URL" name="facebookUrl"><Input name="facebookUrl" defaultValue={settings.facebookUrl ?? ""} /></Field>
        <Field label="TikTok URL" name="tiktokUrl"><Input name="tiktokUrl" defaultValue={settings.tiktokUrl ?? ""} /></Field>
        <Field label="YouTube URL" name="youtubeUrl"><Input name="youtubeUrl" defaultValue={settings.youtubeUrl ?? ""} /></Field>
        <Field label="Analytics ID" name="analyticsId"><Input name="analyticsId" defaultValue={settings.analyticsId ?? ""} placeholder="G-XXXXXXX" /></Field>
      </FieldGrid>
      <Field label="Address" name="address"><Textarea name="address" defaultValue={settings.address ?? ""} /></Field>
      <Field label="Meta Title (SEO)" name="metaTitle"><Input name="metaTitle" defaultValue={settings.metaTitle ?? ""} /></Field>
      <Field label="Meta Description (SEO)" name="metaDesc"><Textarea name="metaDesc" defaultValue={settings.metaDesc ?? ""} /></Field>
      <Field label="Maintenance Mode"><div className="flex h-10 items-center"><Switch name="maintenanceMode" defaultChecked={settings.maintenanceMode} /></div></Field>
    </EntityForm>
  );
}

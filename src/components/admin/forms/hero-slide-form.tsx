"use client";
import { createHeroSlide, updateHeroSlide } from "@/app/actions/admin";
import { EntityForm } from "@/components/admin/entity-form";
import { Field, FieldGrid } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { HeroSlide } from "@prisma/client";

export function HeroSlideForm({ slide }: { slide?: HeroSlide }) {
  const isEdit = !!slide;
  const action = isEdit ? (data: any) => updateHeroSlide(slide!.id, data) : (data: any) => createHeroSlide(data);

  return (
    <EntityForm action={action} redirectTo="/admin/hero-slides" submitLabel={isEdit ? "Update Slide" : "Create Slide"}>
      <FieldGrid>
        <Field label="Title (English)" name="title"><Input name="title" defaultValue={slide?.title} required /></Field>
        <Field label="Title (Urdu)" name="titleUr"><Input name="titleUr" defaultValue={slide?.titleUr ?? ""} dir="rtl" /></Field>
        <Field label="Subtitle (English)" name="subtitle"><Input name="subtitle" defaultValue={slide?.subtitle ?? ""} /></Field>
        <Field label="Subtitle (Urdu)" name="subtitleUr"><Input name="subtitleUr" defaultValue={slide?.subtitleUr ?? ""} dir="rtl" /></Field>
        <Field label="Image URL" name="image"><Input name="image" type="url" defaultValue={slide?.image} required /></Field>
        <Field label="Order" name="order"><Input name="order" type="number" defaultValue={slide?.order ?? 0} /></Field>
        <Field label="CTA Label" name="ctaLabel"><Input name="ctaLabel" defaultValue={slide?.ctaLabel ?? ""} placeholder="Explore Tours" /></Field>
        <Field label="CTA Link" name="ctaHref"><Input name="ctaHref" defaultValue={slide?.ctaHref ?? ""} placeholder="/tours" /></Field>
      </FieldGrid>
      <Field label="Active"><div className="flex h-10 items-center"><Switch name="active" defaultChecked={slide?.active ?? true} /></div></Field>
    </EntityForm>
  );
}

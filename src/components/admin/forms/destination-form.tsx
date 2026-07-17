"use client";
import { createDestination, updateDestination } from "@/app/actions/admin";
import { EntityForm } from "@/components/admin/entity-form";
import { Field, FieldGrid } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Destination } from "@prisma/client";

export function DestinationForm({ destination }: { destination?: Destination }) {
  const isEdit = !!destination;
  const action = isEdit
    ? (data: any) => updateDestination(destination!.id, data)
    : (data: any) => createDestination(data);

  return (
    <EntityForm action={action} redirectTo="/admin/destinations" submitLabel={isEdit ? "Update Destination" : "Create Destination"}>
      <FieldGrid>
        <Field label="Name (English)" name="name">
          <Input name="name" defaultValue={destination?.name} required />
        </Field>
        <Field label="Name (Urdu)" name="nameUr">
          <Input name="nameUr" defaultValue={destination?.nameUr ?? ""} dir="rtl" />
        </Field>
        <Field label="Slug" name="slug" hint="Used in the URL, e.g. hunza-valley">
          <Input name="slug" defaultValue={destination?.slug} required />
        </Field>
        <Field label="Region" name="region">
          <Input name="region" defaultValue={destination?.region} required />
        </Field>
      </FieldGrid>

      <Field label="Summary (English)" name="summary">
        <Textarea name="summary" defaultValue={destination?.summary} required />
      </Field>
      <Field label="Summary (Urdu)" name="summaryUr">
        <Textarea name="summaryUr" defaultValue={destination?.summaryUr ?? ""} dir="rtl" />
      </Field>
      <Field label="Full Description (English)" name="description">
        <Textarea name="description" rows={6} defaultValue={destination?.description} required />
      </Field>
      <Field label="Full Description (Urdu)" name="descriptionUr">
        <Textarea name="descriptionUr" rows={6} defaultValue={destination?.descriptionUr ?? ""} dir="rtl" />
      </Field>

      <FieldGrid>
        <Field label="Cover Image URL" name="coverImage">
          <Input name="coverImage" type="url" defaultValue={destination?.coverImage} required />
        </Field>
        <Field label="Best Season" name="bestSeason">
          <Input name="bestSeason" defaultValue={destination?.bestSeason ?? ""} placeholder="e.g. May – September" />
        </Field>
      </FieldGrid>

      <Field label="Gallery Images" name="images" hint="One image URL per line">
        <Textarea name="images" data-list="true" rows={4} defaultValue={(destination?.images ?? []).join("\n")} />
      </Field>

      <FieldGrid>
        <Field label="Featured" name="featured">
          <div className="flex h-10 items-center">
            <Switch name="featured" defaultChecked={destination?.featured ?? false} />
          </div>
        </Field>
        <Field label="Published" name="published">
          <div className="flex h-10 items-center">
            <Switch name="published" defaultChecked={destination?.published ?? true} />
          </div>
        </Field>
      </FieldGrid>
    </EntityForm>
  );
}

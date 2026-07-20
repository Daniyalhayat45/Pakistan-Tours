"use client";
import { createHotel, updateHotel } from "@/app/actions/admin";
import { EntityForm } from "@/components/admin/entity-form";
import { Field, FieldGrid } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Hotel } from "@prisma/client";

type SerializedHotel = Omit<Hotel, "priceFrom"> & { priceFrom: number | null };

export function HotelForm({ hotel }: { hotel?: SerializedHotel }) {
  const isEdit = !!hotel;
  const action = isEdit ? (data: any) => updateHotel(hotel!.id, data) : (data: any) => createHotel(data);

  return (
    <EntityForm action={action} redirectTo="/admin/hotels" submitLabel={isEdit ? "Update Hotel" : "Create Hotel"}>
      <FieldGrid>
        <Field label="Name (English)" name="name"><Input name="name" defaultValue={hotel?.name} required /></Field>
        <Field label="Name (Urdu)" name="nameUr"><Input name="nameUr" defaultValue={hotel?.nameUr ?? ""} dir="rtl" /></Field>
        <Field label="Slug" name="slug"><Input name="slug" defaultValue={hotel?.slug} required /></Field>
        <Field label="City" name="city"><Input name="city" defaultValue={hotel?.city} required /></Field>
        <Field label="Stars (1-5)" name="stars"><Input name="stars" type="number" min={1} max={5} defaultValue={hotel?.stars ?? 3} required /></Field>
        <Field label="Price From (PKR/night)" name="priceFrom"><Input name="priceFrom" type="number" min={0} defaultValue={hotel?.priceFrom ?? undefined} /></Field>
      </FieldGrid>

      <Field label="Description" name="description"><Textarea name="description" rows={5} defaultValue={hotel?.description} required /></Field>

      <FieldGrid>
        <Field label="Cover Image URL" name="coverImage"><Input name="coverImage" type="url" defaultValue={hotel?.coverImage} required /></Field>
        <Field label="Amenities" name="amenities" hint="One per line"><Textarea name="amenities" data-list="true" rows={4} defaultValue={(hotel?.amenities ?? []).join("\n")} /></Field>
      </FieldGrid>

      <Field label="Gallery Images" name="images" hint="One image URL per line">
        <Textarea name="images" data-list="true" rows={4} defaultValue={(hotel?.images ?? []).join("\n")} />
      </Field>

      <FieldGrid>
        <Field label="Featured"><div className="flex h-10 items-center"><Switch name="featured" defaultChecked={hotel?.featured ?? false} /></div></Field>
        <Field label="Published"><div className="flex h-10 items-center"><Switch name="published" defaultChecked={hotel?.published ?? true} /></div></Field>
      </FieldGrid>
    </EntityForm>
  );
}

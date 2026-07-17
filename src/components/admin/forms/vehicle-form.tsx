"use client";
import { createVehicle, updateVehicle } from "@/app/actions/admin";
import { EntityForm } from "@/components/admin/entity-form";
import { Field, FieldGrid } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Vehicle } from "@prisma/client";

export function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const isEdit = !!vehicle;
  const action = isEdit ? (data: any) => updateVehicle(vehicle!.id, data) : (data: any) => createVehicle(data);

  return (
    <EntityForm action={action} redirectTo="/admin/vehicles" submitLabel={isEdit ? "Update Vehicle" : "Create Vehicle"}>
      <FieldGrid>
        <Field label="Name" name="name"><Input name="name" defaultValue={vehicle?.name} required /></Field>
        <Field label="Slug" name="slug"><Input name="slug" defaultValue={vehicle?.slug} required /></Field>
        <Field label="Type" name="type"><Input name="type" defaultValue={vehicle?.type} placeholder="SUV / Van / Coaster" required /></Field>
        <Field label="Capacity (seats)" name="capacity"><Input name="capacity" type="number" min={1} defaultValue={vehicle?.capacity ?? 4} required /></Field>
        <Field label="Price From (PKR/day)" name="priceFrom"><Input name="priceFrom" type="number" min={0} defaultValue={vehicle ? Number(vehicle.priceFrom) : undefined} /></Field>
        <Field label="Cover Image URL" name="coverImage"><Input name="coverImage" type="url" defaultValue={vehicle?.coverImage} required /></Field>
      </FieldGrid>

      <Field label="Description" name="description"><Textarea name="description" rows={5} defaultValue={vehicle?.description} required /></Field>
      <Field label="Features" name="features" hint="One per line"><Textarea name="features" data-list="true" rows={4} defaultValue={(vehicle?.features ?? []).join("\n")} /></Field>
      <Field label="Gallery Images" name="images" hint="One image URL per line"><Textarea name="images" data-list="true" rows={4} defaultValue={(vehicle?.images ?? []).join("\n")} /></Field>

      <Field label="Published"><div className="flex h-10 items-center"><Switch name="published" defaultChecked={vehicle?.published ?? true} /></div></Field>
    </EntityForm>
  );
}

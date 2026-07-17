"use client";
import { createGalleryImage } from "@/app/actions/admin";
import { EntityForm } from "@/components/admin/entity-form";
import { Field, FieldGrid } from "@/components/admin/field";
import { Input } from "@/components/ui/input";

export function GalleryUploadForm() {
  return (
    <EntityForm action={(data) => createGalleryImage(data as any)} redirectTo="/admin/gallery" submitLabel="Add Image">
      <FieldGrid>
        <Field label="Image URL" name="imageUrl"><Input name="imageUrl" type="url" required /></Field>
        <Field label="Title (optional)" name="title"><Input name="title" /></Field>
        <Field label="Category" name="category"><Input name="category" defaultValue="general" /></Field>
        <Field label="Order" name="order"><Input name="order" type="number" defaultValue={0} /></Field>
      </FieldGrid>
    </EntityForm>
  );
}

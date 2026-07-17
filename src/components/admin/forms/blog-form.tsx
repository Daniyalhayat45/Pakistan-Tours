"use client";
import { createBlog, updateBlog } from "@/app/actions/admin";
import { EntityForm } from "@/components/admin/entity-form";
import { Field, FieldGrid } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Blog } from "@prisma/client";

export function BlogForm({ blog }: { blog?: Blog }) {
  const isEdit = !!blog;
  const action = isEdit ? (data: any) => updateBlog(blog!.id, data) : (data: any) => createBlog(data);

  return (
    <EntityForm action={action} redirectTo="/admin/blogs" submitLabel={isEdit ? "Update Post" : "Create Post"}>
      <FieldGrid>
        <Field label="Title (English)" name="title"><Input name="title" defaultValue={blog?.title} required /></Field>
        <Field label="Title (Urdu)" name="titleUr"><Input name="titleUr" defaultValue={blog?.titleUr ?? ""} dir="rtl" /></Field>
        <Field label="Slug" name="slug"><Input name="slug" defaultValue={blog?.slug} required /></Field>
        <Field label="Cover Image URL" name="coverImage"><Input name="coverImage" type="url" defaultValue={blog?.coverImage} required /></Field>
      </FieldGrid>

      <Field label="Excerpt" name="excerpt"><Textarea name="excerpt" defaultValue={blog?.excerpt} required /></Field>
      <Field label="Content (English)" name="content"><Textarea name="content" rows={10} defaultValue={blog?.content} required /></Field>
      <Field label="Content (Urdu)" name="contentUr"><Textarea name="contentUr" rows={10} defaultValue={blog?.contentUr ?? ""} dir="rtl" /></Field>
      <Field label="Tags" name="tags" hint="One per line"><Textarea name="tags" data-list="true" rows={3} defaultValue={(blog?.tags ?? []).join("\n")} /></Field>

      <Field label="Published"><div className="flex h-10 items-center"><Switch name="published" defaultChecked={blog?.published ?? true} /></div></Field>
    </EntityForm>
  );
}

"use client";
import { createFaq, updateFaq } from "@/app/actions/admin";
import { EntityForm } from "@/components/admin/entity-form";
import { Field, FieldGrid } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { FAQ } from "@prisma/client";

export function FaqForm({ faq }: { faq?: FAQ }) {
  const isEdit = !!faq;
  const action = isEdit ? (data: any) => updateFaq(faq!.id, data) : (data: any) => createFaq(data);

  return (
    <EntityForm action={action} redirectTo="/admin/faqs" submitLabel={isEdit ? "Update FAQ" : "Create FAQ"}>
      <Field label="Question (English)" name="question"><Input name="question" defaultValue={faq?.question} required /></Field>
      <Field label="Question (Urdu)" name="questionUr"><Input name="questionUr" defaultValue={faq?.questionUr ?? ""} dir="rtl" /></Field>
      <Field label="Answer (English)" name="answer"><Textarea name="answer" defaultValue={faq?.answer} required /></Field>
      <Field label="Answer (Urdu)" name="answerUr"><Textarea name="answerUr" defaultValue={faq?.answerUr ?? ""} dir="rtl" /></Field>
      <FieldGrid>
        <Field label="Category" name="category"><Input name="category" defaultValue={faq?.category ?? "general"} /></Field>
        <Field label="Order" name="order"><Input name="order" type="number" defaultValue={faq?.order ?? 0} /></Field>
      </FieldGrid>
      <Field label="Published"><div className="flex h-10 items-center"><Switch name="published" defaultChecked={faq?.published ?? true} /></div></Field>
    </EntityForm>
  );
}

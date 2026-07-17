"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function listField(fd: FormData, name: string): string[] {
  return (fd.get(name) as string || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function EntityForm({
  action,
  children,
  redirectTo,
  submitLabel = "Save",
}: {
  action: (data: Record<string, any>) => Promise<{ success: boolean; error?: string }>;
  children: React.ReactNode;
  redirectTo: string;
  submitLabel?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, any> = {};
    fd.forEach((value, key) => {
      if (key.endsWith("__list")) return;
      data[key] = value;
    });
    // checkboxes that are unchecked don't appear in FormData; fix booleans
    e.currentTarget.querySelectorAll("input[type=checkbox]").forEach((el) => {
      const input = el as HTMLInputElement;
      data[input.name] = input.checked;
    });
    // list fields (newline separated -> array)
    e.currentTarget.querySelectorAll("textarea[data-list=true]").forEach((el) => {
      const ta = el as HTMLTextAreaElement;
      data[ta.name] = listField(fd, ta.name);
    });
    startTransition(async () => {
      const res = await action(data);
      if (res.success) {
        toast.success("Saved successfully");
        router.push(redirectTo);
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {children}
      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

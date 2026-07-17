"use client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeNewsletter } from "@/app/actions/public";

export function NewsletterForm({ placeholder, label }: { placeholder: string; label: string }) {
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await subscribeNewsletter({ email });
      if (res.success) {
        toast.success("Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(res.error || "Something went wrong.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        required
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
      />
      <Button type="submit" disabled={pending} size="sm">
        {label}
      </Button>
    </form>
  );
}

"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion({ faqs }: { faqs: { id: string; question: string; answer: string; category: string }[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id || null);
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <div key={faq.id} className="rounded-lg border border-border">
          <button
            onClick={() => setOpen(open === faq.id ? null : faq.id)}
            className="flex w-full items-center justify-between p-5 text-left font-medium"
          >
            {faq.question}
            <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open === faq.id && "rotate-180")} />
          </button>
          {open === faq.id && <div className="px-5 pb-5 text-sm text-muted-foreground">{faq.answer}</div>}
        </div>
      ))}
      {faqs.length === 0 && <p className="text-center text-muted-foreground">No FAQs published yet.</p>}
    </div>
  );
}

import { prisma } from "@/lib/db";
import { FaqAccordion } from "@/components/shared/faq-accordion";

export const metadata = { title: "FAQs | Pakistan Tourism Gateway" };

export default async function FaqsPage() {
  const faqs = await prisma.fAQ.findMany({ where: { published: true }, orderBy: { order: "asc" } });
  return (
    <div className="container max-w-3xl py-32">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-dark">Help</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Frequently Asked Questions</h1>
      </div>
      <FaqAccordion faqs={faqs} />
    </div>
  );
}

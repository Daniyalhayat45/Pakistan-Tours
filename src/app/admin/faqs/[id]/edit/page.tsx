import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { FaqForm } from "@/components/admin/forms/faq-form";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await prisma.fAQ.findUnique({ where: { id } });
  if (!faq) notFound();
  return (
    <div>
      <AdminTopbar title="Edit FAQ" />
      <div className="p-6 max-w-3xl"><FaqForm faq={faq} /></div>
    </div>
  );
}

import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { HeroSlideForm } from "@/components/admin/forms/hero-slide-form";

export default async function EditHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!slide) notFound();
  return (
    <div>
      <AdminTopbar title="Edit Hero Slide" />
      <div className="p-6 max-w-3xl"><HeroSlideForm slide={slide} /></div>
    </div>
  );
}

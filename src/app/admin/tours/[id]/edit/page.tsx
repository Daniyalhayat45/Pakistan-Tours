import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { TourForm } from "@/components/admin/forms/tour-form";

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [tour, destinations] = await Promise.all([
    prisma.tour.findUnique({ where: { id } }),
    prisma.destination.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!tour) notFound();
  return (
    <div>
      <AdminTopbar title="Edit Tour" />
      <div className="p-6 max-w-3xl">
        <TourForm tour={tour} destinations={destinations} />
      </div>
    </div>
  );
}

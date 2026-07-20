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
  // Prisma's Decimal type isn't a plain object, so it can't be passed to a Client Component as-is.
  const serializedTour = { ...tour, priceFrom: tour.priceFrom.toNumber() };
  return (
    <div>
      <AdminTopbar title="Edit Tour" />
      <div className="p-6 max-w-3xl">
        <TourForm tour={serializedTour} destinations={destinations} />
      </div>
    </div>
  );
}

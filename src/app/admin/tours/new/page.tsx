import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { TourForm } from "@/components/admin/forms/tour-form";

export default async function NewTourPage() {
  const destinations = await prisma.destination.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <AdminTopbar title="New Tour" />
      <div className="p-6 max-w-3xl">
        <TourForm destinations={destinations} />
      </div>
    </div>
  );
}

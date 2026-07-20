import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { VehicleForm } from "@/components/admin/forms/vehicle-form";

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) notFound();
  // Prisma's Decimal type isn't a plain object, so it can't be passed to a Client Component as-is.
  const serializedVehicle = { ...vehicle, priceFrom: vehicle.priceFrom ? vehicle.priceFrom.toNumber() : null };
  return (
    <div>
      <AdminTopbar title="Edit Vehicle" />
      <div className="p-6 max-w-3xl"><VehicleForm vehicle={serializedVehicle} /></div>
    </div>
  );
}

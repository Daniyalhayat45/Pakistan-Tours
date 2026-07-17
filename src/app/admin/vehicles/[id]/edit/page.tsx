import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { VehicleForm } from "@/components/admin/forms/vehicle-form";

export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  if (!vehicle) notFound();
  return (
    <div>
      <AdminTopbar title="Edit Vehicle" />
      <div className="p-6 max-w-3xl"><VehicleForm vehicle={vehicle} /></div>
    </div>
  );
}

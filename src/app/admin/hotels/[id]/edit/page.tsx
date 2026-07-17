import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { HotelForm } from "@/components/admin/forms/hotel-form";

export default async function EditHotelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  if (!hotel) notFound();
  return (
    <div>
      <AdminTopbar title="Edit Hotel" />
      <div className="p-6 max-w-3xl"><HotelForm hotel={hotel} /></div>
    </div>
  );
}

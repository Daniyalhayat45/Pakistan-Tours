import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { HotelForm } from "@/components/admin/forms/hotel-form";

export default async function EditHotelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  if (!hotel) notFound();
  // Prisma's Decimal type isn't a plain object, so it can't be passed to a Client Component as-is.
  const serializedHotel = { ...hotel, priceFrom: hotel.priceFrom ? hotel.priceFrom.toNumber() : null };
  return (
    <div>
      <AdminTopbar title="Edit Hotel" />
      <div className="p-6 max-w-3xl"><HotelForm hotel={serializedHotel} /></div>
    </div>
  );
}

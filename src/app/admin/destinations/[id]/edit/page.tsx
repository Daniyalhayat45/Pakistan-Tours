import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { DestinationForm } from "@/components/admin/forms/destination-form";

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const destination = await prisma.destination.findUnique({ where: { id } });
  if (!destination) notFound();
  return (
    <div>
      <AdminTopbar title="Edit Destination" />
      <div className="p-6 max-w-3xl">
        <DestinationForm destination={destination} />
      </div>
    </div>
  );
}

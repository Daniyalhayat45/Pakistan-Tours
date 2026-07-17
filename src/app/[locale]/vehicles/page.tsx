import { prisma } from "@/lib/db";
import { VehicleCard } from "@/components/cards/vehicle-card";

export const metadata = { title: "Vehicles | Pakistan Tourism Gateway" };

export default async function VehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="container py-32">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-dark">Transport</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Vehicles for Rent</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Comfortable, well-maintained vehicles for every group size.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
      </div>
      {vehicles.length === 0 && <p className="text-center text-muted-foreground">No vehicles published yet.</p>}
    </div>
  );
}

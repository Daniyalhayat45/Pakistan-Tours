import { prisma } from "@/lib/db";
import { TourCard } from "@/components/cards/tour-card";

export const metadata = { title: "Tours | Pakistan Tourism Gateway" };

export default async function ToursPage() {
  const tours = await prisma.tour.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="container py-32">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-dark">Curated Itineraries</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">All Tours</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Every detail handled — itinerary, hotels, transport and more.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
      </div>
      {tours.length === 0 && <p className="text-center text-muted-foreground">No tours published yet.</p>}
    </div>
  );
}

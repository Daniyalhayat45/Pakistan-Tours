import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { TourCard } from "@/components/cards/tour-card";
import { InquiryForm } from "@/components/shared/inquiry-form";

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = await prisma.destination.findUnique({
    where: { slug },
    include: { tours: { where: { published: true } } },
  });
  if (!destination || !destination.published) notFound();

  return (
    <div>
      <div className="relative h-[60vh] w-full">
        <Image src={destination.coverImage} alt={destination.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-onyx/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center text-white">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">{destination.region}</p>
          <h1 className="font-display text-4xl font-bold md:text-6xl">{destination.name}</h1>
        </div>
      </div>

      <div className="container grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{destination.description}</p>
          {destination.bestSeason && (
            <p className="mt-6 text-sm"><span className="font-semibold">Best Season:</span> {destination.bestSeason}</p>
          )}

          {destination.images.length > 1 && (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {destination.images.map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image src={img} alt={`${destination.name} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {destination.tours.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 font-display text-2xl font-bold">Tours in {destination.name}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {destination.tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-border p-6">
          <InquiryForm type="CUSTOM" title="Plan Your Trip" />
        </div>
      </div>
    </div>
  );
}

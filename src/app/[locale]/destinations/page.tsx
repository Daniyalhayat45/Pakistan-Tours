import { prisma } from "@/lib/db";
import { DestinationCard } from "@/components/cards/destination-card";
import { setRequestLocale } from "next-intl/server";

export const metadata = { title: "Destinations | Pakistan Tourism Gateway" };

export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const destinations = await prisma.destination.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="container py-32">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-dark">Explore</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Destinations</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">From alpine valleys to Mughal cities — discover Pakistan region by region.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => <DestinationCard key={d.id} d={d} />)}
      </div>
      {destinations.length === 0 && <p className="text-center text-muted-foreground">No destinations published yet.</p>}
    </div>
  );
}

import { prisma } from "@/lib/db";
import { HotelCard } from "@/components/cards/hotel-card";
import { setRequestLocale } from "next-intl/server";

export const metadata = { title: "Hotels | Pakistan Tourism Gateway" };

export default async function HotelsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const hotels = await prisma.hotel.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="container py-32">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-dark">Stay</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Hotels & Resorts</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Handpicked properties across Pakistan's most scenic regions.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((h) => <HotelCard key={h.id} hotel={h} />)}
      </div>
      {hotels.length === 0 && <p className="text-center text-muted-foreground">No hotels published yet.</p>}
    </div>
  );
}

import Image from "next/image";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { InquiryForm } from "@/components/shared/inquiry-form";
import { formatCurrency } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";

export default async function HotelDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const hotel = await prisma.hotel.findUnique({ where: { slug } });
  if (!hotel || !hotel.published) notFound();

  return (
    <div>
      <div className="relative h-[55vh] w-full">
        <Image src={hotel.coverImage} alt={hotel.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-onyx/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 text-center text-white">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">{hotel.city}</p>
          <h1 className="font-display text-3xl font-bold md:text-5xl">{hotel.name}</h1>
          <div className="mt-3 flex gap-0.5">
            {Array.from({ length: hotel.stars }).map((_, i) => <Star key={i} className="h-5 w-5 fill-gold text-gold" />)}
          </div>
        </div>
      </div>
      <div className="container grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="leading-relaxed text-muted-foreground">{hotel.description}</p>
          {hotel.amenities.length > 0 && (
            <div className="mt-8">
              <h4 className="mb-3 font-semibold">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((a, i) => <Badge key={i} variant="secondary">{a}</Badge>)}
              </div>
            </div>
          )}
          {hotel.images.length > 1 && (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {hotel.images.map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image src={img} alt={`${hotel.name} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          {hotel.priceFrom && (
            <div className="rounded-lg border border-border p-6">
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-3xl font-bold text-gold-dark">{formatCurrency(hotel.priceFrom.toString())}</p>
              <p className="mt-1 text-xs text-muted-foreground">per night</p>
            </div>
          )}
          <div className="rounded-lg border border-border p-6">
            <InquiryForm type="HOTEL" hotelId={hotel.id} title="Inquire About This Hotel" />
          </div>
        </div>
      </div>
    </div>
  );
}

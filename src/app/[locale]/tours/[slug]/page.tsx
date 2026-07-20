import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Users, Mountain as MountainIcon, Check, X } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InquiryForm } from "@/components/shared/inquiry-form";
import { formatCurrency } from "@/lib/utils";

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = await prisma.tour.findUnique({
    where: { slug },
    include: {
      destination: true,
      hotels: { include: { hotel: true } },
      vehicles: { include: { vehicle: true } },
    },
  });
  if (!tour || !tour.published) notFound();

  const itinerary = (tour.itinerary as any[]) || [];

  return (
    <div>
      <div className="relative h-[55vh] w-full">
        <Image src={tour.coverImage} alt={tour.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-onyx/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 text-center text-white">
          {tour.destination && <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">{tour.destination.name}</p>}
          <h1 className="max-w-3xl font-display text-3xl font-bold md:text-5xl">{tour.title}</h1>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
            <Badge className="flex items-center gap-1"><Clock className="h-3 w-3" /> {tour.durationDays} Days / {tour.durationNights} Nights</Badge>
            {tour.groupSizeMax && <Badge variant="secondary" className="flex items-center gap-1"><Users className="h-3 w-3" /> Up to {tour.groupSizeMax}</Badge>}
            {tour.difficulty && <Badge variant="secondary" className="flex items-center gap-1"><MountainIcon className="h-3 w-3" /> {tour.difficulty}</Badge>}
          </div>
        </div>
      </div>

      <div className="container grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="leading-relaxed text-muted-foreground">{tour.summary}</p>

          <Tabs defaultValue="itinerary" className="mt-10">
            <TabsList className="flex-wrap">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
              <TabsTrigger value="hotels">Hotels & Transport</TabsTrigger>
              <TabsTrigger value="packing">Packing & Weather</TabsTrigger>
              {tour.policies && <TabsTrigger value="policies">Policies</TabsTrigger>}
            </TabsList>

            <TabsContent value="itinerary" className="space-y-4 pt-6">
              {itinerary.map((day: any, i: number) => (
                <div key={i} className="flex gap-4 border-l-2 border-gold pl-4">
                  <div>
                    <p className="text-sm font-semibold text-gold-dark">Day {day.day}: {day.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{day.details}</p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="inclusions" className="grid gap-6 pt-6 sm:grid-cols-2">
              <div>
                <h4 className="mb-3 font-semibold">Inclusions</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tour.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold">Exclusions</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tour.exclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />{item}</li>
                  ))}
                </ul>
              </div>
              {tour.meals.length > 0 && (
                <div className="sm:col-span-2">
                  <h4 className="mb-2 font-semibold">Meals Included</h4>
                  <div className="flex flex-wrap gap-2">
                    {tour.meals.map((m, i) => <Badge key={i} variant="secondary">{m}</Badge>)}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="hotels" className="space-y-6 pt-6">
              {tour.hotels.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold">Hotels</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {tour.hotels.map((th) => (
                      <div key={th.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded">
                          <Image src={th.hotel.coverImage} alt={th.hotel.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{th.hotel.name}</p>
                          <p className="text-xs text-muted-foreground">{th.hotel.city} &middot; {th.nights} nights</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tour.vehicles.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold">Transport</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {tour.vehicles.map((tv) => (
                      <div key={tv.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded">
                          <Image src={tv.vehicle.coverImage} alt={tv.vehicle.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{tv.vehicle.name}</p>
                          <p className="text-xs text-muted-foreground">{tv.vehicle.type} &middot; {tv.vehicle.capacity} seats</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="packing" className="space-y-4 pt-6">
              {tour.weatherInfo && <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Weather: </span>{tour.weatherInfo}</p>}
              {tour.packingList.length > 0 && (
                <div>
                  <h4 className="mb-2 font-semibold">Packing List</h4>
                  <div className="flex flex-wrap gap-2">
                    {tour.packingList.map((p, i) => <Badge key={i} variant="secondary">{p}</Badge>)}
                  </div>
                </div>
              )}
            </TabsContent>

            {tour.policies && (
              <TabsContent value="policies" className="pt-6 text-sm text-muted-foreground whitespace-pre-line">
                {tour.policies}
              </TabsContent>
            )}
          </Tabs>

          {tour.images.length > 1 && (
            <div className="mt-10 grid grid-cols-3 gap-3">
              {tour.images.slice(0, 3).map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image src={img} alt={`${tour.title} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-border p-6">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-3xl font-bold text-gold-dark">{formatCurrency(tour.priceFrom.toString(), tour.priceCurrency)}</p>
            <p className="mt-1 text-xs text-muted-foreground">per person, land only</p>
          </div>
          <div className="rounded-lg border border-border p-6">
            <InquiryForm type="TOUR" tourId={tour.id} title="Inquire About This Tour" />
          </div>
        </div>
      </div>
    </div>
  );
}

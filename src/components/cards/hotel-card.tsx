import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SafeImage } from "@/components/shared/safe-image";
import { formatCurrency } from "@/lib/utils";

export function HotelCard({ hotel }: { hotel: { slug: string; name: string; city: string; stars: number; coverImage: string; priceFrom: any } }) {
  const locale = useLocale();
  const t = useTranslations("common");
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-xl">
      <Link href={`/${locale}/hotels/${hotel.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden">
        <SafeImage src={hotel.coverImage} alt={hotel.name} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
      </Link>
      <CardContent className="p-5">
        <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {hotel.city}</div>
        <Link href={`/${locale}/hotels/${hotel.slug}`}>
          <h3 className="font-display text-lg font-semibold hover:text-gold-dark">{hotel.name}</h3>
        </Link>
        <div className="mt-1 flex gap-0.5">
          {Array.from({ length: hotel.stars }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}
        </div>
        {hotel.priceFrom && (
          <p className="mt-3 font-semibold text-gold-dark">{t("from")} {formatCurrency(hotel.priceFrom.toString())}</p>
        )}
      </CardContent>
    </Card>
  );
}

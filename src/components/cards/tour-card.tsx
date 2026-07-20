import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function TourCard({
  tour,
}: {
  tour: { slug: string; title: string; summary: string; coverImage: string; durationDays: number; durationNights: number; priceFrom: any; priceCurrency: string };
}) {
  const locale = useLocale();
  const t = useTranslations("common");
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-xl">
      <Link href={`/${locale}/tours/${tour.slug}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image src={tour.coverImage} alt={tour.title} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
          <Badge className="absolute left-3 top-3 flex items-center gap-1">
            <Clock className="h-3 w-3" /> {tour.durationDays} {t("days")} / {tour.durationNights} {t("nights")}
          </Badge>
        </div>
      </Link>
      <CardContent className="p-5">
        <Link href={`/${locale}/tours/${tour.slug}`}>
          <h3 className="font-display text-lg font-semibold hover:text-gold-dark">{tour.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{tour.summary}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">{t("from")}</span>
            <p className="font-semibold text-gold-dark">{formatCurrency(tour.priceFrom.toString(), tour.priceCurrency)}</p>
          </div>
          <Link href={`/${locale}/tours/${tour.slug}`} className="text-sm font-medium text-gold-dark hover:underline">
            {t("viewDetails")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

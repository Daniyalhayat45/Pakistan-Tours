import Image from "next/image";
import { useTranslations } from "next-intl";
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InquiryButton } from "@/components/shared/inquiry-dialog";
import { formatCurrency } from "@/lib/utils";

export function VehicleCard({ vehicle }: { vehicle: { id: string; slug: string; name: string; type: string; capacity: number; coverImage: string; priceFrom: any; description: string } }) {
  const t = useTranslations("common");
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={vehicle.coverImage} alt={vehicle.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        <Badge className="absolute left-3 top-3">{vehicle.type}</Badge>
      </div>
      <CardContent className="p-5">
        <h3 className="font-display text-lg font-semibold">{vehicle.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><Users className="h-3.5 w-3.5" /> {vehicle.capacity} passengers</p>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{vehicle.description}</p>
        <div className="mt-4 flex items-center justify-between">
          {vehicle.priceFrom ? (
            <p className="font-semibold text-gold-dark">{t("from")} {formatCurrency(vehicle.priceFrom)}/day</p>
          ) : <span />}
          <InquiryButton type="VEHICLE" vehicleId={vehicle.id} label={t("viewDetails")} />
        </div>
      </CardContent>
    </Card>
  );
}

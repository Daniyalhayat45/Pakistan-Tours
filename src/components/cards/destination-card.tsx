import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { MapPin } from "lucide-react";

export function DestinationCard({ d }: { d: { slug: string; name: string; region: string; summary: string; coverImage: string } }) {
  const locale = useLocale();
  return (
    <Link href={`/${locale}/destinations/${d.slug}`} className="group relative block overflow-hidden rounded-lg">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image src={d.coverImage} alt={d.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="mb-1 flex items-center gap-1 text-xs text-gold">
          <MapPin className="h-3 w-3" /> {d.region}
        </div>
        <h3 className="font-display text-xl font-semibold">{d.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/70">{d.summary}</p>
      </div>
    </Link>
  );
}

import Link from "next/link";
import { useLocale } from "next-intl";

export function SectionHeading({
  eyebrow,
  title,
  viewAllHref,
  viewAllLabel,
}: {
  eyebrow?: string;
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  const locale = useLocale();
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-dark">{eyebrow}</p>}
        <h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2>
      </div>
      {viewAllHref && (
        <Link href={`/${locale}${viewAllHref}`} className="text-sm font-medium text-gold-dark hover:text-gold">
          {viewAllLabel} &rarr;
        </Link>
      )}
    </div>
  );
}

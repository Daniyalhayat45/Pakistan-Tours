import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils";

export function BlogCard({ blog }: { blog: { slug: string; title: string; excerpt: string; coverImage: string; createdAt: Date | string } }) {
  const locale = useLocale();
  const t = useTranslations("common");
  return (
    <article className="group overflow-hidden rounded-lg border border-border">
      <Link href={`/${locale}/blog/${blog.slug}`} className="block relative aspect-[16/10] w-full overflow-hidden">
        <Image src={blog.coverImage} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
      </Link>
      <div className="p-5">
        <p className="text-xs text-muted-foreground">{formatDate(blog.createdAt)}</p>
        <Link href={`/${locale}/blog/${blog.slug}`}>
          <h3 className="mt-1 font-display text-lg font-semibold hover:text-gold-dark">{blog.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{blog.excerpt}</p>
        <Link href={`/${locale}/blog/${blog.slug}`} className="mt-3 inline-block text-sm font-medium text-gold-dark hover:underline">
          {t("readMore")} &rarr;
        </Link>
      </div>
    </article>
  );
}

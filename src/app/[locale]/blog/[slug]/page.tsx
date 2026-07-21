import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";

export default async function BlogDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog || !blog.published) notFound();

  return (
    <article className="container max-w-3xl py-32">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-dark">{formatDate(blog.createdAt)} &middot; {blog.authorName}</p>
      <h1 className="font-display text-3xl font-bold md:text-5xl">{blog.title}</h1>
      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image src={blog.coverImage} alt={blog.title} fill priority className="object-cover" />
      </div>
      <div className="prose prose-neutral mt-10 max-w-none whitespace-pre-line leading-relaxed text-muted-foreground">
        {blog.content}
      </div>
      {blog.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {blog.tags.map((tag, i) => <Badge key={i} variant="secondary">{tag}</Badge>)}
        </div>
      )}
    </article>
  );
}

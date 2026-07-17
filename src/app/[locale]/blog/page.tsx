import { prisma } from "@/lib/db";
import { BlogCard } from "@/components/cards/blog-card";

export const metadata = { title: "Blog | Pakistan Tourism Gateway" };

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="container py-32">
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-dark">Stories</p>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Travel Blog</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Tips, guides and stories from across Pakistan.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((b) => <BlogCard key={b.id} blog={b} />)}
      </div>
      {blogs.length === 0 && <p className="text-center text-muted-foreground">No posts published yet.</p>}
    </div>
  );
}

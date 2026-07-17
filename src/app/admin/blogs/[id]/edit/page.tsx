import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { BlogForm } from "@/components/admin/forms/blog-form";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) notFound();
  return (
    <div>
      <AdminTopbar title="Edit Blog Post" />
      <div className="p-6 max-w-3xl"><BlogForm blog={blog} /></div>
    </div>
  );
}

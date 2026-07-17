import { AdminTopbar } from "@/components/admin/topbar";
import { BlogForm } from "@/components/admin/forms/blog-form";

export default function NewBlogPage() {
  return (
    <div>
      <AdminTopbar title="New Blog Post" />
      <div className="p-6 max-w-3xl"><BlogForm /></div>
    </div>
  );
}

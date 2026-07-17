import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteBlog } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Plus, Pencil } from "lucide-react";

export default async function BlogsAdminPage() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminTopbar title="Blog Posts" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <Button asChild><Link href="/admin/blogs/new"><Plus className="h-4 w-4" /> New Post</Link></Button>
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Published</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {blogs.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.title}</TableCell>
                  <TableCell>{formatDate(b.createdAt)}</TableCell>
                  <TableCell><Badge variant={b.published ? "default" : "secondary"}>{b.published ? "Published" : "Draft"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild><Link href={`/admin/blogs/${b.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                    <DeleteButton id={b.id} action={deleteBlog} label="post" />
                  </TableCell>
                </TableRow>
              ))}
              {blogs.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No posts yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

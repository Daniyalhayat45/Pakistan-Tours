import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteFaq } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";

export default async function FaqsAdminPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  return (
    <div>
      <AdminTopbar title="FAQs" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <Button asChild><Link href="/admin/faqs/new"><Plus className="h-4 w-4" /> New FAQ</Link></Button>
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader><TableRow><TableHead>Question</TableHead><TableHead>Category</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {faqs.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.question}</TableCell>
                  <TableCell>{f.category}</TableCell>
                  <TableCell><Badge variant={f.published ? "default" : "secondary"}>{f.published ? "Published" : "Draft"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild><Link href={`/admin/faqs/${f.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                    <DeleteButton id={f.id} action={deleteFaq} label="FAQ" />
                  </TableCell>
                </TableRow>
              ))}
              {faqs.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No FAQs yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

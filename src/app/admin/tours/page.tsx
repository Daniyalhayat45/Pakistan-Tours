import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTour } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Plus, Pencil } from "lucide-react";

export default async function ToursAdminPage() {
  const tours = await prisma.tour.findMany({ orderBy: { createdAt: "desc" }, include: { destination: true } });
  return (
    <div>
      <AdminTopbar title="Tours" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <Button asChild><Link href="/admin/tours/new"><Plus className="h-4 w-4" /> New Tour</Link></Button>
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.title} {t.featured && <Badge className="ml-2">Featured</Badge>}</TableCell>
                  <TableCell>{t.destination?.name ?? "—"}</TableCell>
                  <TableCell>{t.durationDays}D/{t.durationNights}N</TableCell>
                  <TableCell>{formatCurrency(t.priceFrom.toString(), t.priceCurrency)}</TableCell>
                  <TableCell><Badge variant={t.published ? "default" : "secondary"}>{t.published ? "Published" : "Draft"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild><Link href={`/admin/tours/${t.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                    <DeleteButton id={t.id} action={deleteTour} label="tour" />
                  </TableCell>
                </TableRow>
              ))}
              {tours.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No tours yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

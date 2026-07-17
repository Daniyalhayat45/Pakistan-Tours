import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteHotel } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";

export default async function HotelsAdminPage() {
  const hotels = await prisma.hotel.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminTopbar title="Hotels" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <Button asChild><Link href="/admin/hotels/new"><Plus className="h-4 w-4" /> New Hotel</Link></Button>
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Name</TableHead><TableHead>City</TableHead><TableHead>Stars</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {hotels.map((h) => (
                <TableRow key={h.id}>
                  <TableCell className="font-medium">{h.name}</TableCell>
                  <TableCell>{h.city}</TableCell>
                  <TableCell>{h.stars}★</TableCell>
                  <TableCell><Badge variant={h.published ? "default" : "secondary"}>{h.published ? "Published" : "Draft"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild><Link href={`/admin/hotels/${h.id}/edit`}><Pencil className="h-4 w-4" /></Link></Button>
                    <DeleteButton id={h.id} action={deleteHotel} label="hotel" />
                  </TableCell>
                </TableRow>
              ))}
              {hotels.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No hotels yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

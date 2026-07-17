import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/topbar";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteDestination } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";

export default async function DestinationsAdminPage() {
  const destinations = await prisma.destination.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminTopbar title="Destinations" />
      <div className="p-6">
        <div className="mb-4 flex justify-end">
          <Button asChild>
            <Link href="/admin/destinations/new"><Plus className="h-4 w-4" /> New Destination</Link>
          </Button>
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {destinations.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.name} {d.featured && <Badge className="ml-2">Featured</Badge>}</TableCell>
                  <TableCell>{d.region}</TableCell>
                  <TableCell>
                    <Badge variant={d.published ? "default" : "secondary"}>{d.published ? "Published" : "Draft"}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/destinations/${d.id}/edit`}><Pencil className="h-4 w-4" /></Link>
                    </Button>
                    <DeleteButton id={d.id} action={deleteDestination} label="destination" />
                  </TableCell>
                </TableRow>
              ))}
              {destinations.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No destinations yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
